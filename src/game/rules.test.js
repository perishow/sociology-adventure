import { describe, expect, it } from 'vitest'
import { config } from '../data/config.js'
import { nodes } from '../data/nodes.js'
import { gameReducer } from './gameReducer.js'
import { criarEstadoInicial } from './initialState.js'
import { indiceDoDestino } from './rules.js'

function iniciar() {
  return gameReducer(criarEstadoInicial(), { type: 'INICIAR' })
}

function jogar(opcaoIds) {
  let state = iniciar()
  for (const opcaoId of opcaoIds) {
    state = gameReducer(state, { type: 'ESCOLHER_OPCAO', opcaoId })
    state = gameReducer(state, { type: 'AVANCAR' })
  }
  return state
}

// Todos os caminhos possíveis, seguindo os saltos entre etapas (sem considerar o tempo).
function todosOsCaminhos(i = 0) {
  if (i >= nodes.length) return [[]]
  return nodes[i].opcoes.flatMap((o) =>
    todosOsCaminhos(indiceDoDestino(nodes, i, o)).map((resto) => [o.id, ...resto]),
  )
}

describe('gameReducer', () => {
  it('aplica custo e efeitos e aguarda o jogador continuar', () => {
    let state = iniciar()
    state = gameReducer(state, { type: 'ESCOLHER_OPCAO', opcaoId: 'pesquisa-livro-sites' })

    expect(state.tempo).toBe(config.tempoInicial - 3)
    expect(state.aprendizado).toBe(4)
    expect(state.qualidade).toBe(5)
    expect(state.feedback).toEqual({ noId: 'pesquisa', opcaoId: 'pesquisa-livro-sites' })
    expect(state.noAtual).toBe(0)

    state = gameReducer(state, { type: 'AVANCAR' })
    expect(nodes[state.noAtual].id).toBe('fontes')
    expect(state.feedback).toBeNull()
  })

  it('pula a verificação de fontes ao usar só o livro didático', () => {
    const state = jogar(['pesquisa-livro'])
    expect(nodes[state.noAtual].id).toBe('sintese')
    expect(state.historico.map((h) => h.noId)).toEqual(['pesquisa'])
  })

  it('aceita opções que não custam tempo', () => {
    const state = jogar(['pesquisa-livro-sites', 'fontes-nao-verificar'])
    expect(state.tempo).toBe(config.tempoInicial - 3)
    expect(nodes[state.noAtual].id).toBe('sintese')
  })

  it('ignora uma segunda escolha antes de avançar', () => {
    let state = iniciar()
    state = gameReducer(state, { type: 'ESCOLHER_OPCAO', opcaoId: 'pesquisa-livro' })
    const depois = gameReducer(state, { type: 'ESCOLHER_OPCAO', opcaoId: 'pesquisa-livro-sites' })
    expect(depois).toBe(state)
  })

  it('ignora opções de outra etapa ou que custam mais que o tempo restante', () => {
    const state = iniciar()
    expect(gameReducer(state, { type: 'ESCOLHER_OPCAO', opcaoId: 'slides-manual' })).toBe(state)

    const semTempo = { ...state, tempo: 1 }
    expect(gameReducer(semTempo, { type: 'ESCOLHER_OPCAO', opcaoId: 'pesquisa-livro-sites' })).toBe(semTempo)
  })

  it('termina o jogo assim que a segurança é quebrada', () => {
    const state = jogar(['pesquisa-livro', 'sintese-ia'])
    expect(state.fase).toBe('fim')
    expect(state.resultado).toBe('derrota-seguranca')
    expect(state.seguranca).toBe(false)
  })

  it('vence ao terminar a última etapa com as metas atingidas', () => {
    const state = jogar(['pesquisa-livro-sites', 'fontes-verificar', 'sintese-manual-ia', 'roteiro-ia-estrutura', 'slides-ia-roteiro', 'perguntas-ia-resposta-manual'])
    expect(state.resultado).toBe('vitoria')
    expect(state.tempo).toBe(0)
  })

  it('perde por pontos ao delegar tudo o que pode à IA', () => {
    const state = jogar(['pesquisa-ia', 'fontes-ia', 'sintese-manual-ia', 'roteiro-ia', 'slides-ia-sem-contexto', 'perguntas-ia'])
    expect(state.resultado).toBe('derrota-pontos')
  })

  it('pula a etapa bônus quando o tempo acaba antes dela e vence se atingiu as metas', () => {
    const state = jogar(['pesquisa-livro-sites', 'fontes-verificar', 'sintese-manual', 'roteiro-ia-estrutura', 'slides-ia-roteiro'])
    expect(state.tempo).toBe(0)
    expect(state.fase).toBe('fim')
    expect(state.resultado).toBe('vitoria')
    expect(state.historico.map((h) => h.noId)).not.toContain('perguntas')
  })

  it('sem tempo para a etapa bônus e abaixo das metas, perde por pontos, não por tempo', () => {
    const state = jogar(['pesquisa-livro-sites', 'fontes-nao-verificar', 'sintese-manual', 'roteiro-manual', 'slides-manual'])
    expect(state.tempo).toBe(0)
    expect(state.resultado).toBe('derrota-pontos')
  })

  it('com tempo sobrando, a etapa bônus é jogada normalmente', () => {
    const state = jogar(['pesquisa-livro-sites', 'fontes-verificar', 'sintese-manual-ia', 'roteiro-ia-estrutura', 'slides-ia-roteiro'])
    expect(state.tempo).toBe(2)
    expect(state.fase).toBe('jogando')
    expect(nodes[state.noAtual].id).toBe('perguntas')
  })

  it('perde por tempo quando não dá para pagar a próxima etapa', () => {
    let state = { ...iniciar(), tempo: 2 }
    state = gameReducer(state, { type: 'ESCOLHER_OPCAO', opcaoId: 'pesquisa-livro' })
    state = gameReducer(state, { type: 'AVANCAR' })
    expect(state.resultado).toBe('derrota-tempo')
  })
})

