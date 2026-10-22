import { useEffect, useState } from 'react'
import { requisicao } from '../api'

const formularioVazio = {
  codigo: '',
  praticante: '',
  treino: '',
  data_presenca: ''
}

const formatarData = data => data ? data.split('-').reverse().join('/') : ''

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
      <h2 className="mb-3">Presenças</h2>
      <form className="card card-body mb-4" style={{ maxWidth: '600px' }} onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Praticante</label>
          <select className="form-select" name="praticante" value={formulario.praticante} onChange={alterarCampo} required>
            <option value="">Selecione</option>
            {praticantes.map(praticante => (
              <option key={praticante.codigo} value={praticante.codigo}>{praticante.nome}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Treino</label>
          <select className="form-select" name="treino" value={formulario.treino} onChange={alterarCampo} required>
            <option value="">Selecione</option>
            {treinos.map(treino => (
              <option key={treino.codigo} value={treino.codigo}>{treino.descricao}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Data da presença</label>
          <input className="form-control" name="data_presenca" type="date" value={formulario.data_presenca} onChange={alterarCampo} required />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">{formulario.codigo ? 'Alterar' : 'Criar novo'}</button>
          {formulario.codigo && <button className="btn btn-secondary ms-2" type="button" onClick={() => setFormulario(formularioVazio)}>Cancelar</button>}
        </div>
      </form>
      {mensagem && <div className="alert alert-info">{mensagem}</div>}
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle bg-white">
          <thead className="table-dark">
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
                <td>{formatarData(presenca.data_presenca)}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editar(presenca)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => remover(presenca.codigo)}>Remover</button>
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
