const express = require('express')
const router = express.Router()
const {validatorRegister, validatorLogin} = require('../validators/auth')
const { registerController, loginController } = require('../controllers/auth')

// Register
router.post('/register', validatorRegister, registerController)

// Login
router.post('/login', validatorLogin, loginController)

module.exports = router