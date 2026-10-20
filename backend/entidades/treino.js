const { DataTypes } = require('sequelize')
const { sequelize } = require('../config')

const Treino = sequelize.define('Treino', {
    codigo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    professor: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horario: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    duracao_minutos: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 }
    },
    limite_vagas: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 }
    }
}, {
    tableName: 'treinos',
    timestamps: false
})

module.exports = Treino
