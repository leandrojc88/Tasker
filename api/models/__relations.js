
// models
const project = require('./project')
const table = require('./table')
const task = require('./task')
const sub_task = require('./sub_task')
const user = require('../security/models/userSystem')


// make relations

user.hasMany(project)
project.belongsTo(user)

project.hasMany(table)
table.belongsTo(project)

table.hasMany(task)
task.belongsTo(table)

task.hasMany(sub_task)
sub_task.belongsTo(task)