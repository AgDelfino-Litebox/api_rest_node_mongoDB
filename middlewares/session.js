const handleHttpError = require("../utils/handleError")
const { verifyToken } = require("../utils/handleJwt")
const {usersModel} = require('../models')

const authMiddleware = async (req, res, next) => {
    try {
        
        if(!req.headers.authorization) {
            handleHttpError(res, 'NEED_SESSION', 401)
            return
        }

        const token = req.headers.authorization.split(' ').pop() // Esto se hace porque por defecto el string trae la palabra bearer, de esta manera cortamos el bearer y nos quedamos solo con el token
        const dataToken = await verifyToken(token)

        if(!dataToken._id) { // Verificamos que exista una propiedad _id
            handleHttpError(res, 'ERROR_ID_TOKEN', 401)
            return
        }

        const user = await usersModel.findById({_id: dataToken._id})
        req.user = user
        // Esto nos va a servir para marcar una trazabilidad de lo que el usuario hace dentro de la app (historial por ejemplo)
        next()

    } catch (error) {
        console.log(error)
        handleHttpError(res, 'NOT_SESSION', 401)
    }
}

module.exports = authMiddleware