describe('balanceamento', () => {
  const resultados = todosOsCaminhos().map((ids) => ({ ids, state: jogar(ids) }))

  it('existe caminho vencedor com e sem o salto da etapa 1', () => {
    const vitorias = resultados.filter(({ state }) => state.resultado === 'vitoria')
    expect(vitorias.some(({ ids }) => ids.includes('fontes-verificar'))).toBe(true)
    expect(vitorias.some(({ ids }) => ids[0] === 'pesquisa-livro')).toBe(true)
  })

  it('nenhuma opção segura é pior que outra da mesma etapa em tudo', () => {
    for (const no of nodes) {
      const seguras = no.opcoes.filter((o) => !o.quebraSeguranca)
      for (const o of seguras) {
        const dominada = seguras.some(
          (p) =>
            p !== o &&
            p.custoTempo <= o.custoTempo &&
            p.efeitos.aprendizado >= o.efeitos.aprendizado &&
            p.efeitos.qualidade >= o.efeitos.qualidade,
        )
        expect(dominada, o.id).toBe(false)
      }
    }
  })

  it('escolher sempre a mesma letra quase nunca vence', () => {
    const vitorias = [0, 1, 2].filter((i) => {
      let k = 0
      const ids = []
      while (k < nodes.length) {
        const o = nodes[k].opcoes[i]
        ids.push(o.id)
        k = indiceDoDestino(nodes, k, o)
      }
      return jogar(ids).resultado === 'vitoria'
    })
    expect(vitorias.length).toBeLessThanOrEqual(1)
  })

  it('terceirizar a pesquisa, os slides ou as perguntas ainda permite vencer, mas nunca com a maior folga', () => {
    const vitorias = resultados.filter(({ state }) => state.resultado === 'vitoria')
    const folga = ({ state }) =>
      Math.min(state.aprendizado - config.minAprendizado, state.qualidade - config.minQualidade)
    const maiorFolga = Math.max(...vitorias.map(folga))

    for (const atalho of ['pesquisa-ia', 'slides-ia-sem-contexto', 'perguntas-ia']) {
      const comAtalho = vitorias.filter(({ ids }) => ids.includes(atalho))
      expect(comAtalho.length, atalho).toBeGreaterThan(0)
      expect(Math.max(...comAtalho.map(folga)), atalho).toBeLessThan(maiorFolga)
    }
    expect(vitorias.some(({ ids }) => ids.includes('pesquisa-ia') && ids.includes('fontes-verificar'))).toBe(true)
  })

  it('não dá para escolher a opção mais cara em todas as etapas', () => {
    const custoTotal = nodes.reduce((soma, n) => soma + Math.max(...n.opcoes.map((o) => o.custoTempo)), 0)
    expect(custoTotal).toBeGreaterThan(config.tempoInicial)
  })

  it('nenhum caminho que quebra a segurança vence', () => {
    const inseguros = resultados.filter(({ state }) => !state.seguranca)
    expect(inseguros.length).toBeGreaterThan(0)
    expect(inseguros.every(({ state }) => state.resultado === 'derrota-seguranca')).toBe(true)
  })
})
