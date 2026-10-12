import { useState } from 'react'
import {
  ArrowRight,
  Browser,
  Check,
  ClockCountdown,
  Code,
  GitBranch,
  GlobeHemisphereWest,
  HouseLine,
  MapTrifold,
  Microphone,
  Notebook,
  Robot,
  Sparkle,
  Wallet,
} from '@phosphor-icons/react'

const outcomes = [
  {
    icon: Notebook,
    title: 'Claude artifacts',
    text: 'Turn ideas into useful documents, diagrams and working prototypes, then keep the human review step explicit.',
  },
  {
    icon: Microphone,
    title: 'Wispr Flow',
    text: 'Speak the first draft instead of typing it. Use voice to remove the blank-page delay and preserve your natural language.',
  },
  {
    icon: MapTrifold,
    title: 'GIS onboarding',
    text: "Add guided onboarding inside Nick's GIS app so first-time users understand the workflow in context.",
  },
  {
    icon: Wallet,
    title: 'One useful dashboard',
    text: 'Bring finance and personal information into a clear view for Nick and the family, without adding decorative metrics.',
  },
]

type NodeId = 'claude' | 'github' | 'godaddy' | 'vercel' | 'app'

const architecture: Record<NodeId, { title: string; role: string; detail: string }> = {
  claude: {
    title: 'Claude Code',
    role: 'Development loop',
    detail: 'Works in the local project and repository source. It edits files, runs checks and prepares commits. It is not the host.',
  },
  github: {
    title: 'GitHub',
    role: 'Source and versioning',
    detail: 'Stores committed source history. A push to the connected branch is the normal trigger for a Vercel deployment.',
  },
  godaddy: {
    title: 'GoDaddy',
    role: 'Domain and DNS',
    detail: 'Owns the domain and DNS records. Those records point the public domain to Vercel. GoDaddy does not deploy the app.',
  },
  vercel: {
    title: 'Vercel',
    role: 'Hosting and deployments',
    detail: 'Builds the GitHub source and serves the deployed site. Preview deployments can be created before the production branch changes.',
  },
  app: {
    title: 'The app',
    role: 'What people use',
    detail: "The deployed GIS onboarding and dashboard experience that Nick and the family open through the domain.",
  },
}

const architectureOrder: NodeId[] = ['claude', 'github', 'vercel', 'app', 'godaddy']

