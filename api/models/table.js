const db = require('../database'),
    { DataTypes } = require('sequelize')


const table = db.define('table', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    possition:{
        type:DataTypes.INTEGER
    }
})

const project = require('./project')
project.hasMany(table)
table.belongsTo(project)
module.exports = table