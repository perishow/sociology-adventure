// Geometria do tabuleiro, em unidades do viewBox do SVG.
// Os nós HTML são posicionados com as mesmas coordenadas convertidas em %.

export const LARGURA = 600
const ESPACO = 175 // distância vertical entre nós
const MARGEM = 85
export const RAIO_NO = 39 // metade da largura do nó (13% em Board.module.css)
const ABERTURA = 46 // quanto as três setas se afastam entre si
const CURVA_DO_SALTO = 170 // quanto a seta de salto se afasta para fora

export function alturaTabuleiro(totalPontos) {
  return MARGEM * 2 + ESPACO * (totalPontos - 1)
}

// Ponto k = 0 fica embaixo; os pontos sobem em zigue-zague.
export function posicaoDoPonto(k, totalPontos) {
  return {
    x: LARGURA * (k % 2 === 0 ? 0.38 : 0.62),
    y: alturaTabuleiro(totalPontos) - MARGEM - k * ESPACO,
  }
}

export function emPorcentagem({ x, y }, totalPontos) {
  return {
    left: `${(x / LARGURA) * 100}%`,
    top: `${(y / alturaTabuleiro(totalPontos)) * 100}%`,
  }
}

function aproximar(de, para, distancia) {
  const dx = para.x - de.x
  const dy = para.y - de.y
  const len = Math.hypot(dx, dy)
  return { x: de.x + (dx / len) * distancia, y: de.y + (dy / len) * distancia }
}

// Monta uma seta curva (quadrática) de `origem` até `destino`, puxada por `controle`.
// Retorna o caminho, a ponta da seta e onde fica o selo com a letra.
function montarSeta(origem, destino, controle) {
  const inicio = aproximar(origem, controle, RAIO_NO + 6)
  const fim = aproximar(destino, controle, RAIO_NO + 16)

  // Ponta da seta: triângulo alinhado com a tangente no fim da curva.
  const dir = aproximar(controle, fim, 1)
  const t = { x: dir.x - controle.x, y: dir.y - controle.y }
  const n = { x: -t.y, y: t.x }
  const ponta = { x: fim.x + t.x * 12, y: fim.y + t.y * 12 }
  const base1 = { x: fim.x + n.x * 8, y: fim.y + n.y * 8 }
  const base2 = { x: fim.x - n.x * 8, y: fim.y - n.y * 8 }

  const selo = {
    x: 0.25 * inicio.x + 0.5 * controle.x + 0.25 * fim.x,
    y: 0.25 * inicio.y + 0.5 * controle.y + 0.25 * fim.y,
  }

  return {
    caminho: `M ${inicio.x} ${inicio.y} Q ${controle.x} ${controle.y} ${fim.x} ${fim.y}`,
    ponta: `M ${ponta.x} ${ponta.y} L ${base1.x} ${base1.y} L ${base2.x} ${base2.y} Z`,
    selo,
  }
}

// Seta da opção `indice` (0, 1, 2) para a etapa logo acima: as três formam um leque.
export function geometriaDaSeta(origem, destino, indice, totalOpcoes) {
  const meio = { x: (origem.x + destino.x) / 2, y: (origem.y + destino.y) / 2 }
  const dx = destino.x - origem.x
  const dy = destino.y - origem.y
  const len = Math.hypot(dx, dy)
  const perp = { x: -dy / len, y: dx / len }

  const deslocamento = (indice - (totalOpcoes - 1) / 2) * ABERTURA * 2
  const controle = { x: meio.x + perp.x * deslocamento, y: meio.y + perp.y * deslocamento }
  return montarSeta(origem, destino, controle)
}

// Seta que pula etapas: contorna o tabuleiro pelo lado de fora do zigue-zague.
export function geometriaDoSalto(origem, destino) {
  const paraFora = origem.x < LARGURA / 2 ? -1 : 1
  const controle = {
    x: (origem.x + destino.x) / 2 + paraFora * CURVA_DO_SALTO,
    y: (origem.y + destino.y) / 2,
  }
  return montarSeta(origem, destino, controle)
}
