import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Pause, Play } from '@phosphor-icons/react'

type PathKey = 'pushLaptop' | 'pullLaptop' | 'pushDesktop' | 'pullDesktop' | 'build' | 'deploy' | 'dns' | 'write' | 'read'
type NodeKey = 'laptop' | 'desktop' | 'github' | 'vercel' | 'website' | 'godaddy' | 'supabase'
type StoryKey = 'overview' | 'push' | 'pull' | 'deploy' | 'data' | 'domain'

type Entry = { title: string; body: string; paths: PathKey[]; nodes: NodeKey[] }

const paths: Record<PathKey, { d: string; label?: { text: string; x: number; y: number } }> = {
  pushLaptop: { d: 'M 190 104 Q 330 100 404 206', label: { text: 'push', x: 318, y: 96 } },
  pullLaptop: { d: 'M 396 228 Q 300 150 192 136', label: { text: 'pull', x: 300, y: 200 } },
  pushDesktop: { d: 'M 190 376 Q 330 380 404 274', label: { text: 'push', x: 318, y: 396 } },
  pullDesktop: { d: 'M 396 252 Q 300 330 192 344', label: { text: 'pull', x: 300, y: 292 } },
  build: { d: 'M 488 240 L 630 240', label: { text: 'watches', x: 559, y: 228 } },
  deploy: { d: 'M 730 240 L 842 240', label: { text: 'deploys', x: 786, y: 228 } },
  dns: { d: 'M 920 102 L 920 182', label: { text: 'DNS', x: 932, y: 148 } },
  write: { d: 'M 906 300 L 906 368', label: { text: 'save', x: 894, y: 340 } },
  read: { d: 'M 934 368 L 934 300', label: { text: 'load', x: 946, y: 340 } },
}

const stories: Record<StoryKey, Entry & { button: string }> = {
  overview: {
    button: 'The whole loop',
    title: 'Two computers, one source of truth',
    body: 'You can work on the laptop or the desktop. GitHub holds the master copy of the code. Vercel turns that code into the live website. Supabase stores the data the website saves. GoDaddy points your domain name at Vercel. Pick a step above, or click any piece of the map.',
    paths: Object.keys(paths) as PathKey[],
    nodes: ['laptop', 'desktop', 'github', 'vercel', 'website', 'godaddy', 'supabase'],
  },
  push: {
    button: '1. Push',
    title: 'Push sends your work up to GitHub',
    body: 'You finish a change on the laptop. Claude Code commits it, which saves a snapshot with a short note. Push uploads those commits to GitHub. Until you push, the change only exists on that one machine.',
    paths: ['pushLaptop'],
    nodes: ['laptop', 'github'],
  },
  pull: {
    button: '2. Pull',
    title: 'Pull brings the latest down to the other computer',
    body: "Later you sit down at the desktop. Its copy doesn't have the laptop's changes yet. Pull downloads the latest commits from GitHub so you carry on where you left off. It works the same way in reverse. The habit: pull when you sit down, push before you get up.",
    paths: ['pullDesktop'],
    nodes: ['github', 'desktop'],
  },
  deploy: {
    button: '3. Deploy',
    title: 'Vercel builds and ships every push',
    body: 'Vercel watches your GitHub repo. A push to main triggers a fresh build, and the live site updates in about a minute. Push a branch instead and Vercel gives you a private preview link to check before anything goes live.',
    paths: ['build', 'deploy'],
    nodes: ['github', 'vercel', 'website'],
  },
  data: {
    button: '4. Data',
    title: 'Supabase remembers things',
    body: "Vercel runs the code but keeps nothing between visits. Supabase is the database and the login. It holds your notes, appointments and bills. The data lives in Supabase, not on either computer, so the laptop, the desktop and the live site all see the same information. Code goes through GitHub. Data goes through Supabase.",
    paths: ['write', 'read'],
    nodes: ['website', 'supabase'],
  },
  domain: {
    button: '5. Domain',
    title: 'GoDaddy points your name at it',
    body: 'GoDaddy holds your domain name. Its DNS settings point that name at Vercel, so anyone who types the address lands on the latest deploy. You set this up once and leave it alone.',
    paths: ['dns'],
    nodes: ['godaddy', 'website'],
  },
}

