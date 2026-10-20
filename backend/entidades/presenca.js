const { DataTypes } = require('sequelize')
const { sequelize } = require('../config')

const Presenca = sequelize.define('Presenca', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    praticante: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    treino: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_presenca: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'presencas',
    timestamps: false
})

module.exports = Presenca
