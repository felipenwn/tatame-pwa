require('dotenv').config()
const { Sequelize } = require('sequelize')

const producao = process.env.NODE_ENV === 'production'

let sequelize = null

if (producao) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    })
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME || 'tatamepw',
        process.env.DB_USER || 'postgres',
        process.env.DB_PASSWORD || 'postgres',
        {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false
        }
    )
}

module.exports = { sequelize }
