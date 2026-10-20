const { Router } = require('express')
const {
    listarTreinos,
    adicionarTreino,
    alterarTreino,
    removerTreino,
    buscarTreinoPorCodigo
} = require('../controladores/treinoControlador')

const rotasTreinos = new Router()

rotasTreinos.route('/treino')
    .get(listarTreinos)
    .post(adicionarTreino)
    .put(alterarTreino)

rotasTreinos.route('/treino/:codigo')
    .get(buscarTreinoPorCodigo)
    .delete(removerTreino)

module.exports = { rotasTreinos }
