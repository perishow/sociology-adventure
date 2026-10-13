import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.jsx'
import { GameProvider } from './context/GameContext.jsx'
import { aplicarEstilo, estiloInicial } from './hooks/useEstilo.js'

// Aplica o estilo antes do primeiro render, para a tela não piscar no tema errado.
aplicarEstilo(estiloInicial())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameProvider>
      <App />
    </GameProvider>
  </StrictMode>,
)
