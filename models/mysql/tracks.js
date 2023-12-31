const { DataTypes } = require('sequelize')
const {  sequelizeInstance } = require('../../config/mysql')

const Tracks = sequelizeInstance.define(
    'tracks',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING,
        },
        cover: {
            type: DataTypes.STRING,
        },
        artist_name: {
            type: DataTypes.STRING,
        },
        artist_nickname: {
            type: DataTypes.STRING
        },
        artist_nationality: {
            type: DataTypes.STRING
        },
        duration_start: {
            type: DataTypes.NUMBER
        },
        duration_end: {
            type: DataTypes.NUMBER
        },
        mediaId: {
            type: DataTypes.STRING
        },
    },
    {
        timestamps: true
    }
)

module.exports = Tracks