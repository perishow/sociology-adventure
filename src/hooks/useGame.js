import { use } from 'react'
import { GameContext } from '../context/gameContext.js'

export function useGame() {
  const ctx = use(GameContext)
  if (!ctx) throw new Error('useGame precisa estar dentro de <GameProvider>')
  return ctx
}
