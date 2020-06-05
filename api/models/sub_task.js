const db = require('../database'),
    { DataTypes } = require('sequelize')

const sub_task = db.define('sub_task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

const task = require('./task')
task.hasMany(sub_task)
sub_task.belongsTo(task)
module.exports = sub_task