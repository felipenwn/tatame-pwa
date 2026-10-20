const { Praticante } = require('../entidades/modelos')

const listarPraticantesBanco = async () => {
    try {
        return await Praticante.findAll({ order: [['nome', 'ASC']] })
    } catch (erro) {
        throw 'Erro ao consultar os praticantes: ' + erro.message
    }
}

const adicionarPraticanteBanco = async (corpo) => {
    try {
        return await Praticante.create(corpo)
    } catch (erro) {
        throw 'Erro ao inserir o praticante: ' + erro.message
    }
}

const alterarPraticanteBanco = async (corpo) => {
    try {
        const [quantidade] = await Praticante.update(corpo, {
            where: { codigo: corpo.codigo }
        })
        if (quantidade === 0) {
            throw `Nenhum praticante encontrado com o código ${corpo.codigo}`
        }
        return await Praticante.findByPk(corpo.codigo)
    } catch (erro) {
        throw 'Erro ao alterar o praticante: ' + erro
    }
}

const removerPraticanteBanco = async (codigo) => {
    try {
        const quantidade = await Praticante.destroy({ where: { codigo } })
        if (quantidade === 0) {
            throw `Nenhum praticante encontrado com o código ${codigo}`
        }
        return 'Praticante removido com sucesso'
    } catch (erro) {
        throw 'Erro ao remover o praticante: ' + erro
    }
}

const buscarPraticantePorCodigoBanco = async (codigo) => {
    try {
        const praticante = await Praticante.findByPk(codigo)
        if (!praticante) {
            throw `Nenhum praticante encontrado com o código ${codigo}`
        }
        return praticante
    } catch (erro) {
        throw 'Erro ao recuperar o praticante: ' + erro
    }
}

module.exports = {
    listarPraticantesBanco,
    adicionarPraticanteBanco,
    alterarPraticanteBanco,
    removerPraticanteBanco,
    buscarPraticantePorCodigoBanco
}
