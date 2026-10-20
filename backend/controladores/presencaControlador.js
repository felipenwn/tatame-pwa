const {
    listarPresencasBanco,
    adicionarPresencaBanco,
    alterarPresencaBanco,
    removerPresencaBanco,
    buscarPresencaPorCodigoBanco
} = require('../casosDeUso/presencaCasosDeUso')

const listarPresencas = async (requisicao, resposta) => {
    await listarPresencasBanco()
        .then(dados => resposta.status(200).json(dados))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const adicionarPresenca = async (requisicao, resposta) => {
    await adicionarPresencaBanco(requisicao.body)
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: 'Presença criada', objeto: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const alterarPresenca = async (requisicao, resposta) => {
    await alterarPresencaBanco(requisicao.body)
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: 'Presença alterada', objeto: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const removerPresenca = async (requisicao, resposta) => {
    await removerPresencaBanco(parseInt(requisicao.params.codigo))
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const buscarPresencaPorCodigo = async (requisicao, resposta) => {
    await buscarPresencaPorCodigoBanco(parseInt(requisicao.params.codigo))
        .then(dados => resposta.status(200).json(dados))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

module.exports = {
    listarPresencas,
    adicionarPresenca,
    alterarPresenca,
    removerPresenca,
    buscarPresencaPorCodigo
}
