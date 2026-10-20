const {
    listarPraticantesBanco,
    adicionarPraticanteBanco,
    alterarPraticanteBanco,
    removerPraticanteBanco,
    buscarPraticantePorCodigoBanco
} = require('../casosDeUso/praticanteCasosDeUso')

const listarPraticantes = async (requisicao, resposta) => {
    await listarPraticantesBanco()
        .then(dados => resposta.status(200).json(dados))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const adicionarPraticante = async (requisicao, resposta) => {
    await adicionarPraticanteBanco(requisicao.body)
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: 'Praticante criado', objeto: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const alterarPraticante = async (requisicao, resposta) => {
    await alterarPraticanteBanco(requisicao.body)
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: 'Praticante alterado', objeto: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const removerPraticante = async (requisicao, resposta) => {
    await removerPraticanteBanco(parseInt(requisicao.params.codigo))
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const buscarPraticantePorCodigo = async (requisicao, resposta) => {
    await buscarPraticantePorCodigoBanco(parseInt(requisicao.params.codigo))
        .then(dados => resposta.status(200).json(dados))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

module.exports = {
    listarPraticantes,
    adicionarPraticante,
    alterarPraticante,
    removerPraticante,
    buscarPraticantePorCodigo
}
