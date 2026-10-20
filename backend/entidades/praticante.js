const { DataTypes } = require('sequelize')
const { sequelize } = require('../config')

const Praticante = sequelize.define('Praticante', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING(14),
        allowNull: false
    },
    faixa: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    data_cadastro: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    tableName: 'praticantes',
    timestamps: false
})

module.exports = Praticante
