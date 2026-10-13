import { useReducer } from 'react'
import { gameReducer } from '../game/gameReducer.js'
import { criarEstadoInicial } from '../game/initialState.js'
import { GameContext } from './gameContext.js'

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, criarEstadoInicial)
  return <GameContext value={{ state, dispatch }}>{children}</GameContext>
}
