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
      <h2>Praticantes</h2>
      <form onSubmit={salvar}>
        <label>Nome
          <input name="nome" value={formulario.nome} onChange={alterarCampo} required />
        </label>
        <label>E-mail
          <input name="email" type="email" value={formulario.email} onChange={alterarCampo} required />
        </label>
        <label>Telefone
          <input name="telefone" value={formulario.telefone} onChange={alterarCampo} required />
        </label>
        <label>Faixa
          <input name="faixa" value={formulario.faixa} onChange={alterarCampo} required />
        </label>
        <label>Data de cadastro
          <input name="data_cadastro" type="date" value={formulario.data_cadastro} onChange={alterarCampo} required />
        </label>
        <label className="marcacao">
          <input name="ativo" type="checkbox" checked={formulario.ativo} onChange={alterarCampo} /> Ativo
        </label>
        <div className="botoes-formulario">
          <button type="submit">{formulario.codigo ? 'Alterar' : 'Criar novo'}</button>
          {formulario.codigo && <button type="button" onClick={() => setFormulario(formularioVazio)}>Cancelar</button>}
        </div>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <div className="tabela">
        <table>
          <thead>
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
                <td>{praticante.data_cadastro}</td>
                <td>
                  <button onClick={() => editar(praticante)}>Editar</button>
                  <button onClick={() => remover(praticante.codigo)}>Remover</button>
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
