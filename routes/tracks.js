const express = require('express')
const router = express.Router()
const {validatorCreateItem, validatorGetItem} = require('../validators/tracks')
const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/tracks')
const customHeader = require('../middlewares/customHeader')
const authMiddleware = require('../middlewares/session')


// RUTA DE CANCIONES: GET / PUT / DELETE / PUT

// Obtener todos los tracks
router.get("/", authMiddleware, getItems)

// Obtener un track específico
router.get('/:id', validatorGetItem, getItem)

// Cargar un track
router.post('/', validatorCreateItem, customHeader, createItem)

// Actualizar un track
router.put('/:id', validatorCreateItem, validatorGetItem, updateItem)

// Eliminar un track
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router