const db = require('../database'),
    { DataTypes } = require('sequelize')

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
    description: {
        type: DataTypes.STRING
    },
    is_dashboard: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    finished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

// relations
const User = require('../security/models/userSystem')
User.hasMany(project)
project.belongsTo(User)

module.exports = project