const nodeInfo: Record<NodeKey, Entry> = {
  laptop: { title: 'Laptop', body: 'One full copy of the project, with Claude Code running inside it. Edit and test here, then push. Pull first if you last worked on the desktop.', paths: ['pushLaptop', 'pullLaptop'], nodes: ['laptop', 'github'] },
  desktop: { title: 'Desktop', body: "A second full copy of the same project. It only knows about the laptop's work after you pull from GitHub, and the laptop only sees this work after you push.", paths: ['pushDesktop', 'pullDesktop'], nodes: ['desktop', 'github'] },
  github: { title: 'GitHub', body: 'The master copy of your code and its full history. Both computers push to it and pull from it. If a laptop dies, nothing is lost.', paths: ['pushLaptop', 'pullLaptop', 'pushDesktop', 'pullDesktop', 'build'], nodes: ['laptop', 'desktop', 'github', 'vercel'] },
  vercel: { title: 'Vercel', body: 'Hosting. It watches GitHub, builds each new version and serves it to the world. It holds no data of its own, which is why Supabase exists.', paths: ['build', 'deploy'], nodes: ['github', 'vercel', 'website'] },
  website: { title: 'Your website', body: 'What visitors and your family actually open. The code comes from Vercel, the data comes from Supabase and the address comes from GoDaddy.', paths: ['deploy', 'dns', 'write', 'read'], nodes: ['vercel', 'website', 'godaddy', 'supabase'] },
  godaddy: { title: 'GoDaddy DNS', body: 'The address book. It maps your domain name to Vercel. You touch it once when you connect the domain.', paths: ['dns'], nodes: ['godaddy', 'website'] },
  supabase: { title: 'Supabase', body: 'Database, login and file storage. Anything the site needs to remember, such as appointments, notes or bills, is saved here and loaded back for every visit on every device.', paths: ['write', 'read'], nodes: ['website', 'supabase'] },
}

const storyOrder: StoryKey[] = ['push', 'pull', 'deploy', 'data', 'domain']

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!query) return
    const update = () => setReduced(query.matches)
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  return reduced
}

