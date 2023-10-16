const { matchedData } = require('express-validator')
const {storageModel} = require('../models')
const fs = require('fs')
const handleHttpError = require('../utils/handleError')

const PUBLIC_URL = process.env.PUBLIC_URL
const MEDIA_PATH = `${__dirname}/../storage`

/**
 * Obtener todos los registros
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async (req, res) => {
    try {
        const data = await storageModel.find({})
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEMS_STORAGE')
    }
}

/**
 * Obtener un registro en particular
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    try {
        const { id } = matchedData(req)
        console.log(id) 
        const data = await storageModel.findById({_id: id})
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_GET_ITEM_STORAGE')
    }
}

/**
 * Crear un registro
 * @param {*} req 
 * @param {*} res 
 */
const createItem = async (req, res) => {
    try {
        const {file} = req
        const fileData = {
            url: `${PUBLIC_URL}/${file.filename}`,
            filename: file.filename
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch (error) {
        handleHttpError(res, 'ERROR_CREATE_ITEM')
    }
}

/**
 * Borrar un registro
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        const {id} = matchedData(req)
        const dataFile = await storageModel.findById({_id: id})
        await storageModel.deleteOne({_id: id})
        const {filename} = dataFile
        const filePath = `${MEDIA_PATH}/${filename}`
        fs.unlinkSync(filePath)

        const data = {
            filePath,
            deleted: 1
        }

        res.send({data})
    } catch (error) {
        console.log(error)
        handleHttpError(res, 'ERROR_DELETE_ITEM')
    }
}



module.exports = {getItems, getItem, createItem, deleteItem}