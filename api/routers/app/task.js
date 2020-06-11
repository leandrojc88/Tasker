const model = require('../../models/task')
const { Op } = require("sequelize");

module.exports = {
    getAllFromTable: async (req, res) => {
        try {
            const { tableId } = req.params
            const _obj = await model.findAll({
                where: { tableId },
                order: [['position', 'asc']]
            })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    },
    async getJsonAllFromTable(tableId) {
        const _obj = await model.findAll({
            where: { tableId },
            order: [['id', 'asc']]
        })
        return _obj.map(el => el.toJSON())
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
    }



}