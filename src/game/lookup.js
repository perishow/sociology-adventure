import { nodes } from '../data/nodes.js'

export function encontrarOpcao(noId, opcaoId) {
  const no = nodes.find((n) => n.id === noId)
  return { no, opcao: no.opcoes.find((o) => o.id === opcaoId) }
}
