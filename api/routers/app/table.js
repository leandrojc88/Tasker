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
                order: [['id', 'asc']]
            })

            // assing task
            const Task = require('./task')
            retur = []
            for (let table of _obj) {
                const tj = table.toJSON()
                const tasks = await Task.getJsonAllFromTable(tj.id)
                tj.tasks = tasks
                retur.push(tj)
            }
            res.json(retur)

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

            // assing task
            const Task = require('./task')
            retur = []
            for (let table of _obj) {
                const tj = table.toJSON()
                const tasks = await Task.getJsonAllFromTable(tj.id)
                tj.tasks = tasks
                retur.push(tj)
            }
            res.json(retur)

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
                    possition: 0
                }, attributes: ['id', 'name', 'projectId']
            })
            const close = await model.findOrCreate({
                where: { name: 'Close', projectId }, defaults: {
                    name: 'Close',
                    projectId,
                    possition: -1
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
            const _obj = await model.destroy({ where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `${error}` })
        }
    }
}