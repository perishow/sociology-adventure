import { useEffect, useState } from 'react'
import { config } from '../data/config.js'

export const ESTILOS = [
  { id: 'aero', nome: 'Aero' },
  { id: 'classico', nome: 'Clássico' },
  { id: 'retro', nome: 'Retrô' },
]

const CHAVE = 'jogo-sociologia:estilo'

// O estilo salvo neste navegador, ou o padrão do config.
export function estiloInicial() {
  try {
    const salvo = localStorage.getItem(CHAVE)
    if (ESTILOS.some((e) => e.id === salvo)) return salvo
  } catch {
    // localStorage indisponível (aba anônima, bloqueio): usa o padrão
  }
  return config.estiloPadrao
}

export function aplicarEstilo(estilo) {
  document.documentElement.dataset.estilo = estilo
}

export function useEstilo() {
  const [estilo, setEstilo] = useState(estiloInicial)

  useEffect(() => {
    aplicarEstilo(estilo)
    try {
      localStorage.setItem(CHAVE, estilo)
    } catch {
      // sem persistência, mas o estilo continua aplicado nesta visita
    }
  }, [estilo])

  return [estilo, setEstilo]
}
