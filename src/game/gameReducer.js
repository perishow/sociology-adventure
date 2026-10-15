import { config } from '../data/config.js'
import { nodes } from '../data/nodes.js'
import { criarEstadoInicial } from './initialState.js'
import { encontrarOpcao } from './lookup.js'
import { aplicarEfeitos, avaliarFim, indiceDoDestino, podePagar, resolverDestino } from './rules.js'

export function gameReducer(state, action) {
  switch (action.type) {
    case 'TUTORIAL':
      if (state.fase !== 'inicio') return state
      return { ...state, fase: 'tutorial' }

    case 'INICIAR':
      return { ...criarEstadoInicial(), fase: 'jogando' }

    case 'ESCOLHER_OPCAO': {
      if (state.fase !== 'jogando' || state.feedback) return state

      const no = nodes[state.noAtual]
      const opcao = no.opcoes.find((o) => o.id === action.opcaoId)
      if (!opcao || !podePagar(state, opcao)) return state

      return {
        ...aplicarEfeitos(state, opcao),
        historico: [...state.historico, { noId: no.id, opcaoId: opcao.id }],
        feedback: { noId: no.id, opcaoId: opcao.id },
      }
    }

    case 'AVANCAR': {
      if (!state.feedback) return state

      const { opcao } = encontrarOpcao(state.feedback.noId, state.feedback.opcaoId)
      const destino = resolverDestino(state, nodes, indiceDoDestino(nodes, state.noAtual, opcao))
      const semFeedback = { ...state, feedback: null }
      const resultado = avaliarFim(semFeedback, nodes, config, destino)
      if (resultado) return { ...semFeedback, fase: 'fim', resultado }
      return { ...semFeedback, noAtual: destino }
    }

    case 'REINICIAR':
      return criarEstadoInicial()

    default:
      return state
  }
}
