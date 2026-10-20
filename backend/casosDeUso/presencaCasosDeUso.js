const { Praticante, Treino, Presenca } = require('../entidades/modelos')

const incluirNomes = {
    include: [
        { model: Praticante, as: 'dados_praticante', attributes: ['nome'] },
        { model: Treino, as: 'dados_treino', attributes: ['descricao'] }
    ]
}

const prepararPresenca = presenca => {
    const dados = presenca.toJSON()
    dados.praticante_nome = dados.dados_praticante.nome
    dados.treino_descricao = dados.dados_treino.descricao
    delete dados.dados_praticante
    delete dados.dados_treino
    return dados
}

const listarPresencasBanco = async () => {
    try {
        const presencas = await Presenca.findAll({
            ...incluirNomes,
            order: [['data_presenca', 'ASC']]
        })
        return presencas.map(prepararPresenca)
    } catch (erro) {
        throw 'Erro ao consultar as presenças: ' + erro.message
    }
}

const adicionarPresencaBanco = async (corpo) => {
    try {
        return await Presenca.create(corpo)
    } catch (erro) {
        throw 'Erro ao inserir a presença: ' + erro.message
    }
}

const alterarPresencaBanco = async (corpo) => {
    try {
        const [quantidade] = await Presenca.update(corpo, {
            where: { codigo: corpo.codigo }
        })
        if (quantidade === 0) {
            throw `Nenhuma presença encontrada com o código ${corpo.codigo}`
        }
        return await Presenca.findByPk(corpo.codigo)
    } catch (erro) {
        throw 'Erro ao alterar a presença: ' + erro
    }
}

const removerPresencaBanco = async (codigo) => {
    try {
        const quantidade = await Presenca.destroy({ where: { codigo } })
        if (quantidade === 0) {
            throw `Nenhuma presença encontrada com o código ${codigo}`
        }
        return 'Presença removida com sucesso'
    } catch (erro) {
        throw 'Erro ao remover a presença: ' + erro
    }
}

const buscarPresencaPorCodigoBanco = async (codigo) => {
    try {
        const presenca = await Presenca.findByPk(codigo, incluirNomes)
        if (!presenca) {
            throw `Nenhuma presença encontrada com o código ${codigo}`
        }
        return prepararPresenca(presenca)
    } catch (erro) {
        throw 'Erro ao recuperar a presença: ' + erro
    }
}

module.exports = {
    listarPresencasBanco,
    adicionarPresencaBanco,
    alterarPresencaBanco,
    removerPresencaBanco,
    buscarPresencaPorCodigoBanco
}
