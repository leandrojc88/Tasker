const express = require('express'),
  router = express.Router()
/** 
 *  ------------------------------ RUTAS DE LA APP ------------------------------
 * definir las rutas utilizadas por la APP  router.get | post | put | delete 
 */

// router.get('/test', (req, res) => res.send('test'))

/**********************************************************
 ************************** ADMIN ***************************
 **********************************************************/

// ------ Unidades --------
const UNIDADE = require('./security/routers/unidad')
router.get('/unidad', UNIDADE.getAll)
router.post('/unidad', UNIDADE.create)
router.put('/unidad/:id', UNIDADE.update)
router.delete('/unidad/:id', UNIDADE.delete)

// ------ Cargos --------
const CARGO = require('./security/routers/cargo')
router.get('/cargo', CARGO.getAll)
router.post('/cargo', CARGO.create)
router.put('/cargo/:id', CARGO.update)
router.delete('/cargo/:id', CARGO.delete)


/**********************************************************
 ************************** APP ***************************
 **********************************************************/

// ------ Project --------
const Project = require('./routers/app/project')
router.get('/project/:UserId', Project.getAllFromUser)
router.get('/dashboard_project/:UserId', Project.getDashboard)
router.post('/project', Project.create)
router.put('/project/:id', Project.update)
router.delete('/project/:id', Project.delete)
router.put('/project/finish/:id', Project.finishProject)

// ------ Tables --------
const Table = require('./routers/app/table')
router.get('/table/:projectId', Table.getAllFromProject)
router.get('/table/openandclose/:projectId', Table.getOpenAndClose)
router.post('/table', Table.create)
router.put('/table/:id', Table.update)
router.delete('/table/:id', Table.delete)
router.put('/table/moveto/:id', Table.moveTo)

// -------- Tasks ----------
const Task = require('./routers/app/task')
router.get('/task/:tableId', Task.getAllFromTable)
router.post('/task', Task.create)
router.put('/task/:id', Task.update)
router.delete('/task/:id', Task.delete)
router.put('/task/movedtotable/:id', Task.movedToTable)
router.put('/task/moved/:id', Task.moved)

router.get('/task/load_img/:id', Task.getImg)
router.post('/task/upload_img/:id', Task.getMulter(), Task.getImg)
router.delete('/task/img/:id', Task.deleteImg)
// -------- Sub Tasks ----------
const SubTask = require('./routers/app/subtask')
router.get('/subtask/:taskId', SubTask.getAllFromTask)
router.post('/subtask', SubTask.create)
router.put('/subtask/:id', SubTask.update)
router.delete('/subtask/:id', SubTask.delete)
router.put('/subtask/changedone/:id', SubTask.changeDone)




module.exports = router
