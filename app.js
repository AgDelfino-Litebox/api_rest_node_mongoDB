require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morganBody = require('morgan-body')
const app = express()
const dbConnectNoSql = require('./config/mongo')
const loggerStream = require("./utils/handleLogger")
const { dbConnectMySql } = require("./config/mysql")
const ENGINE_DB = process.env.ENGINE_DB

app.use(cors())
app.use(express.json())
app.use(express.static('storage')) // Esto me permite usar los recursos estáticos. En este caso en la carpeta storage


morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function (req, res) {
        return res.statusCode < 400 // Si el código es menor a 400 lo va a "Skipear"
    }
})
const port = process.env.PORT || 3000

// Acá ubicamos las rutas: 

app.use('/api', require('./routes'))

app.listen(port, () => {
    console.log(`Tu app está lista por https://localhost:${port}`)
})

if(ENGINE_DB === 'nosql') {
    dbConnectNoSql()
} else {
    dbConnectMySql()
}