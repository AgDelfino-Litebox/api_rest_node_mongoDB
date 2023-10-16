const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

/**
 * debes pasar objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) => {
    const sign = await jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: '2h'
        }
    )
    return sign
}

/**
 * Acá hay que pasar el token de sesión, el JWT
 * @param {*} tokenJWT 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    } catch (error) {
        return null
    }
}

module.exports = {tokenSign, verifyToken}