//sync

const project = require('./project')
const table = require('./table')
const task = require('./task')
const sub_task = require('./sub_task')

module.exports = async function systemaData() {
    console.log('init App'.blue);
    await project.sync({ alter: true })
    await table.sync({ alter: true })
    await task.sync({ alter: true })
    await sub_task.sync({ alter: true })
    console.log('finish App'.blue);
}