function ArchitectureNode({
  id,
  selected,
  onSelect,
}: {
  id: NodeId
  selected: boolean
  onSelect: (id: NodeId) => void
}) {
  const Icon = id === 'claude' ? Code : id === 'github' ? GitBranch : id === 'godaddy' ? GlobeHemisphereWest : id === 'vercel' ? Browser : HouseLine
  return (
    <button
      type="button"
      className={`architecture-node node-${id}${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(id)}
      aria-pressed={selected}
      aria-controls="architecture-detail"
    >
      <Icon size={20} weight="regular" aria-hidden="true" />
      <span>{architecture[id].title}</span>
      <small>{architecture[id].role}</small>
    </button>
  )
}

function App() {
  const [selectedNode, setSelectedNode] = useState<NodeId>('github')
  const selected = architecture[selectedNode]

  return (
    <>
      <a className="skip-link" href="#main">Skip to recap</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Claude in a Day, top">Claude in a Day</a>
        <nav aria-label="Page sections">
          <a href="#recap">Recap</a>
          <a href="#architecture">Architecture</a>
          <a href="#skills">Skills</a>
          <a href="#models">Models</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="context-line">Friday workshop recap for Nick</p>
            <h1 id="hero-title">From a day with Claude to a system you can keep using.</h1>
            <p className="hero-summary">Four practical directions, one delivery map, and a short guide for choosing the right Claude model and helpers.</p>
            <a className="primary-link" href="#architecture">Explore the build map <ArrowRight size={18} aria-hidden="true" /></a>
          </div>

          <div className="hero-index" aria-label="Workshop outcomes">
            {outcomes.map((outcome, index) => (
              <a href="#recap" key={outcome.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {outcome.title}
              </a>
            ))}
          </div>

          <aside className="next-action" aria-label="Next action">
            <ClockCountdown size={26} aria-hidden="true" />
            <div>
              <strong>Next action</strong>
              <p>Redbark's 7-day trial ends Thursday. Decide whether to keep it before access rolls over.</p>
            </div>
          </aside>
        </section>

        <section className="recap section-shell" id="recap" aria-labelledby="recap-title">
          <div className="section-heading">
            <h2 id="recap-title">What we put on the table</h2>
            <p>These are directions to test and shape, not claims that the finished products already exist.</p>
          </div>
          <div className="outcome-track">
            {outcomes.map(({ icon: Icon, title, text }, index) => (
              <article className="outcome" key={title}>
                <div className="outcome-marker"><Icon size={24} aria-hidden="true" /></div>
                <span className="outcome-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="architecture section-shell" id="architecture" aria-labelledby="architecture-title">
          <div className="section-heading architecture-heading">
            <h2 id="architecture-title">How the app gets from an idea to Nick</h2>
            <p>Select any node for its job. The arrows show ownership and the direction of each handoff.</p>
          </div>

          <div className="architecture-frame" data-feature="architecture-map">
            <div className="diagram" aria-label="Interactive application architecture">
              <svg className="connectors" viewBox="0 0 900 410" role="img" aria-labelledby="diagram-svg-title diagram-svg-desc">
                <title id="diagram-svg-title">Application delivery connections</title>
                <desc id="diagram-svg-desc">Claude Code commits local source to GitHub. GitHub triggers Vercel. GoDaddy DNS points the domain to Vercel. Vercel serves the app.</desc>
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" />
                  </marker>
                </defs>
                <path d="M 205 242 C 260 242, 285 242, 335 242" />
                <path d="M 505 242 C 560 242, 580 242, 625 242" />
                <path d="M 705 126 C 705 155, 705 170, 705 197" />
                <path d="M 770 242 C 804 242, 813 242, 846 242" />
                <text x="242" y="225">commit + push</text>
                <text x="540" y="225">deploy trigger</text>
                <text x="720" y="166">DNS</text>
                <text x="790" y="225">serves</text>
              </svg>
              {architectureOrder.map((id) => (
                <ArchitectureNode key={id} id={id} selected={selectedNode === id} onSelect={setSelectedNode} />
              ))}
            </div>

            <p className="mobile-architecture-note">Delivery route: Claude Code commits to GitHub, GitHub triggers Vercel, and Vercel serves the app. Domain route: GoDaddy DNS points to Vercel.</p>

            <aside className="architecture-detail" id="architecture-detail" aria-live="polite">
              <span>{selected.role}</span>
              <h3>{selected.title}</h3>
              <p>{selected.detail}</p>
              <div className="truth-note"><Check size={17} weight="bold" aria-hidden="true" /> Clear responsibility, no invented connection.</div>
            </aside>
          </div>
        </section>

        <section className="skills-models section-shell" id="skills" aria-labelledby="skills-title">
          <div className="skills-copy">
            <h2 id="skills-title">Skills are reusable procedures</h2>
            <p>A Skill is the procedure manual you would give a capable new team member: the steps, rules, template and a good example.</p>
            <ol className="skill-flow">
              <li><strong>Recognise the job.</strong><span>Claude loads the matching Skill.</span></li>
              <li><strong>Follow the method.</strong><span>It uses the agreed sequence and checks.</span></li>
              <li><strong>Review the result.</strong><span>You correct, approve and keep responsibility.</span></li>
            </ol>
            <a className="text-link" href="https://skills.sh/" target="_blank" rel="noreferrer">Browse reusable Skills at skills.sh <ArrowRight size={16} aria-hidden="true" /></a>
          </div>

          <div className="models" id="models">
            <h2>Choose the lightest model that fits</h2>
            <div className="model-row model-sonnet">
              <div><Sparkle size={24} aria-hidden="true" /><strong>Claude Sonnet 5.5</strong></div>
              <p>Use for well-scoped everyday work, coding fixes and polished documents, slides or spreadsheets.</p>
              <a href="https://www.anthropic.com/claude-sonnet-5-5" target="_blank" rel="noreferrer">Official model note</a>
            </div>
            <div className="model-row">
              <div><Robot size={24} aria-hidden="true" /><strong>Claude Haiku 5.5</strong></div>
              <p>Use for fast, high-volume or cost-sensitive repetitive tasks, plus subagent and browser work.</p>
              <a href="https://www.anthropic.com/claude-haiku-5-5" target="_blank" rel="noreferrer">Official model note</a>
            </div>
          </div>
        </section>

        <section className="subagents section-shell" aria-labelledby="subagents-title">
          <div className="subagent-intro">
            <Robot size={32} aria-hidden="true" />
            <h2 id="subagents-title">Claude Code subagents</h2>
            <p>Small delegated workers are useful when tasks can run independently. Give each one a narrow brief and require evidence back.</p>
          </div>
          <div className="subagent-sequence" aria-label="Practical subagent workflow">
            <article><strong>Delegate a boundary</strong><p>One outcome, the files it may touch, and a clear stop condition.</p></article>
            <ArrowRight className="sequence-arrow" size={22} aria-hidden="true" />
            <article><strong>Run in parallel</strong><p>Use separate agents for independent research, tests or components.</p></article>
            <ArrowRight className="sequence-arrow" size={22} aria-hidden="true" />
            <article><strong>Integrate centrally</strong><p>The lead agent reviews the evidence, resolves conflicts and runs final checks.</p></article>
          </div>
          <p className="subagent-rule"><strong>Use Sonnet 5.5</strong> when the delegated work needs judgment or polished output. <strong>Use Haiku 5.5</strong> when the task is repetitive, fast and easy to verify.</p>
        </section>

        <section className="references section-shell" aria-labelledby="references-title">
          <h2 id="references-title">Design references worth keeping</h2>
          <p>Use them for craft and interaction ideas, not as templates to copy.</p>
          <div className="reference-links">
            <a href="https://www.tasteskill.dev/" target="_blank" rel="noreferrer"><span>Taste Skill</span><strong>Anti-slop frontend judgment</strong></a>
            <a href="https://variant.com/" target="_blank" rel="noreferrer"><span>Variant</span><strong>Clear product craft</strong></a>
            <a href="https://dribbble.com/" target="_blank" rel="noreferrer"><span>Dribbble</span><strong>Visual pattern search</strong></a>
            <a href="https://www.behance.net/" target="_blank" rel="noreferrer"><span>Behance</span><strong>Full project studies</strong></a>
          </div>
        </section>
      </main>

      <footer>
        <p>Prepared as a practical follow-up to Friday's Claude in a Day session.</p>
        <div>
          <a href="https://claudepub.vercel.app/" target="_blank" rel="noreferrer">Workshop source</a>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  )
}

export default App
