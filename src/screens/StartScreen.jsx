import Button from '../components/common/Button.jsx'
import StyleSwitcher from '../components/StyleSwitcher/StyleSwitcher.jsx'
import { BookIcon, GroupIcon, HourglassIcon, ShieldIcon, StarIcon } from '../components/common/Icons.jsx'
import { config } from '../data/config.js'
import { nodes } from '../data/nodes.js'
import { useGame } from '../hooks/useGame.js'
import styles from './Screens.module.css'

export default function StartScreen() {
  const { dispatch } = useGame()

  return (
    <main className={`${styles.tela} ${styles.telaInicio}`}>
      <div className={`${styles.cartao} ${styles.cartaoInicio}`}>
        <div className={styles.topoCartao}>
          <StyleSwitcher />
        </div>
        <GroupIcon className={`${styles.heroi} pixelar`} />
        <h1 className={styles.titulo}>A Pesquisa Sociológica</h1>
        <p className={styles.subtitulo}>
          Seu grupo vai fazer um trabalho de Sociologia sobre <strong>Lazer e Cidadania</strong>. Após entrevistar os
          moradores da vizinhança, vocês precisam organizar os dados e montar o seminário. Guie o grupo pelas{' '}
          {nodes.length} etapas de preparação, desde a pesquisa pelo tema até a apresentação, e decida quando, e como,
          usar a IA Generativa.
        </p>

        <ul className={styles.regras}>
          <li style={{ '--cor': 'var(--tempo)' }}>
            <span className={styles.regraIcone}>
              <HourglassIcon />
            </span>
            <span>
              <strong>{config.tempoInicial}</strong> de tempo para tudo
            </span>
          </li>
          <li style={{ '--cor': 'var(--danger)' }}>
            <span className={styles.regraIcone}>
              <ShieldIcon />
            </span>
            <span>
              <strong>Proteja</strong> os dados dos moradores
            </span>
          </li>
          <li style={{ '--cor': 'var(--aprendizado)' }}>
            <span className={styles.regraIcone}>
              <BookIcon />
            </span>
            <span>
              Meta: <strong>{config.minAprendizado}</strong> de aprendizado
            </span>
          </li>
          <li style={{ '--cor': 'var(--qualidade)' }}>
            <span className={styles.regraIcone}>
              <StarIcon />
            </span>
            <span>
              Meta: <strong>{config.minQualidade}</strong> de qualidade
            </span>
          </li>
        </ul>

        <Button grande onClick={() => dispatch({ type: 'TUTORIAL' })}>
          ▶ Começar
        </Button>
      </div>
    </main>
  )
}
