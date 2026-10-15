import FiltrosRetro from './components/common/FiltrosRetro.jsx'
import { useGame } from './hooks/useGame.js'
import EndScreen from './screens/EndScreen.jsx'
import GameScreen from './screens/GameScreen.jsx'
import StartScreen from './screens/StartScreen.jsx'
import TutorialScreen from './screens/TutorialScreen.jsx'

export default function App() {
  const { state } = useGame()

  return (
    <>
      <FiltrosRetro />
      {state.fase === 'inicio' && <StartScreen />}
      {state.fase === 'tutorial' && <TutorialScreen />}
      {state.fase === 'fim' && <EndScreen />}
      {state.fase === 'jogando' && <GameScreen />}
    </>
  )
}
