/**
 * Array con los roles permitidos
 * @param {*} roles 
 * @returns 
 */

const handleHttpError = require("../utils/handleError")

const checkRol = (roles) => (req, res, next) => {
    try {
        const {user} = req
        const rolesByUser = user.role
        const checkValueRol = roles.some((singleRol) => rolesByUser.includes(singleRol)) // Verifico que el rol del usuario exista en los roles permitidos

        if(!checkValueRol) {
            return handleHttpError(res, 'USER_NOT_PERMISSIONS', 403)
        }
        next()
    } catch (error) {
        console.error(error)
        handleHttpError(res, 'ERROR_PERMISSION', 403)
    }
}

module.exports = checkRol