import { useEffect, useRef } from 'react'
import { nodes } from '../../data/nodes.js'
import { encontrarOpcao } from '../../game/lookup.js'
import { indiceDoDestino, podePagar, resolverDestino } from '../../game/rules.js'
import { useGame } from '../../hooks/useGame.js'
import Button from '../common/Button.jsx'
import { CORES_OPCAO, LETRAS } from '../common/letras.js'
import ChoiceCard from './ChoiceCard.jsx'
import Effects from './Effects.jsx'
import styles from './TaskModal.module.css'

export default function TaskModal({ onFechar }) {
  const { state, dispatch } = useGame()
  const dialogRef = useRef(null)
  const no = nodes[state.noAtual]

  useEffect(() => {
    dialogRef.current.showModal()
  }, [])

  // Depois de escolher, o jogador só sai do modal pelo botão "Continuar".
  function handleCancel(e) {
    if (state.feedback) e.preventDefault()
    else onFechar()
  }

  function continuar() {
    dispatch({ type: 'AVANCAR' })
    onFechar()
  }

  return (
    <dialog ref={dialogRef} className={styles.dialog} onCancel={handleCancel} aria-labelledby="titulo-tarefa">
      <div className={styles.topo}>
        <span className={styles.etapa}>
          Etapa {state.noAtual + 1}/{nodes.length}
        </span>
        {no.opcional && <span className={`${styles.etapa} ${styles.bonus}`}>★ Bônus opcional</span>}
        <h2 id="titulo-tarefa">{no.titulo}</h2>
      </div>

      {state.feedback ? (
        <Feedback state={state} onContinuar={continuar} />
      ) : (
        <>
          <p className={styles.descricao}>{no.descricao}</p>
          <div className={styles.opcoes}>
            {no.opcoes.map((opcao, i) => (
              <ChoiceCard
                key={opcao.id}
                indice={i}
                opcao={opcao}
                desabilitada={!podePagar(state, opcao)}
                onEscolher={() => dispatch({ type: 'ESCOLHER_OPCAO', opcaoId: opcao.id })}
              />
            ))}
          </div>
          <div className={styles.acoes}>
            <Button variant="secondary" onClick={onFechar}>
              Voltar ao tabuleiro
            </Button>
          </div>
        </>
      )}
    </dialog>
  )
}

function Feedback({ state, onContinuar }) {
  const { no, opcao } = encontrarOpcao(state.feedback.noId, state.feedback.opcaoId)
  const indice = no.opcoes.indexOf(opcao)

  // Etapas opcionais que vão ser puladas porque o tempo não dá para pagá-las
  const destinoPrevisto = indiceDoDestino(nodes, state.noAtual, opcao)
  const destino = resolverDestino(state, nodes, destinoPrevisto)
  const puladas = nodes.slice(destinoPrevisto, destino)
  const vaiApresentar = !opcao.quebraSeguranca && destino >= nodes.length

  return (
    <div className={`${styles.feedback} ${opcao.quebraSeguranca ? styles.alerta : ''}`}>
      <p className={styles.escolha}>
        <span className={styles.letra} style={{ '--cor': CORES_OPCAO[indice] }}>
          {LETRAS[indice]}
        </span>
        {opcao.texto}
      </p>
      <p>{opcao.feedback}</p>
      <Effects opcao={opcao} />
      {!opcao.quebraSeguranca && puladas.length > 0 && (
        <p className={styles.aviso}>
          ⏳ Não sobrou tempo para a etapa bônus “{puladas.map((n) => n.titulo).join('”, “')}”. O grupo vai direto
          para a apresentação, sem os pontos extras dela.
        </p>
      )}
      <div className={styles.acoes}>
        <Button onClick={onContinuar} autoFocus>
          {opcao.quebraSeguranca ? 'Ver resultado' : vaiApresentar ? 'Ir para a apresentação ▲' : 'Continuar ▲'}
        </Button>
      </div>
    </div>
  )
}
