import styles from './HUD.module.css'

// Nome por extenso no desktop e abreviado no celular (o CSS escolhe qual mostrar).
export function Rotulo({ longo, curto = longo }) {
  return (
    <span className={styles.rotulo}>
      <span className={styles.longo}>{longo}</span>
      <span className={styles.curto}>{curto}</span>
    </span>
  )
}

// Com `meta`, a barra mostra o progresso até a meta; com `max`, quanto resta.
export default function StatBar({ rotulo, rotuloCurto, icone, valor, max, meta, cor, alerta = false }) {
  const limite = meta ?? max
  const fracao = Math.max(0, Math.min(valor / limite, 1))
  const atingida = meta !== undefined && valor >= meta

  return (
    <div className={`${styles.stat} ${alerta ? styles.alerta : ''}`} style={{ '--cor': cor }}>
      <span className={styles.icone}>{icone}</span>
      <div className={styles.corpo}>
        <div className={styles.cabecalho}>
          <Rotulo longo={rotulo} curto={rotuloCurto} />
          <strong className={styles.valor}>
            {/* key faz o número "saltar" sempre que muda */}
            <span key={valor} className={styles.numero}>
              {valor}
            </span>
            <span className={styles.limite}>/{limite}</span>
            {atingida && (
              <span className={styles.check} aria-label="meta atingida">
                ✓
              </span>
            )}
          </strong>
        </div>
        <div
          className={styles.trilho}
          role="meter"
          aria-label={rotulo}
          aria-valuenow={valor}
          aria-valuemin={0}
          aria-valuemax={limite}
        >
          <div className={styles.preenchimento} style={{ width: `${fracao * 100}%` }} />
        </div>
      </div>
    </div>
  )
}
