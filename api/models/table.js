const db = require('../database')
import { DataTypes } from 'sequelize';

const table = db.define('table', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = table