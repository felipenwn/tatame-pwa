import { useEffect, useState } from 'react'
import { requisicao } from '../api'

const formularioVazio = {
  codigo: '',
  nome: '',
  email: '',
  telefone: '',
  faixa: '',
  ativo: true,
  data_cadastro: ''
}

const formatarData = data => data ? data.split('-').reverse().join('/') : ''

function Praticantes() {
  const [praticantes, setPraticantes] = useState([])
  const [formulario, setFormulario] = useState(formularioVazio)
  const [mensagem, setMensagem] = useState('')

  const carregar = async () => {
    try {
      setPraticantes(await requisicao('/praticante'))
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  useEffect(() => {
    carregar()
  }, [])

  const alterarCampo = evento => {
    const { name, value, type, checked } = evento.target
    setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value })
  }

  const salvar = async evento => {
    evento.preventDefault()
    try {
      const dados = { ...formulario }
      if (!dados.codigo) delete dados.codigo
      await requisicao('/praticante', {
        method: formulario.codigo ? 'PUT' : 'POST',
        body: JSON.stringify(dados)
      })
      setMensagem(formulario.codigo ? 'Praticante alterado' : 'Praticante criado')
      setFormulario(formularioVazio)
      carregar()
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  const editar = praticante => {
    setFormulario(praticante)
    setMensagem('')
  }

  const remover = async codigo => {
    if (!window.confirm('Deseja remover este praticante?')) return
    try {
      await requisicao('/praticante/' + codigo, { method: 'DELETE' })
      setMensagem('Praticante removido')
      carregar()
    } catch (erro) {
      setMensagem(erro.message)
    }
  }

  return (
    <section>
      <h2 className="mb-3">Praticantes</h2>
      <form className="card card-body mb-4" style={{ maxWidth: '600px' }} onSubmit={salvar}>
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input className="form-control" name="nome" value={formulario.nome} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input className="form-control" name="email" type="email" value={formulario.email} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Telefone</label>
          <input className="form-control" name="telefone" value={formulario.telefone} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Faixa</label>
          <input className="form-control" name="faixa" value={formulario.faixa} onChange={alterarCampo} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Data de cadastro</label>
          <input className="form-control" name="data_cadastro" type="date" value={formulario.data_cadastro} onChange={alterarCampo} required />
        </div>
        <div className="form-check mb-3">
          <input className="form-check-input" id="praticante-ativo" name="ativo" type="checkbox" checked={formulario.ativo} onChange={alterarCampo} />
          <label className="form-check-label" htmlFor="praticante-ativo">Ativo</label>
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
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Faixa</th>
              <th>Ativo</th>
              <th>Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {praticantes.map(praticante => (
              <tr key={praticante.codigo}>
                <td>{praticante.nome}</td>
                <td>{praticante.email}</td>
                <td>{praticante.telefone}</td>
                <td>{praticante.faixa}</td>
                <td>{praticante.ativo ? 'Sim' : 'Não'}</td>
                <td>{formatarData(praticante.data_cadastro)}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editar(praticante)}>Editar</button>
                  <button className="btn btn-danger btn-sm" onClick={() => remover(praticante.codigo)}>Remover</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Praticantes
