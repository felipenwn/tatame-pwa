const { Treino } = require('../entidades/modelos')

const listarTreinosBanco = async () => {
    try {
        return await Treino.findAll({ order: [['data', 'ASC'], ['horario', 'ASC']] })
    } catch (erro) {
        throw 'Erro ao consultar os treinos: ' + erro.message
    }
}

const adicionarTreinoBanco = async (corpo) => {
    try {
        return await Treino.create(corpo)
    } catch (erro) {
        throw 'Erro ao inserir o treino: ' + erro.message
    }
}

const alterarTreinoBanco = async (corpo) => {
    try {
        const [quantidade] = await Treino.update(corpo, {
            where: { codigo: corpo.codigo }
        })
        if (quantidade === 0) {
            throw `Nenhum treino encontrado com o código ${corpo.codigo}`
        }
        return await Treino.findByPk(corpo.codigo)
    } catch (erro) {
        throw 'Erro ao alterar o treino: ' + erro
    }
}

const removerTreinoBanco = async (codigo) => {
    try {
        const quantidade = await Treino.destroy({ where: { codigo } })
        if (quantidade === 0) {
            throw `Nenhum treino encontrado com o código ${codigo}`
        }
        return 'Treino removido com sucesso'
    } catch (erro) {
        throw 'Erro ao remover o treino: ' + erro
    }
}

const buscarTreinoPorCodigoBanco = async (codigo) => {
    try {
        const treino = await Treino.findByPk(codigo)
        if (!treino) {
            throw `Nenhum treino encontrado com o código ${codigo}`
        }
        return treino
    } catch (erro) {
        throw 'Erro ao recuperar o treino: ' + erro
    }
}

module.exports = {
    listarTreinosBanco,
    adicionarTreinoBanco,
    alterarTreinoBanco,
    removerTreinoBanco,
    buscarTreinoPorCodigoBanco
}
