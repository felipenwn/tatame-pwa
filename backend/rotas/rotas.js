const { Router } = require('express')
const { rotasPraticantes } = require('./rotasPraticantes')
const { rotasTreinos } = require('./rotasTreinos')
const { rotasPresencas } = require('./rotasPresencas')

const rotas = new Router()

rotas.get('/', (requisicao, resposta) => {
    resposta.status(200).json({ mensagem: 'API Tatame funcionando' })
})

rotas.use(rotasPraticantes)
rotas.use(rotasTreinos)
rotas.use(rotasPresencas)

module.exports = rotas
