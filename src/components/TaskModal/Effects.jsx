import { BookIcon, HourglassIcon, ShieldIcon, StarIcon } from '../common/Icons.jsx'
import styles from './TaskModal.module.css'

function sinal(n) {
  return n > 0 ? `+${n}` : `${n}`
}

export default function Effects({ opcao }) {
  const { aprendizado = 0, qualidade = 0 } = opcao.efeitos

  return (
    <ul className={styles.efeitos}>
      <li style={{ '--cor': 'var(--tempo)' }}>
        <HourglassIcon /> −{opcao.custoTempo} tempo
      </li>
      <li style={{ '--cor': 'var(--aprendizado)' }}>
        <BookIcon /> {sinal(aprendizado)} aprendizado
      </li>
      <li style={{ '--cor': 'var(--qualidade)' }}>
        <StarIcon /> {sinal(qualidade)} qualidade
      </li>
      {opcao.quebraSeguranca && (
        <li style={{ '--cor': 'var(--danger)' }}>
          <ShieldIcon quebrado /> segurança comprometida
        </li>
      )}
    </ul>
  )
}
