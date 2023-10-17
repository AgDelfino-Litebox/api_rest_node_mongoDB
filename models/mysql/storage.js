const { DataTypes } = require('sequelize')
const {  sequelizeInstance } = require('../../config/mysql')

const Storage = sequelizeInstance.define(
    'storages',
    {
        url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        filename: {
            type: DataTypes.NUMBER,
        },
    },
    {
        timestamps: true
    }
)

module.exports = Storage