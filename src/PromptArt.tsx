export type ArtKind = 'work' | 'family' | 'health' | 'finances' | 'household' | 'github'

const ink = '#11100f'
const rule = '#d8d3cb'
const accent = '#f74603'

function Work() {
  return (
    <>
      <rect x="14" y="18" width="38" height="30" rx="4" fill="none" stroke={rule} strokeWidth="2" />
      <rect x="58" y="18" width="38" height="30" rx="4" fill="none" stroke={rule} strokeWidth="2" />
      <rect x="14" y="54" width="38" height="30" rx="4" fill="none" stroke={rule} strokeWidth="2" />
      <rect className="art-slot" x="58" y="54" width="38" height="30" rx="4" fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 4" />
      <g className="art-plugin">
        <rect x="64" y="60" width="26" height="18" rx="3" fill={accent} />
        <circle cx="77" cy="69" r="3" fill="#fff" />
      </g>
      <g className="art-cursor">
        <path d="M100 76 L100 96 L105 91 L110 100 L113 98 L108 89 L115 89 Z" fill={ink} />
      </g>
    </>
  )
}

function Family() {
  return (
    <>
      <circle cx="60" cy="52" r="34" fill="none" stroke={rule} strokeWidth="6" />
      <circle className="art-ring" cx="60" cy="52" r="34" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" pathLength="100" transform="rotate(-90 60 52)" />
      <path className="art-heart" d="M60 64 C 46 54, 48 40, 56 42 C 58 42.5, 59.5 44, 60 46 C 60.5 44, 62 42.5, 64 42 C 72 40, 74 54, 60 64 Z" fill={accent} />
    </>
  )
}

function Health() {
  return (
    <>
      <line x1="8" y1="52" x2="112" y2="52" stroke={rule} strokeWidth="2" />
      <path className="art-pulse" d="M8 52 L34 52 L42 34 L52 74 L62 22 L70 60 L76 52 L112 52" fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
      <circle className="art-dot" cx="112" cy="52" r="4" fill={ink} />
    </>
  )
}

function Finances() {
  return (
    <>
      <line x1="10" y1="88" x2="110" y2="88" stroke={ink} strokeWidth="2" />
      {[18, 40, 62, 84].map((x, i) => (
        <rect key={x} className="art-bar" style={{ animationDelay: `${i * 0.18}s` }} x={x} y={[52, 40, 58, 30][i]} width="16" height={[36, 48, 30, 58][i]} rx="2" fill={i === 3 ? accent : rule} />
      ))}
      <path className="art-trend" d="M26 46 L48 34 L70 50 L92 22" fill="none" stroke={ink} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
    </>
  )
}

function Household() {
  return (
    <>
      {[20, 46, 72].map((y, i) => (
        <g key={y}>
          <rect x="14" y={y - 9} width="18" height="18" rx="4" fill="none" stroke={ink} strokeWidth="2" />
          <path className="art-tick" style={{ animationDelay: `${i * 0.5}s` }} d={`M18 ${y} L22 ${y + 4} L29 ${y - 4}`} fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
          <rect x="42" y={y - 3} width={[58, 46, 64][i]} height="6" rx="3" fill={rule} />
        </g>
      ))}
    </>
  )
}

function GitHubSave() {
  return (
    <>
      <line x1="20" y1="80" x2="20" y2="24" stroke={rule} strokeWidth="3" />
      {[80, 58, 36].map((y) => <circle key={y} cx="20" cy={y} r="7" fill="#fff" stroke={ink} strokeWidth="2.5" />)}
      <circle className="art-commit" cx="20" cy="14" r="7" fill={accent} />
      <path d="M44 52 L80 52" stroke={rule} strokeWidth="2" strokeDasharray="4 5" />
      <g className="art-upload">
        <path d="M62 66 L62 40 M52 50 L62 40 L72 50" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <image href="/brand/architecture/github.svg" x="86" y="36" width="30" height="30" />
    </>
  )
}

const art: Record<ArtKind, () => React.JSX.Element> = { work: Work, family: Family, health: Health, finances: Finances, household: Household, github: GitHubSave }

export function PromptArt({ kind }: { kind: ArtKind }) {
  const Art = art[kind]
  return (
    <svg className={`prompt-art art-${kind}`} viewBox="0 0 120 104" width="120" height="104" aria-hidden="true" focusable="false">
      <Art />
    </svg>
  )
}
