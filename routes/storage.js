const express = require('express')
const uploadMiddleware = require('../utils/handleStorage')
const { createItem, getItems, getItem, deleteItem } = require('../controllers/storage')
const validatorGetItem = require('../validators/storage')
const router = express.Router()

// TODO: Esta es la ruta storage

// Obtener lista de items
router.get('/', getItems)

// Obtener item 
router.get('/:id', validatorGetItem, getItem)

// Crear item
router.post('/', uploadMiddleware.single('myfile'), createItem) 

// Borrar item 
router.delete('/:id', validatorGetItem, deleteItem)

module.exports = router