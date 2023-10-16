const {encrypt, compare} = require('../utils/handlePassword')
const { matchedData } = require('express-validator')
const handleHttpError = require('../utils/handleError')
const usersModel = require('../models/nosql/users')
const { tokenSign } = require('../utils/handleJwt')

/**
 * Encargado de registrar un usuario
 * @param {*} rec 
 * @param {*} res 
 */
const registerController = async (req, res) => {
    try {
        req = matchedData(req)
        const password = await encrypt(req.password)
        const body = {...req, password}
        const dataUser = await usersModel.create(body)
        dataUser.set('password', undefined, {strict: false}) // esto sirve para ocultar el passoword en la respuesta del server

        const data = {
            token: await tokenSign(dataUser),
            user: dataUser
        }
    res.send({data})
    } catch (error) {
        console.error(error)
        handleHttpError(res, 'ERROR_REGISTRATION')
    }
    
}

/**
 * Encargado del login del usuario
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req, res) => {
    try {
        req = matchedData(req)
        const user = await usersModel.findOne({email: req.email}).select('password name email role _id') // Este punto necesito indicarle que me devuelva el password, ya que está seteado en select false en el modelo, además me traigo toda la información necesaria para mantener una sesión
        if(!user) {
            handleHttpError(res, 'USER_NOT_EXIST', 404)
            return
        }
        const hashPassword = user.password
        const checkPassword = await compare(hashPassword, req.password) //En req.password, viene la contraseña plana
        if(!checkPassword) {
            handleHttpError(res, 'PASSWORD_INVALID', 401)
            return
        }
        user.set('password', undefined, {strict: false}) // Antes de mandar la data, vuelvo a setear el password de manera que no viaje en el response
        const data = {
            token: await tokenSign(user),
            user
        }

        res.send({data})

    } catch (error) {
        console.error(error)
        handleHttpError(res, 'ERROR_LOGIN')
    }
}


module.exports = {registerController, loginController}