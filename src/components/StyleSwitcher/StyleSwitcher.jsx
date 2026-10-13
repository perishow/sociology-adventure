import { ESTILOS, useEstilo } from '../../hooks/useEstilo.js'
import styles from './StyleSwitcher.module.css'

export default function StyleSwitcher() {
  const [estilo, setEstilo] = useEstilo()

  return (
    <div className={styles.seletor} role="radiogroup" aria-label="Estilo visual">
      {ESTILOS.map((e) => (
        <button
          key={e.id}
          type="button"
          role="radio"
          aria-checked={estilo === e.id}
          className={`${styles.opcao} ${estilo === e.id ? styles.ativo : ''}`}
          onClick={() => setEstilo(e.id)}
        >
          {e.nome}
        </button>
      ))}
    </div>
  )
}
