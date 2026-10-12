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
    text: 'Turn an idea into a useful document, diagram or working prototype, then review the result before it goes anywhere.',
  },
  {
    icon: Microphone,
    title: 'Wispr Flow',
    text: 'Speak the rough draft instead of typing it. You get past the blank page faster and keep your own language.',
  },
  {
    icon: MapTrifold,
    title: 'GIS onboarding',
    text: 'Guide new users inside your GIS app so they can learn the workflow while they use it.',
  },
  {
    icon: Wallet,
    title: 'Finance and personal view',
    text: 'Bring the information you and the family need into one clear place, without adding metrics that do not help.',
  },
]

type NodeId = 'claude' | 'github' | 'godaddy' | 'vercel' | 'app'

const architecture: Record<NodeId, { title: string; role: string; detail: string }> = {
  claude: {
    title: 'Claude Code',
    role: 'Builds in the local project',
    detail: 'Claude Code edits the local project, runs the checks and prepares commits. It does not host the app.',
  },
  github: {
    title: 'GitHub',
    role: 'Keeps the source history',
    detail: 'GitHub stores the committed source. A push to the connected branch can trigger a Vercel deployment.',
  },
  godaddy: {
    title: 'GoDaddy',
    role: 'Controls the domain and DNS',
    detail: 'GoDaddy holds the domain and its DNS records. Those records point the public domain to Vercel.',
  },
  vercel: {
    title: 'Vercel',
    role: 'Builds and hosts the site',
    detail: 'Vercel builds the source from GitHub and serves the site. Preview deployments can be checked before production changes.',
  },
  app: {
    title: 'The app',
    role: 'What people open and use',
    detail: 'This is the GIS onboarding or family view that you open through the public domain.',
  },
}

const nodeIcons = {
  claude: Code,
  github: GitBranch,
  godaddy: GlobeHemisphereWest,
  vercel: Browser,
  app: HouseLine,
}

