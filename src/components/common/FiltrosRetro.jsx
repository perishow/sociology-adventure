// Filtro SVG que "pixeliza" o que for desenhado com a classe .pixelar (só no tema Retrô).
// Amostra 1 ponto a cada 4px e o expande num quadrado de 4px.
export default function FiltrosRetro() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <filter id="retro-pixelar" x="0" y="0" width="100%" height="100%">
        <feFlood x="2" y="2" width="1" height="1" />
        <feComposite width="4" height="4" />
        <feTile result="grade" />
        <feComposite in="SourceGraphic" in2="grade" operator="in" />
        <feMorphology operator="dilate" radius="2" />
      </filter>
    </svg>
  )
}
