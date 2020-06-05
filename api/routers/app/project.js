const model = require('../../models/project')
const User = require('../../security/models/userSystem')

module.exports = {
    getAllFromUser: async (req, res) => {
        try {
            const { UserId } = req.params
            const _obj = await model.findAll({
                where: { is_dashboard: false, UserId, finished: false },
                order: [['id', 'asc']],
                include: [{ model: User, attributes: ['_id', 'user', 'full_name', 'rol'] }]
            })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    },
    getOne: async (req, res) => {
        try {
            const _obj = await model.findByPk({ where: { id }, include: [{ model: User, attributes: ['_id', 'user', 'full_name', 'rol'] }] })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    },
    getDashboard: async (req, res) => {
        try {
            const { UserId } = req.params
            const _obj = await model.findOrCreate({
                where: { UserId, is_dashboard: true }, defaults: {
                    name: 'Dashboard',
                    description: 'Dashboard Create by default',
                    is_dashboard: true
                }
            })
            res.json(_obj[0])
        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
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
    },
    finishProject: async (req, res) => {
        try {
            const { id } = req.params
            const _obj = await model.findByPk(id)
            _obj.finished = true
            _obj.save({ fields: ['finished'] })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    },
}