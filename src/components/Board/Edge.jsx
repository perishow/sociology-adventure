import { nodes } from '../../data/nodes.js'
import { indiceDoDestino } from '../../game/rules.js'
import { CORES_OPCAO, LETRAS } from '../common/letras.js'
import styles from './Board.module.css'
import { geometriaDaSeta, geometriaDoSalto } from './layout.js'

// As setas que saem da etapa `indice`, uma por opção, cada uma até o seu destino.
// estado: 'futura' (ainda não chegou), 'disponivel' (etapa atual, escolhendo),
// 'percorrida' (já escolheu; só a seta escolhida continua visível) ou 'pulada'.
export default function Edge({ indice, pontos, estado, escolhidaId }) {
  const { opcoes } = nodes[indice]

  return (
    <g className={styles[estado]}>
      {opcoes.map((opcao, i) => {
        const destino = indiceDoDestino(nodes, indice, opcao)
        const salto = destino > indice + 1
        const { caminho, ponta, selo } = salto
          ? geometriaDoSalto(pontos[indice], pontos[destino])
          : geometriaDaSeta(pontos[indice], pontos[destino], i, opcoes.length)
        const escolhida = opcao.id === escolhidaId
        const oculta = estado === 'pulada' || (estado === 'percorrida' && !escolhida)

        return (
          <g
            key={opcao.id}
            className={`${styles.seta} ${escolhida ? styles.escolhida : ''} ${oculta ? styles.oculta : ''}`}
            style={{ '--cor': CORES_OPCAO[i] }}
          >
            <path d={caminho} className={styles.trilha} />
            <path d={ponta} className={styles.ponta} />
            {/* O <g> de fora posiciona; o de dentro fica na origem e pode pulsar no próprio centro. */}
            <g transform={`translate(${selo.x} ${selo.y})`}>
              <g className={styles.selo}>
                <circle r="14" />
                <rect className={styles.seloQuadrado} x="-13" y="-13" width="26" height="26" />
                {/* reflexo de vidro: só aparece no estilo Aero */}
                <ellipse className={styles.seloBrilho} cx="0" cy="-6" rx="9" ry="5" />
                <text dy="0.36em">{LETRAS[i]}</text>
              </g>
            </g>
          </g>
        )
      })}
    </g>
  )
}
