const { DataTypes } = require('sequelize')
const {  sequelizeInstance } = require('../../config/mysql')

const User = sequelizeInstance.define(
    'users',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.NUMBER,
        },
        email: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(['user', 'admin'])
        }
    },
    {
        timestamps: true
    }
)

module.exports = User