
/**
 * Closer make the CRUD for the *model* params
 * @param model a Sequalizer:Model instanse
 */
module.exports = function (model) {

    const getAll = async (req, res) => {
        try {
            const _obj = await model.findAll({ order: [['id', 'asc']] })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    }

    const getOne = async (req, res) => {
        try {
            const _obj = await model.findByPk({ where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }

    }

    const create = async (req, res) => {
        try {
            const _obj = await model.create(req.body)
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    }
    const update = async (req, res) => {
        try {
            const { id } = req.params
            const _obj = await model.update(req.body, { where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `Error del sistema ${error}` })
        }
    }

    const deleted = async (req, res) => {
        try {
            const { id } = req.params
            const _obj = await model.destroy({ where: { id } })
            res.json(_obj)

        } catch (error) {
            res.status(500).send({ msg: `${error}` })
        }
    }

    return {
        getAll,
        create,
        update,
        delete: deleted
    }
}