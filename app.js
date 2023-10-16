require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const dbConnect = require('./config/mongo')

app.use(cors())
app.use(express.json())
app.use(express.static('storage')) // Esto me permite usar los recursos estáticos. En este caso en la carpeta storage

const port = process.env.PORT || 3000

// Acá ubicamos las rutas: 

app.use('/api', require('./routes'))

app.listen(port, () => {
    console.log(`Tu app está lista por https://localhost:${port}`)
})

dbConnect()