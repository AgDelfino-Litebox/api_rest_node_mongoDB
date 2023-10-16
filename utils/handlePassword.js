const bcryptjs = require('bcryptjs')

/**
 * Recibe la contraseña sin encriptar
 * @param {*} passwordPlain 
 * @returns 
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    // obtenemos la versión encriptada de la contraseña
    return hash
}

/**
 * Recibe la contraseña encriptada y la contraseña sin encriptar
 * @param {*} hashPassword 
 * @param {*} passwordPlain 
 * @returns 
 */
const compare = async (hashPassword, passwordPlain) => {
   return await bcryptjs.compare(passwordPlain, hashPassword)
}

module.exports = {encrypt, compare}