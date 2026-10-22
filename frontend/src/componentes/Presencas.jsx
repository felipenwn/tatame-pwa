import { useEffect, useState } from 'react'
import { requisicao } from '../api'

const formularioVazio = {
  codigo: '',
  praticante: '',
  treino: '',
  data_presenca: ''
}

function Presencas() {
  const [presencas, setPresencas] = useState([])
  const [praticantes, setPraticantes] = useState([])
  const [treinos, setTreinos] = useState([])
  const [formulario, setFormulario] = useState(formularioVazio)
  const [mensagem, setMensagem] = useState('')

  const carregar = async () => {
    try {
      const dadosPresencas = await requisicao('/presenca')
      const dadosPraticantes = await requisicao('/praticante')
      const dadosTreinos = await requisicao('/treino')
      setPresencas(dadosPresencas)
      setPraticantes(dadosPraticantes)
      setTreinos(dadosTreinos)
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const alterarCampo = evento => {
    setFormulario({ ...formulario, [evento.target.name]: evento.target.value })
  }

  const salvar = async evento => {
    evento.preventDefault()
    try {
      const dados = { ...formulario }
      if (!dados.codigo) delete dados.codigo
      await requisicao('/presenca', {
        method: formulario.codigo ? 'PUT' : 'POST',
        body: JSON.stringify(dados)
      })
      setMensagem(formulario.codigo ? 'Presença alterada' : 'Presença criada')
      setFormulario(formularioVazio)
      carregar()
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  const editar = presenca => {
    setFormulario({
      codigo: presenca.codigo,
      praticante: presenca.praticante,
      treino: presenca.treino,
      data_presenca: presenca.data_presenca
    })
    setMensagem('')
  }

  const remover = async codigo => {
    if (!window.confirm('Deseja remover esta presença?')) return
    try {
      await requisicao('/presenca/' + codigo, { method: 'DELETE' })
      setMensagem('Presença removida')
      carregar()
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  return (
    <section>
      <h2>Presenças</h2>
      <form onSubmit={salvar}>
        <div style={{ marginBottom: '5px' }}><label>Praticante:
          <select name="praticante" value={formulario.praticante} onChange={alterarCampo} required>
            <option value="">Selecione</option>
            {praticantes.map(praticante => (
              <option key={praticante.codigo} value={praticante.codigo}>{praticante.nome}</option>
            ))}
          </select>
        </label></div>
        <div style={{ marginBottom: '5px' }}><label>Treino:
          <select name="treino" value={formulario.treino} onChange={alterarCampo} required>
            <option value="">Selecione</option>
            {treinos.map(treino => (
              <option key={treino.codigo} value={treino.codigo}>{treino.descricao}</option>
            ))}
          </select>
        </label></div>
        <div style={{ marginBottom: '5px' }}><label>Data da presença:
          <input name="data_presenca" type="date" value={formulario.data_presenca} onChange={alterarCampo} required />
        </label></div>
        <div style={{ marginBottom: '10px' }}>
          <button type="submit">{formulario.codigo ? 'Alterar' : 'Criar novo'}</button>
          {formulario.codigo && <button style={{ marginLeft: '5px' }} type="button" onClick={() => setFormulario(formularioVazio)}>Cancelar</button>}
        </div>
      </form>
      {mensagem && <p>{mensagem}</p>}
      <div>
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Praticante</th>
              <th>Treino</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {presencas.map(presenca => (
              <tr key={presenca.codigo}>
                <td>{presenca.praticante_nome}</td>
                <td>{presenca.treino_descricao}</td>
                <td>{presenca.data_presenca}</td>
                <td>
                  <button style={{ marginRight: '5px' }} onClick={() => editar(presenca)}>Editar</button>
                  <button onClick={() => remover(presenca.codigo)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Presencas
