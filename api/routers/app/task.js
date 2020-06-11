const model = require('../../models/task')
const { Op } = require("sequelize");

module.exports = {
    getAllFromTable: async (req, res) => {
        try {
            const { tableId } = req.params
            const _obj = await model.findAll({
                where: { tableId },
                order: [['id', 'asc']]
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