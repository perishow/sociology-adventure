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
          Seu grupo vai apresentar um seminário de Sociologia sobre <strong>Lazer e cidadania</strong> e já
          entrevistou moradores da vizinhança. Agora, guie o grupo pelas {nodes.length} etapas de preparação,
          de baixo até a apresentação, e decida quando, e como, usar a IA.
        </p>

        <ul className={styles.regras}>
          <li style={{ '--cor': 'var(--tempo)' }}>
            <span className={styles.regraIcone}>
              <HourglassIcon />
            </span>
            <span>
              Você tem <strong>{config.tempoInicial} de tempo</strong>. Cada escolha gasta uma parte. Se sobrar
              tempo no fim, há uma <strong>etapa bônus</strong> com pontos extras.
            </span>
          </li>
          <li style={{ '--cor': 'var(--aprendizado)' }}>
            <span className={styles.regraIcone}>
              <BookIcon />
            </span>
            <span>
              Chegue ao fim com pelo menos <strong>{config.minAprendizado} de aprendizado</strong>.
            </span>
          </li>
          <li style={{ '--cor': 'var(--qualidade)' }}>
            <span className={styles.regraIcone}>
              <StarIcon />
            </span>
            <span>
              Chegue ao fim com pelo menos <strong>{config.minQualidade} de qualidade</strong>.
            </span>
          </li>
          <li style={{ '--cor': 'var(--danger)' }}>
            <span className={styles.regraIcone}>
              <ShieldIcon />
            </span>
            <span>
              As entrevistas têm dados pessoais dos moradores. Expô-los quebra a <strong>segurança</strong> e
              encerra o jogo!
            </span>
          </li>
        </ul>

        <Button grande onClick={() => dispatch({ type: 'INICIAR' })}>
          ▶ Começar
        </Button>
      </div>
    </main>
  )
}
