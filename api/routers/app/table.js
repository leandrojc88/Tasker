const model = require('../../models/table')
const { Op } = require("sequelize");

module.exports = {
    /**
     * @returns all tables and hir task by the specific project
     */
    getAllFromProject: async (req, res) => {
        try {
            const { projectId } = req.params
            const _obj = await model.findAll({
                where: {
                    projectId,
                    [Op.not]: [{ name: ['Open', 'Close'], }]
                },
                order: [['position', 'asc']]
            })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    },

    /**
     * @returns returns Tables(Open & Close) with her tasks of the project
     */
    getOpenAndClose: async (req, res) => {
        try {
            const { projectId } = req.params
            const _obj = await model.findAll({
                where: { projectId, name: { [Op.or]: ['Open', 'Close'] } },
                order: [['id', 'asc']]
            })
            /* 
                        // assing task
                        const Task = require('./task')
                        retur = []
                        for (let table of _obj) {
                            const tj = table.toJSON()
                            const tasks = await Task.getJsonAllFromTable(tj.id)
                            tj.tasks = tasks
                            retur.push(tj)
                        } */
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    },
    getOne: async (req, res) => {
        try {
            const _obj = await model.findByPk({ where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    },

    /**
     * create Tables(Open & Close) if not exist and return it
     */
    createOpenAndClose: async (projectId) => {
        try {
            const open = await model.findOrCreate({
                where: { name: 'Open', projectId }, defaults: {
                    name: 'Open',
                    projectId,
                    position: 0
                }, attributes: ['id', 'name', 'projectId']
            })
            const close = await model.findOrCreate({
                where: { name: 'Close', projectId }, defaults: {
                    name: 'Close',
                    projectId,
                    position: -1
                }, attributes: ['id', 'name', 'projectId']
            })
            return { open: open[0].toJSON(), close: close[0].toJSON() }

        } catch (error) {
            throw new Error(`Error in Open&Close: ${error}`)
        }
    },
    create: async (req, res) => {
        try {
            const _obj = await model.create(req.body)
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
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const table = await model.findByPk(id)
            await model.decrement('position', {
                where: {
                    position: { [Op.gt]: table.get('position') },
                    projectId: table.get('projectId')
                }
            })
            const _obj = await model.destroy({ where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `${error}` })
        }
    },

    /**
     * intercanbite the position of two tables , current_table and (left or right)
     */
    moveTo: async (req, res) => {
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
                        projectId: _obj.get("projectId")
                    }
                })
            } else {
                // move DOWN - decrement others
                await model.decrement('position', {
                    where:
                    {
                        position: { [Op.between]: [oldposs + 1, newposs] },
                        projectId: _obj.get("projectId")
                    }
                })
            }
            _obj.set("position", newposs)
            _obj.save()
            res.json(1) //true 
           /*  const { id } = req.params
            const { direction } = req.body
            const current_table = await model.findOne({ where: { id } })

            const next_poss = direction === 'left'
                ? current_table.get('position') - 1
                : current_table.get('position') + 1
            const interc = await model.findOne({ where: { position: next_poss, projectId: current_table.get('projectId') } })

            interc.set('position', current_table.get('position'))
            current_table.set('position', next_poss)

            interc.save({ fields: ['position'] })
            current_table.save({ fields: ['position'] })

            res.json(1) //true */

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    }
}