const enderecoApi = import.meta.env.VITE_API_URL || 'http://localhost:3002'

export async function requisicao(caminho, opcoes = {}) {
  const resposta = await fetch(enderecoApi + caminho, {
    headers: {
      'Content-Type': 'application/json'
    },
    ...opcoes
  })

  const dados = await resposta.json()

  if (!resposta.ok) {
    throw new Error(dados.mensagem || 'Erro ao acessar a API')
  }

  return dados
}
