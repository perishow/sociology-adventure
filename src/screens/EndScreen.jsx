import Button from '../components/common/Button.jsx'
import { GroupIcon, ShieldIcon, TrophyIcon } from '../components/common/Icons.jsx'
import Effects from '../components/TaskModal/Effects.jsx'
import { config } from '../data/config.js'
import { nodes } from '../data/nodes.js'
import { encontrarOpcao } from '../game/lookup.js'
import { useGame } from '../hooks/useGame.js'
import styles from './Screens.module.css'

const MENSAGENS = {
  vitoria: {
    titulo: 'Seminário pronto!',
    texto: 'Vocês equilibraram tempo, aprendizado e qualidade, e protegeram os dados de quem confiou no grupo.',
  },
  'derrota-seguranca': {
    titulo: 'Dados expostos',
    texto:
      'Os dados pessoais dos moradores foram enviados para uma IA. Quem participa de uma pesquisa confia que suas informações serão protegidas.',
  },
  'derrota-tempo': {
    titulo: 'O tempo acabou',
    texto: 'Não sobrou tempo para concluir todas as etapas. Planejar o tempo também faz parte do trabalho.',
  },
  'derrota-pontos': {
    titulo: 'Apresentado, mas incompleto',
    texto: `Vocês chegaram ao fim, mas não atingiram as metas (${config.minAprendizado} de aprendizado e ${config.minQualidade} de qualidade).`,
  },
}

function IconeResultado({ resultado }) {
  if (resultado === 'vitoria') return <TrophyIcon />
  if (resultado === 'derrota-seguranca') return <ShieldIcon quebrado />
  return <GroupIcon />
}

export default function EndScreen() {
  const { state, dispatch } = useGame()
  const mensagem = MENSAGENS[state.resultado]
  const venceu = state.resultado === 'vitoria'
  // Só faz sentido falar de etapa bônus pulada se o grupo chegou à apresentação
  const chegouAoFim = venceu || state.resultado === 'derrota-pontos'
  const visitadas = new Set(state.historico.map((h) => h.noId))
  const bonusPuladas = chegouAoFim ? nodes.filter((n) => n.opcional && !visitadas.has(n.id)) : []

  return (
    <main className={styles.tela}>
      <div className={`${styles.cartao} ${venceu ? styles.vitoria : styles.derrota}`}>
        <div className={styles.medalha}>
          <IconeResultado resultado={state.resultado} />
        </div>
        <h1 className={styles.titulo}>{mensagem.titulo}</h1>
        <p className={styles.subtitulo}>{mensagem.texto}</p>

        <div className={styles.placar}>
          <div style={{ '--cor': 'var(--aprendizado)' }}>
            <strong>{state.aprendizado}</strong>
            <span>aprendizado</span>
          </div>
          <div style={{ '--cor': 'var(--qualidade)' }}>
            <strong>{state.qualidade}</strong>
            <span>qualidade</span>
          </div>
          <div style={{ '--cor': 'var(--tempo)' }}>
            <strong>{state.tempo}</strong>
            <span>tempo restante</span>
          </div>
        </div>

        <h2>Suas escolhas</h2>
        <ol className={styles.historico}>
          {state.historico.map(({ noId, opcaoId }) => {
            const { no, opcao } = encontrarOpcao(noId, opcaoId)
            return (
              <li key={noId}>
                <strong>{no.titulo}:</strong> {opcao.texto}
                <p>{opcao.feedback}</p>
                <Effects opcao={opcao} />
              </li>
            )
          })}
          {bonusPuladas.map((no) => (
            <li key={no.id} className={styles.pulada}>
              <strong>{no.titulo}:</strong> pulada por falta de tempo
              <p>Era uma etapa bônus. Com mais folga no tempo, o grupo poderia ter ganhado pontos extras aqui.</p>
            </li>
          ))}
        </ol>

        <Button grande onClick={() => dispatch({ type: 'REINICIAR' })}>
          ↻ Jogar novamente
        </Button>
      </div>
    </main>
  )
}
