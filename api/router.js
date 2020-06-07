const express = require('express'),
  router = express.Router()

/** 
 *  ------------------------------ RUTAS DE LA APP ------------------------------
 * definir las rutas utilizadas por la APP  router.get | post | put | delete 
 */

// router.get('/test', (req, res) => res.send('test'))


/**
 *  -------------------- ADMIN ------------------------------
 */

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


/**
 *  -------------------- APP ------------------------------
 */

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

module.exports = router
