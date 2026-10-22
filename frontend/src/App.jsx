import { useState } from 'react'
import Praticantes from './componentes/Praticantes'
import Treinos from './componentes/Treinos'
import Presencas from './componentes/Presencas'

function App() {
  const [pagina, setPagina] = useState('praticantes')

  return (
    <div className="bg-light min-vh-100">
      <header className="bg-dark text-white py-3 mb-4">
        <div className="container">
          <h1 className="mb-0">Tatame</h1>
          <p className="mb-3">Controle de treinos de Jiu-Jitsu</p>
          <nav>
            <button className={pagina === 'praticantes' ? 'btn btn-primary me-2' : 'btn btn-outline-light me-2'} onClick={() => setPagina('praticantes')}>Praticantes</button>
            <button className={pagina === 'treinos' ? 'btn btn-primary me-2' : 'btn btn-outline-light me-2'} onClick={() => setPagina('treinos')}>Treinos</button>
            <button className={pagina === 'presencas' ? 'btn btn-primary' : 'btn btn-outline-light'} onClick={() => setPagina('presencas')}>Presenças</button>
          </nav>
        </div>
      </header>
      <main className="container pb-4">
        {pagina === 'praticantes' && <Praticantes />}
        {pagina === 'treinos' && <Treinos />}
        {pagina === 'presencas' && <Presencas />}
      </main>
    </div>
  )
}

export default App
