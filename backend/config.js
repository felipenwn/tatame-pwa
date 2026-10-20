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
    sequelize = new Sequelize('tatamepw', 'postgres', 'postgres', {
        host: 'localhost',
        dialect: 'postgres',
        logging: false
    })
}

module.exports = { sequelize }
