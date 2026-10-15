// Ícones em SVG inline, para ficarem iguais em qualquer sistema.

export function GroupIcon({ className }) {
  return (
    <svg viewBox="0 0 64 48" className={className} aria-hidden="true">
      {/* pessoa da esquerda */}
      <circle cx="15" cy="17" r="7" fill="#f4b183" stroke="#5a3a22" strokeWidth="2" />
      <path d="M3 44c0-9 5.5-15 12-15s12 6 12 15z" fill="#e8743b" stroke="#5a3a22" strokeWidth="2" />
      {/* pessoa da direita */}
      <circle cx="49" cy="17" r="7" fill="#c68b59" stroke="#5a3a22" strokeWidth="2" />
      <path d="M37 44c0-9 5.5-15 12-15s12 6 12 15z" fill="#3d8bd4" stroke="#5a3a22" strokeWidth="2" />
      {/* pessoa do meio, na frente */}
      <circle cx="32" cy="13" r="8.5" fill="#8d5a3b" stroke="#5a3a22" strokeWidth="2" />
      <path d="M17 46c0-11 6.7-18 15-18s15 7 15 18z" fill="#2e9e6b" stroke="#5a3a22" strokeWidth="2" />
    </svg>
  )
}

export function HourglassIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 2h12v2.5c0 2.5-1.8 4.6-4 7.5 2.2 2.9 4 5 4 7.5V22H6v-2.5c0-2.5 1.8-4.6 4-7.5-2.2-2.9-4-5-4-7.5z" fill="currentColor" />
    </svg>
  )
}

export function BookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6.5C10.3 5 7.7 4.2 4 4.2v14c3.7 0 6.3.8 8 2.3 1.7-1.5 4.3-2.3 8-2.3v-14c-3.7 0-6.3.8-8 2.3m-1 11.4c-1.6-.9-3.6-1.4-5-1.6V6.3c2 .2 3.7.7 5 1.6zm7-1.6c-1.4.2-3.4.7-5 1.6V7.9c1.3-.9 3-1.4 5-1.6z" fill="currentColor" />
    </svg>
  )
}

export function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z" fill="currentColor" />
    </svg>
  )
}

export function ShieldIcon({ quebrado = false }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z" fill="currentColor" />
      {quebrado ? (
        <path d="m13 6-3 5h3l-2 6" fill="none" stroke="var(--surface)" strokeWidth="2" strokeLinejoin="round" />
      ) : (
        <path d="m8 12 3 3 5-6" fill="none" stroke="var(--surface)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  )
}

export function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 2h2v20H5z" fill="currentColor" />
      <path d="M7 3h12l-3 4.5 3 4.5H7z" fill="var(--opcao-c)" />
    </svg>
  )
}

export function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 3h10v2h4v3a4 4 0 0 1-4.3 4A5 5 0 0 1 13 15v3h3v3H8v-3h3v-3a5 5 0 0 1-3.7-3A4 4 0 0 1 3 8V5h4zm10 4v3a2 2 0 0 0 2-2V7zM5 7v1a2 2 0 0 0 2 2V7z" fill="currentColor" />
    </svg>
  )
}

// Ficha de entrevista com dados pessoais (usada no tutorial de segurança).
export function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 2h10l4 4v16H5z" fill="currentColor" />
      <circle cx="10" cy="9" r="2.4" fill="var(--surface)" />
      <path d="M6.5 15c0-2.2 1.6-3.6 3.5-3.6s3.5 1.4 3.5 3.6z" fill="var(--surface)" />
      <path d="M8 18h8M14 9h2.5M14 12h2.5" stroke="var(--surface)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function RobotIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M11 2h2v3h-2z" fill="currentColor" />
      <circle cx="12" cy="2.5" r="1.5" fill="currentColor" />
      <rect x="4" y="5" width="16" height="12" rx="3" fill="currentColor" />
      <circle cx="9" cy="10.5" r="1.8" fill="var(--surface)" />
      <circle cx="15" cy="10.5" r="1.8" fill="var(--surface)" />
      <path d="M9 14h6" stroke="var(--surface)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 18h10v4H7z" fill="currentColor" />
    </svg>
  )
}