export function SystemMap() {
  const [active, setActive] = useState<StoryKey | NodeKey>('overview')
  const [playing, setPlaying] = useState(false)
  const reducedMotion = usePrefersReducedMotion()
  const timer = useRef<number | undefined>(undefined)

  const entry: Entry = active in stories ? stories[active as StoryKey] : nodeInfo[active as NodeKey]
  const isOverview = active === 'overview'

  useEffect(() => {
    if (!playing) return
    timer.current = window.setTimeout(() => {
      const index = storyOrder.indexOf(active as StoryKey)
      setActive(storyOrder[(index + 1) % storyOrder.length])
    }, 5200)
    return () => window.clearTimeout(timer.current)
  }, [playing, active])

  function choose(key: StoryKey | NodeKey) {
    setPlaying(false)
    setActive(key)
  }

  function togglePlay() {
    if (playing) return setPlaying(false)
    if (!storyOrder.includes(active as StoryKey)) setActive('push')
    setPlaying(true)
  }

  function nodeProps(key: NodeKey) {
    const lit = entry.nodes.includes(key)
    return {
      className: `map-node${lit ? ' is-lit' : ''}${active === key ? ' is-selected' : ''}`,
      role: 'button',
      tabIndex: 0,
      'aria-label': `${nodeInfo[key].title}: explain`,
      'aria-pressed': active === key,
      onClick: () => choose(key),
      onKeyDown: (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          choose(key)
        }
      },
    }
  }

  return (
    <figure className="system-map">
      <figcaption className="visually-hidden">
        Nick works on a laptop and a desktop, each with Claude Code. A commit records a version. Push sends commits from either computer to GitHub, and pull brings the latest commits back down to the other computer. Vercel watches GitHub, builds each push and deploys Nick's website. Supabase stores the website's data and login. GoDaddy DNS points the domain to Vercel.
      </figcaption>

      <div className="map-steps" role="group" aria-label="Walk through how it works">
        {(Object.keys(stories) as StoryKey[]).map((key) => (
          <button key={key} type="button" aria-pressed={active === key} onClick={() => choose(key)}>{stories[key].button}</button>
        ))}
        <button type="button" className="map-play" onClick={togglePlay} aria-pressed={playing}>
          {playing ? <Pause size={16} weight="fill" aria-hidden="true" /> : <Play size={16} weight="fill" aria-hidden="true" />}
          {playing ? 'Pause' : 'Play the loop'}
        </button>
      </div>

      <p className="map-hint" aria-hidden="true">Swipe sideways to see the whole map.</p>
      <div className="map-canvas">
        <svg viewBox="0 0 1040 470" aria-labelledby="map-svg-title">
          <title id="map-svg-title">Interactive map of laptop, desktop, GitHub, Vercel, Supabase, GoDaddy and Nick's website</title>
          <defs>
            <marker id="arrow-quiet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#c5bfb6" /></marker>
            <marker id="arrow-lit" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="#f74603" /></marker>
          </defs>

          {(Object.keys(paths) as PathKey[]).map((key) => {
            const lit = !isOverview && entry.paths.includes(key)
            const { d, label } = paths[key]
            return (
              <g key={key} className={`map-path${lit ? ' is-lit' : ''}`}>
                <path id={`path-${key}`} d={d} markerEnd={lit ? 'url(#arrow-lit)' : 'url(#arrow-quiet)'} />
                {label && <text x={label.x} y={label.y} textAnchor={key === 'dns' || key === 'read' ? 'start' : key === 'write' ? 'end' : 'middle'}>{label.text}</text>}
                {(lit || isOverview) && !reducedMotion && (
                  <circle r={lit ? 6 : 4} className="map-packet">
                    <animateMotion dur={lit ? '1.6s' : '3.2s'} repeatCount="indefinite" begin={isOverview ? `${(key.length % 5) * 0.4}s` : '0s'}>
                      <mpath href={`#path-${key}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            )
          })}

          <g {...nodeProps('laptop')} transform="translate(120 120)">
            <rect className="map-hit" x="-70" y="-58" width="140" height="132" />
            <rect className="map-device" x="-54" y="-40" width="108" height="68" rx="6" />
            <path className="map-device" d="M -66 34 L 66 34 L 58 44 L -58 44 Z" />
            <image href="/brand/architecture/claude.svg" x="-15" y="-21" width="30" height="30" />
            <text className="map-label" textAnchor="middle" y="68">Laptop</text>
            <text className="map-sub" textAnchor="middle" y="88">Claude Code</text>
          </g>

          <g {...nodeProps('desktop')} transform="translate(120 360)">
            <rect className="map-hit" x="-70" y="-64" width="140" height="138" />
            <rect className="map-device" x="-58" y="-48" width="116" height="74" rx="6" />
            <path className="map-device" d="M -10 26 L 10 26 L 14 40 L -14 40 Z" />
            <rect className="map-device" x="-28" y="40" width="56" height="5" rx="2" />
            <image href="/brand/architecture/claude.svg" x="-15" y="-26" width="30" height="30" />
            <text className="map-label" textAnchor="middle" y="70">Desktop</text>
            <text className="map-sub" textAnchor="middle" y="90">Claude Code</text>
          </g>

          <g {...nodeProps('github')} transform="translate(440 240)">
            <circle className="map-ring" r="46" />
            <image href="/brand/architecture/github.svg" x="-24" y="-24" width="48" height="48" />
            <text className="map-label" textAnchor="middle" y="76">GitHub</text>
            <text className="map-sub" textAnchor="middle" y="96">master copy</text>
          </g>

          <g {...nodeProps('vercel')} transform="translate(680 240)">
            <circle className="map-ring" r="46" />
            <image href="/brand/architecture/vercel.svg" x="-21" y="-23" width="42" height="42" />
            <text className="map-label" textAnchor="middle" y="76">Vercel</text>
            <text className="map-sub" textAnchor="middle" y="96">hosting</text>
          </g>

          <g {...nodeProps('website')} transform="translate(920 240)">
            <rect className="map-hit" x="-74" y="-60" width="148" height="120" />
            <rect className="map-device" x="-72" y="-52" width="144" height="104" rx="8" />
            <line className="map-rule" x1="-72" y1="-30" x2="72" y2="-30" />
            <circle cx="-58" cy="-41" r="3.5" fill="#f74603" />
            <circle cx="-46" cy="-41" r="3.5" fill="#d8d3cb" />
            <circle cx="-34" cy="-41" r="3.5" fill="#d8d3cb" />
            <rect x="-56" y="-16" width="70" height="9" rx="3" fill="#11100f" />
            <rect x="-56" y="0" width="100" height="6" rx="3" fill="#d8d3cb" />
            <rect x="-56" y="12" width="84" height="6" rx="3" fill="#d8d3cb" />
            <rect x="-56" y="28" width="40" height="12" rx="3" fill="#f74603" />
            <text className="map-label" x="-82" y="-64" textAnchor="end">Your website</text>
          </g>

          <g {...nodeProps('godaddy')} transform="translate(920 70)">
            <circle className="map-ring" r="32" />
            <image href="/brand/architecture/godaddy.svg" x="-17" y="-17" width="34" height="34" />
            <text className="map-label" x="-44" y="6" textAnchor="end">GoDaddy</text>
          </g>

          <g {...nodeProps('supabase')} transform="translate(920 404)">
            <circle className="map-ring" r="34" />
            <image href="/brand/architecture/supabase.svg" x="-17" y="-17" width="34" height="34" />
            <text className="map-label" x="-46" y="6" textAnchor="end">Supabase</text>
          </g>
        </svg>
      </div>

      <div className="map-explain" aria-live="polite">
        <h3>{entry.title}</h3>
        <p>{entry.body}</p>
      </div>
    </figure>
  )
}
