import { useState } from 'react'
import Board from '../components/Board/Board.jsx'
import Button from '../components/common/Button.jsx'
import HUD from '../components/HUD/HUD.jsx'
import TaskModal from '../components/TaskModal/TaskModal.jsx'
import { nodes } from '../data/nodes.js'
import { useGame } from '../hooks/useGame.js'
import styles from './Screens.module.css'

export default function GameScreen() {
  const { state } = useGame()
  const [modalAberto, setModalAberto] = useState(false)
  const abrir = () => setModalAberto(true)

  return (
    <main className={styles.jogo}>
      <HUD />
      <Board onAbrirNo={abrir} />
      <div className={styles.barraAcao}>
        <Button grande onClick={abrir}>
          ▶ Jogar etapa {state.noAtual + 1}: {nodes[state.noAtual].titulo}
        </Button>
      </div>
      {(modalAberto || state.feedback) && <TaskModal onFechar={() => setModalAberto(false)} />}
    </main>
  )
}
