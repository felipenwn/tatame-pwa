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
      <h2>Treinos</h2>
      <form onSubmit={salvar}>
        <div style={{ marginBottom: '5px' }}><label>Descrição:
          <input name="descricao" value={formulario.descricao} onChange={alterarCampo} required />
        </label></div>
        <div style={{ marginBottom: '5px' }}><label>Professor:
          <input name="professor" value={formulario.professor} onChange={alterarCampo} required />
        </label></div>
        <div style={{ marginBottom: '5px' }}><label>Dias da semana:
          <input name="dias_semana" value={formulario.dias_semana} onChange={alterarCampo} required />
        </label></div>
        <div style={{ marginBottom: '5px' }}><label>Horário:
          <input name="horario" type="time" value={formulario.horario} onChange={alterarCampo} required />
        </label></div>
        <div style={{ marginBottom: '5px' }}><label>Duração em minutos:
          <input name="duracao_minutos" type="number" min="1" value={formulario.duracao_minutos} onChange={alterarCampo} required />
        </label></div>
        <div style={{ marginBottom: '5px' }}><label>Limite de vagas:
          <input name="limite_vagas" type="number" min="1" value={formulario.limite_vagas} onChange={alterarCampo} required />
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
                  <button style={{ marginRight: '5px' }} onClick={() => editar(treino)}>Editar</button>
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
