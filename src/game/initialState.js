import { config } from '../data/config.js'

export function criarEstadoInicial() {
  return {
    fase: 'inicio', // 'inicio' | 'tutorial' | 'jogando' | 'fim'
    noAtual: 0,
    tempo: config.tempoInicial,
    aprendizado: 0,
    qualidade: 0,
    seguranca: true,
    historico: [], // { noId, opcaoId }
    feedback: null, // escolha recém-feita, aguardando o jogador continuar
    resultado: null, // 'vitoria' | 'derrota-seguranca' | 'derrota-tempo' | 'derrota-pontos'
  }
}
