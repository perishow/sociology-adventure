import styles from './Board.module.css'
import { geometriaDoSalto } from './layout.js'

// Caminho pontilhado que contorna uma etapa opcional: é por onde o grupo segue
// quando chega a ela sem tempo para pagar nenhuma opção. A etiqueta "sem tempo"
// fica em HTML, no Board, para poder ter fundo e borda como as plaquinhas.
export default function DesvioSemTempo({ origem, destino, oculto }) {
  const { caminho, ponta } = geometriaDoSalto(origem, destino)

  return (
    <g className={`${styles.desvio} ${oculto ? styles.oculta : ''}`}>
      <path d={caminho} className={styles.trilha} />
      <path d={ponta} className={styles.ponta} />
    </g>
  )
}
