const { Router } = require('express')
const {
    listarPraticantes,
    adicionarPraticante,
    alterarPraticante,
    removerPraticante,
    buscarPraticantePorCodigo
} = require('../controladores/praticanteControlador')

const rotasPraticantes = new Router()

rotasPraticantes.route('/praticante')
    .get(listarPraticantes)
    .post(adicionarPraticante)
    .put(alterarPraticante)

rotasPraticantes.route('/praticante/:codigo')
    .get(buscarPraticantePorCodigo)
    .delete(removerPraticante)

module.exports = { rotasPraticantes }
