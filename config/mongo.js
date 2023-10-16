const mongoose = require("mongoose")


const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => console.log("*** CONECTION SUCCESS ***")).catch((err) => console.error("CONECTION ERROR"))
}

module.exports = dbConnect
