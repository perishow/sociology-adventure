import { useEffect, useState } from 'react'
import Button from '../components/common/Button.jsx'
import {
    BookIcon,
    DocIcon,
    FlagIcon,
    GroupIcon,
    HourglassIcon,
    RobotIcon,
    ShieldIcon,
    StarIcon,
} from '../components/common/Icons.jsx'
import { CORES_OPCAO, LETRAS } from '../components/common/letras.js'
import Effects from '../components/TaskModal/Effects.jsx'
import modal from '../components/TaskModal/TaskModal.module.css'
import { config } from '../data/config.js'
import { useGame } from '../hooks/useGame.js'
import styles from './Screens.module.css'
import tut from './Tutorial.module.css'

// Tutorial em flash cards, mostrado depois de "Começar". Cada card: uma ilustração,
// um título curto e uma frase. As ilustrações reaproveitam as peças do jogo
// (cartões de opção, efeitos, ícones) para o jogador reconhecê-las depois.

function IlustracaoObjetivo() {
    return (
        <div className={tut.objetivo}>
            <div className={tut.trilha}>
                <span className={`${tut.ponto} ${tut.chegada}`}>
                    <FlagIcon />
                </span>
                <span className={tut.ponto}>3</span>
                <span className={tut.ponto}>2</span>
                <span className={tut.ponto}>1</span>
                <span className={tut.token}>
                  <GroupIcon className="pixelar" />
                </span>
            </div>
            <div className={tut.metas}>
                <span style={{ '--cor': 'var(--aprendizado)' }}>
                    <BookIcon /> ≥ {config.minAprendizado}
                </span>
                <span style={{ '--cor': 'var(--qualidade)' }}>
                    <StarIcon /> ≥ {config.minQualidade}
                </span>
            </div>
        </div>
    )
}

function IlustracaoEscolha() {
    const custos = [1, 3, 2]
    return (
        <div className={tut.escolha}>
            {custos.map((custo, i) => (
                <span
                    key={i}
                    className={`${modal.card} ${tut.cardFalso} ${i === 1 ? tut.escolhido : ''}`}
                    style={{ '--cor': CORES_OPCAO[i] }}
                >
                    <span className={modal.letra}>{LETRAS[i]}</span>
                    <span className={tut.linhaTexto} />
                    <span className={modal.custo}>
                        <HourglassIcon />
                        {custo}
                    </span>
                </span>
            ))}
        </div>
    )
}

const OPCAO_EXEMPLO = { custoTempo: 3, efeitos: { aprendizado: 4, qualidade: 5 } }

function IlustracaoConsequencias() {
    return (
        <div className={tut.consequencias}>
            <span className={tut.misterio}>?</span>
            <span className={tut.seta}>▼</span>
            <Effects opcao={OPCAO_EXEMPLO} />
        </div>
    )
}

function IlustracaoSeguranca() {
    return (
        <div className={tut.seguranca}>
            <span className={tut.icone} style={{ '--cor': 'var(--text-muted)' }}>
                <DocIcon />
            </span>
            <span className={tut.bloqueio}>✕</span>
            <span className={tut.icone} style={{ '--cor': 'var(--text-muted)' }}>
                <RobotIcon />
            </span>
            <span className={`${tut.icone} ${tut.escudo}`} style={{ '--cor': 'var(--danger)' }}>
                <ShieldIcon quebrado />
            </span>
        </div>
    )
}

const CARDS = [
    {
        titulo: 'Chegue à apresentação',
        texto: 'Ande pelo tabuleiro cumprindo as metas de aprendizado e qualidade.',
        Ilustracao: IlustracaoObjetivo,
    },
    {
        titulo: 'Escolha A, B ou C',
        texto: 'Em cada etapa, escolha uma opção. Cada uma gasta tempo.',
        Ilustracao: IlustracaoEscolha,
    },
    {
        titulo: 'Surpresa!',
        texto: 'Os pontos só aparecem depois de escolher. Pense bem!',
        Ilustracao: IlustracaoConsequencias,
    },
    {
        titulo: 'Proteja os dados',
        texto: 'Cuidado para não comprometer a segurança dos dados sensíveis coletados!',
        Ilustracao: IlustracaoSeguranca,
        alerta: true,
    },
]

export default function TutorialScreen() {
    const { dispatch } = useGame()
    const [indice, setIndice] = useState(0)
    const ultimo = indice === CARDS.length - 1
    const { titulo, texto, Ilustracao, alerta } = CARDS[indice]

    const comecar = () => dispatch({ type: 'INICIAR' })
    const avancar = () => (ultimo ? comecar() : setIndice(indice + 1))

    // Setas do teclado também passam os cards
    useEffect(() => {
        function aoTeclar(e) {
            if (e.key === 'ArrowRight') setIndice((i) => Math.min(i + 1, CARDS.length - 1))
            if (e.key === 'ArrowLeft') setIndice((i) => Math.max(i - 1, 0))
        }
        window.addEventListener('keydown', aoTeclar)
        return () => window.removeEventListener('keydown', aoTeclar)
    }, [])

    return (
        <main className={styles.tela}>
            <section
                key={indice}
                className={`${styles.cartao} ${tut.cartao} ${alerta ? styles.derrota : ''}`}
                aria-roledescription="card do tutorial"
                aria-label={`Tutorial ${indice + 1} de ${CARDS.length}`}
            >
                <div className={tut.topo}>
                    <span className={tut.contador}>
                        {indice + 1}/{CARDS.length}
                    </span>
                    <button type="button" className={tut.pular} onClick={comecar}>
                        Pular ⏭
                    </button>
                </div>

                <div className={tut.palco} aria-hidden="true">
                    <Ilustracao />
                </div>

                <h1 className={`${styles.titulo} ${tut.titulo}`}>{titulo}</h1>
                <p className={`${styles.subtitulo} ${tut.texto}`}>{texto}</p>

                <div className={tut.pontinhos} aria-hidden="true">
                    {CARDS.map((_, i) => (
                        <span key={i} className={i === indice ? tut.ativo : ''} />
                    ))}
                </div>

                <div className={tut.acoes}>
                    {indice > 0 && (
                        <Button variant="secondary" onClick={() => setIndice(indice - 1)} aria-label="Card anterior">
                            ◀
                        </Button>
                    )}
                    <Button grande onClick={avancar} autoFocus>
                        {ultimo ? '▶ Jogar' : 'Próximo ▶'}
                    </Button>
                </div>
            </section>
        </main>
    )
}
