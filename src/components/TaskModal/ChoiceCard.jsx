import { HourglassIcon } from '../common/Icons.jsx'
import { CORES_OPCAO, LETRAS } from '../common/letras.js'
import styles from './TaskModal.module.css'

// Só o custo de tempo é revelado antes da escolha; os pontos aparecem no feedback.
export default function ChoiceCard({ indice, opcao, desabilitada, onEscolher }) {
  return (
    <button
      type="button"
      className={styles.card}
      style={{ '--cor': CORES_OPCAO[indice] }}
      disabled={desabilitada}
      onClick={onEscolher}
    >
      <span className={styles.letra}>{LETRAS[indice]}</span>
      <span className={styles.textoOpcao}>
        {opcao.texto}
        {desabilitada && <span className={styles.semTempo}>Tempo insuficiente</span>}
      </span>
      <span className={styles.custo} aria-label={`custa ${opcao.custoTempo} de tempo`}>
        <HourglassIcon />
        {opcao.custoTempo}
      </span>
    </button>
  )
}