function ArchitectureNode({ id, selected, onSelect }: { id: NodeId; selected: boolean; onSelect: (id: NodeId) => void }) {
  const Icon = nodeIcons[id]
  return (
    <button
      type="button"
      className={`flow-node flow-node-${id}${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(id)}
      aria-pressed={selected}
      aria-controls="architecture-detail"
    >
      <Icon size={21} weight="regular" aria-hidden="true" />
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
      <a className="skip-link" href="#main">Skip to Nick's recap</a>

      <header className="site-header">
        <a className="ential-logo" href="#top" aria-label="Ential, back to top">
          <img src="/brand/ential-black.svg" alt="Ential" width="300" height="78" />
        </a>
        <nav aria-label="Page sections">
          <a href="#recap">Recap</a>
          <a href="#skills">Skills and models</a>
          <a href="#references">References</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="context-line">Friday's Claude in a Day follow-up</p>
            <h1 id="hero-title">Nick, here’s what we can <span>build next.</span></h1>
            <p className="hero-summary">A practical recap of Friday, with the ideas, tools and delivery path we mapped together.</p>
            <a className="primary-link" href="#architecture">See the delivery flow <ArrowRight size={19} aria-hidden="true" /></a>
          </div>

          <div className="hero-flow" id="architecture" aria-labelledby="architecture-title">
            <div className="flow-topline">
              <h2 id="architecture-title">How the app reaches you</h2>
              <p>Select a part to see what it does.</p>
            </div>

            <div className="flow-map" aria-label="Interactive application delivery flow">
              <p className="visually-hidden">Build path: Claude Code prepares source for GitHub, GitHub triggers Vercel, and Vercel serves the app. Domain path: GoDaddy DNS points to Vercel.</p>
              <div className="flow-track build-track" role="group" aria-label="Build path from Claude Code to the app">
                <ArchitectureNode id="claude" selected={selectedNode === 'claude'} onSelect={setSelectedNode} />
                <span className="flow-arrow" aria-hidden="true">→</span>
                <ArchitectureNode id="github" selected={selectedNode === 'github'} onSelect={setSelectedNode} />
                <span className="flow-arrow" aria-hidden="true">→</span>
                <ArchitectureNode id="vercel" selected={selectedNode === 'vercel'} onSelect={setSelectedNode} />
                <span className="flow-arrow" aria-hidden="true">→</span>
                <ArchitectureNode id="app" selected={selectedNode === 'app'} onSelect={setSelectedNode} />
              </div>
              <div className="domain-track" role="group" aria-label="Domain path from GoDaddy to Vercel">
                <ArchitectureNode id="godaddy" selected={selectedNode === 'godaddy'} onSelect={setSelectedNode} />
                <span className="domain-line" aria-hidden="true">GoDaddy DNS points to Vercel</span>
              </div>
            </div>

            <aside className="architecture-detail" id="architecture-detail" aria-live="polite">
              <div>
                <span>{selected.role}</span>
                <h3>{selected.title}</h3>
              </div>
              <p>{selected.detail}</p>
            </aside>
          </div>

          <aside className="next-action" aria-label="Thursday reminder">
            <ClockCountdown size={26} aria-hidden="true" />
            <div>
              <strong>Redbark decision on Thursday</strong>
              <p>The 7-day trial ends Thursday. Decide whether to keep it before the trial rolls over.</p>
            </div>
          </aside>
        </section>

        <section className="recap section-shell" id="recap" aria-labelledby="recap-title">
          <div className="recap-intro">
            <h2 id="recap-title">Four ideas from the day</h2>
            <p>These are the directions we discussed. We can test them before deciding what deserves a full build.</p>
          </div>
          <div className="outcome-list">
            {outcomes.map(({ icon: Icon, title, text }) => (
              <article className="outcome" key={title}>
                <Icon size={28} weight="regular" aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-models section-shell" id="skills" aria-labelledby="skills-title">
          <div className="skills-copy">
            <h2 id="skills-title">A Skill gives Claude a method</h2>
            <p>Think of it as the procedure you would give a capable new team member: the steps, rules, template and a strong example.</p>
            <div className="skill-flow">
              <p><strong>Recognise the job.</strong> Claude loads the Skill that matches the work.</p>
              <p><strong>Follow the method.</strong> It uses the agreed sequence and checks.</p>
              <p><strong>Review the result.</strong> You make the final call and keep responsibility.</p>
            </div>
            <a className="text-link" href="https://skills.sh/" target="_blank" rel="noreferrer">Browse Skills at skills.sh <ArrowRight size={17} aria-hidden="true" /></a>
          </div>

          <div className="models" id="models">
            <h2>Pick the lightest model that fits</h2>
            <article className="model-row model-sonnet">
              <div><Sparkle size={25} aria-hidden="true" /><h3>Claude Sonnet 5.5</h3></div>
              <p>Use it for well-scoped everyday work, coding fixes and polished documents, slides or spreadsheets.</p>
              <a href="https://www.anthropic.com/claude-sonnet-5-5" target="_blank" rel="noreferrer">Read Anthropic's model note</a>
            </article>
            <article className="model-row">
              <div><Robot size={25} aria-hidden="true" /><h3>Claude Haiku 5.5</h3></div>
              <p>Use it for fast, high-volume or cost-sensitive repetitive work, including subagent and browser tasks.</p>
              <a href="https://www.anthropic.com/claude-haiku-5-5" target="_blank" rel="noreferrer">Read Anthropic's model note</a>
            </article>
          </div>
        </section>

        <section className="subagents section-shell" aria-labelledby="subagents-title">
          <div className="subagent-copy">
            <Robot size={34} aria-hidden="true" />
            <h2 id="subagents-title">Claude Code subagents</h2>
            <p>Use separate agents when the work can run independently. Give each agent one clear outcome, limited files and a stop condition.</p>
          </div>
          <div className="subagent-flow" aria-label="Subagent working method">
            <article><h3>Delegate one boundary</h3><p>Define the result, the files it may touch and when it must stop.</p></article>
            <article><h3>Run independent work together</h3><p>Split research, tests or components only when they do not depend on each other.</p></article>
            <article><h3>Review in one place</h3><p>The lead agent checks the evidence, resolves conflicts and runs the final tests.</p></article>
          </div>
          <p className="subagent-rule"><strong>Use Sonnet 5.5</strong> when the task needs judgment or polished output. <strong>Use Haiku 5.5</strong> when it is repetitive, quick and easy to check.</p>
        </section>

        <section className="references section-shell" id="references" aria-labelledby="references-title">
          <div>
            <h2 id="references-title">References we should keep using</h2>
            <p>Use these to sharpen the work, not to copy somebody else's page.</p>
          </div>
          <div className="reference-links">
            <a href="https://www.tasteskill.dev/" target="_blank" rel="noreferrer"><span>Taste Skill</span><strong>Frontend judgment without the usual AI look</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://impeccable.style/" target="_blank" rel="noreferrer"><span>Impeccable</span><strong>Structure, accessibility and finish</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://variant.com/" target="_blank" rel="noreferrer"><span>Variant</span><strong>Product craft and interaction ideas</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://dribbble.com/" target="_blank" rel="noreferrer"><span>Dribbble</span><strong>Fast visual pattern research</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://www.behance.net/" target="_blank" rel="noreferrer"><span>Behance</span><strong>Long-form project studies</strong><ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer>
        <a className="footer-logo" href="https://www.ential.com/" target="_blank" rel="noreferrer" aria-label="Visit Ential">
          <img src="/brand/ential-black.svg" alt="Ential" width="300" height="78" />
        </a>
        <p>Prepared for you by Ryan at Ential after Friday's Claude in a Day session.</p>
        <div>
          <a href="https://claudepub.vercel.app/" target="_blank" rel="noreferrer">Workshop source</a>
          <a href="#top">Back to top</a>
        </div>
      </footer>
    </>
  )
}

export default App
