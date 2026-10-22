import { useState } from 'react'
import Praticantes from './componentes/Praticantes'
import Treinos from './componentes/Treinos'
import Presencas from './componentes/Presencas'

function App() {
  const [pagina, setPagina] = useState('praticantes')

  return (
    <div style={{ fontFamily: 'Arial', padding: '10px' }}>
      <header>
        <h1>Tatame</h1>
        <p>Controle de treinos de Jiu-Jitsu</p>
        <nav style={{ marginTop: '10px', marginBottom: '20px' }}>
          <button style={{ marginRight: '5px' }} onClick={() => setPagina('praticantes')}>Praticantes</button>
          <button style={{ marginRight: '5px' }} onClick={() => setPagina('treinos')}>Treinos</button>
          <button onClick={() => setPagina('presencas')}>Presenças</button>
        </nav>
      </header>
      <main>
        {pagina === 'praticantes' && <Praticantes />}
        {pagina === 'treinos' && <Treinos />}
        {pagina === 'presencas' && <Presencas />}
      </main>
    </div>
  )
}

export default App
