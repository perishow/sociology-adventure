import styles from './Board.module.css'
import Placa from './Placa.jsx'

const ROTULOS = {
  concluido: 'concluída',
  atual: 'etapa atual, clique para jogar',
  bloqueado: 'bloqueada',
  pulado: 'pulada',
}

export default function NodeSpot({ numero, titulo, opcional = false, status, lado, style, onClick }) {
  const atual = status === 'atual'

  return (
    <li className={`${styles.no} ${styles[status]} ${opcional ? styles.opcional : ''}`} style={style}>
      <button
        type="button"
        className={styles.circulo}
        disabled={!atual}
        onClick={onClick}
        aria-label={`Etapa ${numero}${opcional ? ' (bônus opcional)' : ''}: ${titulo} (${ROTULOS[status]})`}
        aria-current={atual ? 'step' : undefined}
      >
        {status === 'concluido' ? '✓' : numero}
      </button>
      <Placa lado={lado} conteudo={`${titulo}|${opcional}|${status === 'pulado'}`}>
        {titulo}
        {opcional && <span className={styles.tagBonus}>★ bônus opcional</span>}
        {status === 'pulado' && <span className={styles.tagPulada}>pulada</span>}
      </Placa>
    </li>
  )
}
