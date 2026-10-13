import { config } from '../../data/config.js'
import { useGame } from '../../hooks/useGame.js'
import { BookIcon, HourglassIcon, ShieldIcon, StarIcon } from '../common/Icons.jsx'
import styles from './HUD.module.css'
import StatBar, { Rotulo } from './StatBar.jsx'

export default function HUD() {
  const { state } = useGame()
  const tempoBaixo = state.tempo <= config.tempoInicial / 4

  return (
    <header className={styles.hud}>
      <StatBar
        rotulo="Tempo"
        icone={<HourglassIcon />}
        valor={state.tempo}
        max={config.tempoInicial}
        cor={tempoBaixo ? 'var(--tempo-baixo)' : 'var(--tempo)'}
        alerta={tempoBaixo}
      />
      <StatBar
        rotulo="Aprendizado"
        icone={<BookIcon />}
        valor={state.aprendizado}
        meta={config.minAprendizado}
        cor="var(--aprendizado)"
      />
      <StatBar
        rotulo="Qualidade"
        icone={<StarIcon />}
        valor={state.qualidade}
        meta={config.minQualidade}
        cor="var(--qualidade)"
      />
      <div className={`${styles.stat} ${styles.seguranca} ${state.seguranca ? '' : styles.inseguro}`}>
        <span className={styles.icone} style={{ '--cor': state.seguranca ? 'var(--accent)' : 'var(--danger)' }}>
          <ShieldIcon quebrado={!state.seguranca} />
        </span>
        <div className={styles.corpo}>
          <Rotulo longo="Segurança" />
          <strong className={styles.valor}>
            {state.seguranca ? 'OK' : <Rotulo longo="Comprometida" curto="Quebrada" />}
          </strong>
        </div>
      </div>
    </header>
  )
}
