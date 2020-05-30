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


module.exports = router
