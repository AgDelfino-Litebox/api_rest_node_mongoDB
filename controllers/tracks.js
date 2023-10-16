const { matchedData } = require('express-validator')
const {tracksModel} = require('../models')
const handleHttpError = require('../utils/handleError')
const tracks = require('../models/nosql/tracks')

/**
 * Obtener todos los registros
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    const user = req.user
    try {
        const data = await tracksModel.find({})
        res.send({user, data})
    } catch (error) {
        handleHttpError(res, 'ERROR_GETTING_ITEMS')
    }
}

/**
 * Obtener un registro en particular
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.findById(id)
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM')
    }
}

/**
 * Crear un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const body = matchedData(req)
        const data = await tracksModel.create(body)
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATING_TRACK')
    }
}

/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = async (req, res) => {
     try {
        const {id, ...body} = matchedData(req)
        const data = await tracksModel.findOneAndUpdate(
            {_id: id}, body, {new: true, useFindAndModify: false}
        )
        if(!data) {
            return res.status(404).send({message: 'Elemento no encontrado'})
        }
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATING_TRACK')
    }
}

/**
 * Borrar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req)
        const {id} = req
        const data = await tracksModel.delete({_id: id})
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_TRACK')
    }
}



module.exports = {getItems, getItem, createItem, updateItem, deleteItem}