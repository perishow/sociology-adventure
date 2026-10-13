import { useEffect, useRef } from 'react'
import { nodes } from '../../data/nodes.js'
import { useGame } from '../../hooks/useGame.js'
import { FlagIcon, GroupIcon } from '../common/Icons.jsx'
import styles from './Board.module.css'
import DesvioSemTempo from './DesvioSemTempo.jsx'
import Edge from './Edge.jsx'
import { alturaTabuleiro, emPorcentagem, geometriaDoSalto, LARGURA, posicaoDoPonto } from './layout.js'
import NodeSpot from './NodeSpot.jsx'
import Placa from './Placa.jsx'

// As etapas mais a linha de chegada no topo.
const TOTAL_PONTOS = nodes.length + 1
const ALTURA = alturaTabuleiro(TOTAL_PONTOS)
const pontos = Array.from({ length: TOTAL_PONTOS }, (_, k) => posicaoDoPonto(k, TOTAL_PONTOS))

// As etapas só avançam para cima; uma etapa abaixo da atual que não está
// no histórico foi pulada por alguma escolha.
function estadoDaAresta(k, state, visitadas) {
  if (k === state.noAtual) return state.feedback ? 'percorrida' : 'disponivel'
  if (visitadas.has(nodes[k].id)) return 'percorrida'
  if (k < state.noAtual) return 'pulada'
  return 'futura'
}

function statusDoNo(k, state, visitadas) {
  if (k === state.noAtual) return 'atual'
  if (visitadas.has(nodes[k].id)) return 'concluido'
  if (k < state.noAtual) return 'pulado'
  return 'bloqueado'
}

export default function Board({ onAbrirNo }) {
  const { state } = useGame()
  const tokenRef = useRef(null)
  const visitadas = new Set(state.historico.map((h) => h.noId))
  const escolhaEm = (noId) => state.historico.find((h) => h.noId === noId)?.opcaoId

  // Mantém o grupo visível conforme ele sobe no tabuleiro.
  useEffect(() => {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const id = setTimeout(
      () => tokenRef.current?.scrollIntoView({ block: 'center', behavior: reduzir ? 'auto' : 'smooth' }),
      state.noAtual === 0 ? 0 : 450,
    )
    return () => clearTimeout(id)
  }, [state.noAtual])

  return (
    <div className={styles.mapa}>
      <div className={styles.tabuleiro} style={{ aspectRatio: `${LARGURA} / ${ALTURA}` }}>
        <svg className={styles.arestas} viewBox={`0 0 ${LARGURA} ${ALTURA}`} aria-hidden="true">
          {nodes.map((no, k) => (
            <Edge
              key={no.id}
              indice={k}
              pontos={pontos}
              estado={estadoDaAresta(k, state, visitadas)}
              escolhidaId={escolhaEm(no.id)}
            />
          ))}
          {nodes.map(
            (no, k) =>
              no.opcional && (
                <DesvioSemTempo
                  key={`desvio-${no.id}`}
                  origem={pontos[k - 1]}
                  destino={pontos[k + 1]}
                  oculto={state.noAtual >= k}
                />
              ),
          )}
        </svg>

        <ol className={styles.nos} aria-label="Etapas da pesquisa">
          {nodes.map((no, k) => (
            <NodeSpot
              key={no.id}
              numero={k + 1}
              titulo={no.titulo}
              opcional={no.opcional}
              status={statusDoNo(k, state, visitadas)}
              lado={k % 2 === 0 ? 'esquerda' : 'direita'}
              style={emPorcentagem(pontos[k], TOTAL_PONTOS)}
              onClick={onAbrirNo}
            />
          ))}
          <li className={`${styles.no} ${styles.chegada}`} style={emPorcentagem(pontos[nodes.length], TOTAL_PONTOS)}>
            <span className={styles.circulo}>
              <FlagIcon />
            </span>
            <Placa lado="direita" conteudo="chegada">
              Apresentação do seminário
            </Placa>
          </li>
        </ol>

        {nodes.map(
          (no, k) =>
            no.opcional && (
              <span
                key={`rotulo-desvio-${no.id}`}
                className={`${styles.desvioRotulo} ${state.noAtual >= k ? styles.oculta : ''}`}
                style={emPorcentagem(geometriaDoSalto(pontos[k - 1], pontos[k + 1]).selo, TOTAL_PONTOS)}
                aria-hidden="true"
              >
                sem tempo
              </span>
            ),
        )}

        <div
          ref={tokenRef}
          className={`${styles.token} pixelar`}
          style={emPorcentagem(pontos[state.noAtual], TOTAL_PONTOS)}
          aria-hidden="true"
        >
          <GroupIcon />
        </div>
      </div>
    </div>
  )
}
