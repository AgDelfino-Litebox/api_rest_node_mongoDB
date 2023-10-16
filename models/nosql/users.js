const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')

const UserScheme = mongoose.Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false // Esto sirve para ocultar el password en la consulta al server
        },
        role: {
            type:['user', 'adming'],
            default: 'user' 
        }
    },
    {
        timestamps: true, // TODO createdAt, updatedAt
        versionKey: false
     }
)

UserScheme.plugin(mongooseDelete, {overrideMethods: 'all'})
module.exports = mongoose.model('users', UserScheme)