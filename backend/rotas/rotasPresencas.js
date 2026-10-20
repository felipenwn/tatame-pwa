const { Router } = require('express')
const {
    listarPresencas,
    adicionarPresenca,
    alterarPresenca,
    removerPresenca,
    buscarPresencaPorCodigo
} = require('../controladores/presencaControlador')

const rotasPresencas = new Router()

rotasPresencas.route('/presenca')
    .get(listarPresencas)
    .post(adicionarPresenca)
    .put(alterarPresenca)

rotasPresencas.route('/presenca/:codigo')
    .get(buscarPresencaPorCodigo)
    .delete(removerPresenca)

module.exports = { rotasPresencas }
