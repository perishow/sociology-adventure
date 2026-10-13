import { useRef } from 'react'
import { useLarguraDoTexto } from '../../hooks/useLarguraDoTexto.js'
import styles from './Board.module.css'

// Plaquinha com o nome da etapa, com a moldura do tamanho exato do texto.
// `conteudo` identifica o que está escrito, para remedir quando mudar.
export default function Placa({ lado, conteudo, children }) {
  const ref = useRef(null)
  useLarguraDoTexto(ref, [conteudo])

  return (
    <span ref={ref} className={`${styles.placa} ${styles[lado]}`}>
      {children}
    </span>
  )
}
