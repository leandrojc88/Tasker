const model = require('../../models/task')
const { Op } = require("sequelize");
const multer = require('multer')
const path = require('path')

module.exports = {
    getAllFromTable: async (req, res) => {
        try {
            const { tableId } = req.params
            const _obj = await model.findAll({
                where: { tableId },
                order: [['position', 'asc']]
            })

            const model_subtask = require('../../models/sub_task')
            let returnobj = []

            for (const obj of _obj) {
                const subtasks = await model_subtask.count({ where: { taskId: obj.id } })
                const done_subtask = await model_subtask.count({ where: { taskId: obj.id, done: true } })
                returnobj.push({ ...obj.toJSON(), subtasks, done_subtask })
            }
            res.json(returnobj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    },
    getImg: async (req, res) => {
        try {
            const { taskId } = req.params
            // console.log(path.(__path, '../.../uploads/avatar.jpg'));
            const app = require('../../index.js')
            res.sendFile(path.join(app.get('url_upload'), '/uploads/avatar.jpg'))

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    },
    create: async (req, res) => {
        try {
            const _count = await model.count({ where: { tableId: req.body.tableId } })
            const _obj = await model.create({ ...req.body, position: _count + 1 })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    },
    update: async (req, res) => {
        try {
            const { id } = req.params
            const _obj = await model.update(req.body, { where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    },
    moved: async (req, res) => {
        try {
            const { id } = req.params
            const { oldposs, newposs } = req.body
            const _obj = await model.findByPk(id)

            if (oldposs > newposs) {
                // move UP - increment others
                await model.increment('position', {
                    where:
                    {
                        position: { [Op.between]: [newposs, oldposs - 1] },
                        tableId: _obj.get("tableId")
                    }
                })
            } else {
                // move DOWN - decrement others
                await model.decrement('position', {
                    where:
                    {
                        position: { [Op.between]: [oldposs + 1, newposs] },
                        tableId: _obj.get("tableId")
                    }
                })
            }
            _obj.set("position", newposs)
            _obj.save()

            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    },
    /**
     * mueve la tarea a otra tabla e incrementa las posiciones de las tareas q sean mayor del valor de la poss
     */
    movedToTable: async (req, res) => {
        try {
            const { id } = req.params
            const { poss, tableId } = req.body
            const _obj = await model.findByPk(id)
            const oldtableId = _obj.get("tableId")

            // incrementear posiciones sea mayor de la nueva
            await model.increment('position', { where: { position: { [Op.gte]: poss }, tableId } })

            // mueve la tabla y position
            _obj.set("position", poss)
            _obj.set("tableId", tableId)
            _obj.save()

            // decrementa posiciones sea mayor de la tabla antigua
            await model.decrement('position', {
                where:
                {
                    position: { [Op.gt]: poss },
                    tableId: oldtableId
                }
            })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const _objpk = await model.findByPk(id)

            // decrementa posiciones sea mayor de la tabla antigua
            await model.decrement('position', {
                where:
                {
                    position: { [Op.gt]: _objpk.get("position") },
                    tableId: _objpk.get("tableId")
                }
            })
            const _obj = await model.destroy({ where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `${error}` })
        }
    },
    getMulter: () => {
        const fileFilter = (req, file, cb) => {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            if (!allowedTypes.includes(file.mimetype)) {
                const error = new Error("Incorrect file");
                error.code = "INCORRECT_FILETYPE";
                return cb(error, false)
            }
            cb(null, true);
        }

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './api/uploads');
            },
            filename: (req, file, cb) => {
                const fileName = file.originalname.toLowerCase().split(' ').join('-');
                cb(null, fileName)
            }
        });

        const upload = multer({
            storage,
            fileFilter,
            limits: {
                fileSize: 5000000
            }
        });

        return upload.single('file')
    },
    upload: (req, res) => {

        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        // res.json({ file: req.file })
        res.sendFile('./api/uploads' + fileName)


    }



}