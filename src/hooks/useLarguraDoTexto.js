import { useLayoutEffect } from 'react'

// Ajusta a largura de uma caixa à linha mais larga do texto dentro dela.
// Sem isso, um texto que quebra em duas linhas deixa a caixa com a largura máxima
// e sobra espaço vazio ao lado (o CSS não "abraça" texto quebrado).
// `deps` deve mudar sempre que o conteúdo da caixa mudar.
export function useLarguraDoTexto(ref, deps) {
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    function ajustar() {
      el.style.width = '' // volta à largura natural (limitada pelo max-width do CSS)
      const faixa = document.createRange()
      faixa.selectNodeContents(el)
      const linhas = [...faixa.getClientRects()].filter((r) => r.width > 0)
      if (linhas.length === 0) return

      const esquerda = Math.min(...linhas.map((r) => r.left))
      const direita = Math.max(...linhas.map((r) => r.right))
      const cs = getComputedStyle(el)
      const extra =
        parseFloat(cs.paddingLeft) +
        parseFloat(cs.paddingRight) +
        parseFloat(cs.borderLeftWidth) +
        parseFloat(cs.borderRightWidth)
      el.style.width = `${Math.ceil(direita - esquerda + extra)}px`
    }

    ajustar()

    // Remede quando o tabuleiro muda de tamanho, quando o tema muda (troca a fonte)
    // e quando as fontes terminam de carregar.
    const aoRedimensionar = new ResizeObserver(ajustar)
    aoRedimensionar.observe(el.parentElement)
    const aoTrocarTema = new MutationObserver(ajustar)
    aoTrocarTema.observe(document.documentElement, { attributes: true, attributeFilter: ['data-estilo'] })
    document.fonts?.addEventListener('loadingdone', ajustar)

    return () => {
      aoRedimensionar.disconnect()
      aoTrocarTema.disconnect()
      document.fonts?.removeEventListener('loadingdone', ajustar)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
