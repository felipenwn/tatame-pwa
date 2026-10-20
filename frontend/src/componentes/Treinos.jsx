import { useEffect, useState } from 'react'
import { requisicao } from '../api'

const formularioVazio = {
  codigo: '',
  descricao: '',
  professor: '',
  data: '',
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
      <h2>Treinos</h2>
      <form onSubmit={salvar}>
        <label>Descrição
          <input name="descricao" value={formulario.descricao} onChange={alterarCampo} required />
        </label>
        <label>Professor
          <input name="professor" value={formulario.professor} onChange={alterarCampo} required />
        </label>
        <label>Data
          <input name="data" type="date" value={formulario.data} onChange={alterarCampo} required />
        </label>
        <label>Horário
          <input name="horario" type="time" value={formulario.horario} onChange={alterarCampo} required />
        </label>
        <label>Duração em minutos
          <input name="duracao_minutos" type="number" min="1" value={formulario.duracao_minutos} onChange={alterarCampo} required />
        </label>
        <label>Limite de vagas
          <input name="limite_vagas" type="number" min="1" value={formulario.limite_vagas} onChange={alterarCampo} required />
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
              <th>Descrição</th>
              <th>Professor</th>
              <th>Data</th>
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
                <td>{treino.data}</td>
                <td>{treino.horario}</td>
                <td>{treino.duracao_minutos} min</td>
                <td>{treino.limite_vagas}</td>
                <td>
                  <button onClick={() => editar(treino)}>Editar</button>
                  <button onClick={() => remover(treino.codigo)}>Remover</button>
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
