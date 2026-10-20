const {
    listarTreinosBanco,
    adicionarTreinoBanco,
    alterarTreinoBanco,
    removerTreinoBanco,
    buscarTreinoPorCodigoBanco
} = require('../casosDeUso/treinoCasosDeUso')

const listarTreinos = async (requisicao, resposta) => {
    await listarTreinosBanco()
        .then(dados => resposta.status(200).json(dados))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const adicionarTreino = async (requisicao, resposta) => {
    await adicionarTreinoBanco(requisicao.body)
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: 'Treino criado', objeto: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const alterarTreino = async (requisicao, resposta) => {
    await alterarTreinoBanco(requisicao.body)
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: 'Treino alterado', objeto: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const removerTreino = async (requisicao, resposta) => {
    await removerTreinoBanco(parseInt(requisicao.params.codigo))
        .then(dados => resposta.status(200).json({ status: 'sucesso', mensagem: dados }))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

const buscarTreinoPorCodigo = async (requisicao, resposta) => {
    await buscarTreinoPorCodigoBanco(parseInt(requisicao.params.codigo))
        .then(dados => resposta.status(200).json(dados))
        .catch(erro => resposta.status(400).json({ status: 'erro', mensagem: erro }))
}

module.exports = {
    listarTreinos,
    adicionarTreino,
    alterarTreino,
    removerTreino,
    buscarTreinoPorCodigo
}
