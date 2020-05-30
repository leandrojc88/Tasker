const db = require('../database')
import { DataTypes } from 'sequelize';

const project = db.define('project', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desciption: {
        type: DataTypes.STRING
    },
    finalizado: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = project