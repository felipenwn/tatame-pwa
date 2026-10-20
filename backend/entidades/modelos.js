const Praticante = require('./praticante')
const Treino = require('./treino')
const Presenca = require('./presenca')

Praticante.hasMany(Presenca, { foreignKey: 'praticante' })
Treino.hasMany(Presenca, { foreignKey: 'treino' })

Presenca.belongsTo(Praticante, {
    foreignKey: 'praticante',
    as: 'dados_praticante'
})

Presenca.belongsTo(Treino, {
    foreignKey: 'treino',
    as: 'dados_treino'
})

module.exports = { Praticante, Treino, Presenca }
