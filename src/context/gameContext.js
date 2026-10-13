import { createContext } from 'react'

// Fica separado do Provider para o react-refresh (HMR) funcionar.
export const GameContext = createContext(null)
