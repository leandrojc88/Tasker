const model = require('../../models/sub_task')
const { Op } = require("sequelize");

module.exports = {
    getAllFromTask: async (req, res) => {
        try {
            const { taskId } = req.params
            const _obj = await model.findAll({
                where: { taskId },
                order: [['id', 'asc']]
            })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    },

    create: async (req, res) => {
        try {
            const _obj = await model.create({ ...req.body })
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
    changeDone: async (req, res) => {
        try {
            const { id } = req.params
            const { done } = req.body
            const _obj = await model.findByPk(id)
            _obj.set('done', done)
            _obj.save()
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