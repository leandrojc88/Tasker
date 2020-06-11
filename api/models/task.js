const db = require('../database'),
{ DataTypes } = require('sequelize')


const task = db.define('task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    position:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const table = require('./table')
table.hasMany(task)
    task.belongsTo(table)
module.exports = task