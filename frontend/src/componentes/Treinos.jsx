import { useEffect, useState } from 'react'
import { requisicao } from '../api'

const formularioVazio = {
  codigo: '',
  descricao: '',
  professor: '',
  dias_semana: '',
  horario: '',
  duracao_minutos: '',
  limite_vagas: ''
}

function Treinos() {
  const [treinos, setTreinos] = useState([])
  const [formulario, setFormulario] = useState(formularioVazio)
  const [mensagem, setMensagem] = useState('')

  const carregar = async () => {
    try {
      setTreinos(await requisicao('/treino'))
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
      await requisicao('/treino', {
        method: formulario.codigo ? 'PUT' : 'POST',
        body: JSON.stringify(dados)
      })
      setMensagem(formulario.codigo ? 'Treino alterado' : 'Treino criado')
      setFormulario(formularioVazio)
      carregar()
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  const editar = treino => {
    setFormulario(treino)
    setMensagem('')
  }

  const remover = async codigo => {
    if (!window.confirm('Deseja remover este treino?')) return
    try {
      await requisicao('/treino/' + codigo, { method: 'DELETE' })
      setMensagem('Treino removido')
      carregar()
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  return (
    <section>
      <h2 className="mb-3">Treinos</h2>
      <form className="card card-body mb-4" style={{ maxWidth: '600px' }} onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Descrição</label>
          <input className="form-control" name="descricao" value={formulario.descricao} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Professor</label>
          <input className="form-control" name="professor" value={formulario.professor} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Dias da semana</label>
          <input className="form-control" name="dias_semana" value={formulario.dias_semana} onChange={alterarCampo} placeholder="Exemplo: Segunda, Quarta e Sexta" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Horário</label>
          <input className="form-control" name="horario" type="time" value={formulario.horario} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Duração em minutos</label>
          <input className="form-control" name="duracao_minutos" type="number" min="1" value={formulario.duracao_minutos} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Limite de vagas</label>
          <input className="form-control" name="limite_vagas" type="number" min="1" value={formulario.limite_vagas} onChange={alterarCampo} required />
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
              <th>Descrição</th>
              <th>Professor</th>
              <th>Dias da semana</th>
              <th>Horário</th>
              <th>Duração</th>
              <th>Vagas</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {treinos.map(treino => (
              <tr key={treino.codigo}>
                <td>{treino.descricao}</td>
                <td>{treino.professor}</td>
                <td>{treino.dias_semana}</td>
                <td>{treino.horario}</td>
                <td>{treino.duracao_minutos} min</td>
                <td>{treino.limite_vagas}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editar(treino)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => remover(treino.codigo)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Treinos
