export function podePagar(state, opcao) {
  return state.tempo >= opcao.custoTempo
}

export function custoMinimo(no) {
  return Math.min(...no.opcoes.map((o) => o.custoTempo))
}

// Índice da etapa para onde a opção leva. `nodes.length` = fim do tabuleiro.
export function indiceDoDestino(nodes, indiceAtual, opcao) {
  if (!opcao.proximo) return indiceAtual + 1
  return nodes.findIndex((n) => n.id === opcao.proximo)
}

// Pula etapas opcionais que o grupo não tem mais tempo de pagar.
// Retorna o índice da etapa onde o grupo realmente vai parar (`nodes.length` = fim).
export function resolverDestino(state, nodes, destino) {
  let d = destino
  while (d < nodes.length && nodes[d].opcional && state.tempo < custoMinimo(nodes[d])) d++
  return d
}

export function aplicarEfeitos(state, opcao) {
  const { aprendizado = 0, qualidade = 0 } = opcao.efeitos
  return {
    ...state,
    tempo: state.tempo - opcao.custoTempo,
    aprendizado: state.aprendizado + aprendizado,
    qualidade: state.qualidade + qualidade,
    seguranca: state.seguranca && !opcao.quebraSeguranca,
  }
}

export function atingiuMetas(state, config) {
  return (
    state.aprendizado >= config.minAprendizado &&
    state.qualidade >= config.minQualidade
  )
}

// Chamado depois de cada escolha, com o índice da etapa de destino já resolvido
// (ver resolverDestino). Retorna o resultado final, ou null se o jogo deve seguir.
export function avaliarFim(state, nodes, config, destino) {
  if (!state.seguranca) return 'derrota-seguranca'

  if (destino >= nodes.length) return atingiuMetas(state, config) ? 'vitoria' : 'derrota-pontos'

  if (state.tempo < custoMinimo(nodes[destino])) return 'derrota-tempo'

  return null
}
