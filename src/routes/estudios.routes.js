const express = require('express')
const router = express.Router()
const controller = require('../controllers/estudioController')


//create -> POST -> save()
router.post('/', controller.criarEstudio)
//read -> GET -> find()
router.get('/', controller.mostraEstudios)

//update -> PATCH -> getById() ou findOne() e save()
router.patch('/:id', controller.atualizaEstudio)

//router.delete('/:id', controller.deletaEstudios)
router.delete('/:id', controller.deletaEstudios)

module.exports = router








