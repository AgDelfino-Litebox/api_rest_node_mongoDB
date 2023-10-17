const {Sequelize} = require('sequelize')

const database = process.env.MYSQL_DB
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST

const sequelizeInstance = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: 'postgres'
    }
)

const dbConnectMySql = async () => {
    try {
      await  sequelizeInstance.authenticate()
      console.log('MY_SQL_CONNECTED')
    } catch (error) {
        console.error('MY_CONNECT_ERROR', error)
    }
}

module.exports = {sequelizeInstance, dbConnectMySql}

