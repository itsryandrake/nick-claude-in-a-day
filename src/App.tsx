import { useEffect, useId, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Baby,
  Barbell,
  CalendarCheck,
  Check,
  ClockCountdown,
  Copy,
  CurrencyDollar,
  FileText,
  ForkKnife,
  Heartbeat,
  Image,
  MapTrifold,
  Notebook,
  Robot,
  Wallet,
} from '@phosphor-icons/react'

type NodeId = 'claude' | 'github' | 'vercel' | 'godaddy' | 'app' | 'stripe'

type ArchitectureItem = {
  title: string
  role: string
  detail: string
  logo: string
}

const architecture: Record<NodeId, ArchitectureItem> = {
  claude: {
    title: 'Claude Code',
    role: 'Prompt, edit and review',
    detail: 'Claude Code works in the local project. It can inspect files, make changes, run tests and review the result with you.',
    logo: '/brand/architecture/claude.svg',

  },
  github: {
    title: 'GitHub',
    role: 'Store version history',
    detail: 'A commit saves a local version with a message. A push sends commits to GitHub, where the project history is kept.',
    logo: '/brand/architecture/github.svg',

  },
  vercel: {
    title: 'Vercel',
    role: 'Build and deploy',
    detail: 'GitHub can trigger a Vercel build after a push. Vercel then deploys the built site and serves it over HTTPS.',
    logo: '/brand/architecture/vercel.svg',

  },
  godaddy: {
    title: 'GoDaddy DNS',
    role: 'Point the domain',
    detail: 'The domain stays with GoDaddy. Its DNS records point the custom domain to the Vercel project.',
    logo: '/brand/architecture/godaddy.svg',

  },
  app: {
    title: 'Live app',
    role: 'Open the published site',
    detail: 'Vercel serves the live app. The app may be the DSQ site, GIS onboarding or the family operating system.',
    logo: '/brand/ential-black.svg',

  },
  stripe: {
    title: 'Stripe',
    role: 'Optional checkout',
    detail: 'Stripe can be connected to a work app when DSQ is ready to sell a plugin. It is not part of the core deployment chain.',
    logo: '/brand/architecture/stripe.svg',

  },
}

const workPrompts = [
  'Inspect the existing DSQ project first. Show me how plugins are presented now, then propose a clearer sales page and one campaign to advertise a plugin. Preserve working behaviour, list assumptions, add tests, and ask before publishing or spending money.',
  'Inspect the existing DSQ project and its current payment flow. Propose a Stripe Checkout integration for one plugin, including success and cancellation states, test mode, webhook handling and tests. Show assumptions and ask before creating external resources, changing live settings or deploying.',
  'Inspect the current project before changing it. Rebuild the reference landing page in the existing stack without copying protected assets or text. Preserve working behaviour, match the useful layout and interaction patterns, add responsive tests, and ask before replacing or publishing anything.',
  'Inspect the GIS app and its current user journey. Find where a new user is most likely to get stuck, then add short onboarding inside the product. Preserve existing workflows, cover keyboard and mobile use, create tests, show assumptions, and ask before any irreversible change.',
]

const familyPrompts = [
  'Inspect the existing family project first. Design a neutral Baby profile and an age-appropriate milestone tracker without inventing a name, sex, dates or medical facts. Preserve working behaviour, add privacy notes and tests, show assumptions, and ask before connecting external services.',
  'Inspect the family project, then make a five-week pre-birth checklist for appointments, hospital preparation, documents, household jobs and reminders. Mark all dates as examples until confirmed. Preserve working behaviour, add tests, show assumptions, and ask before creating calendar events or sending messages.',
  'Inspect the current health and gym data sources before changing the app. Propose one useful weekly view for training, sleep and recovery without making medical claims. Preserve working behaviour, add tests, show assumptions, and ask before importing private data or connecting an account.',
  'Inspect the existing family finance setup first. Reconcile accounts, bills and upcoming costs using only supplied data, and flag gaps instead of guessing. Preserve working behaviour, create tests for calculations, show assumptions, and ask before moving money, changing records or contacting anyone.',
]

function ArchitectureNode({ id, selected, onSelect }: { id: NodeId; selected: boolean; onSelect: (id: NodeId) => void }) {
  const item = architecture[id]
  return (
    <button
      type="button"
      className={`architecture-node${selected ? ' is-selected' : ''}`}
      onClick={() => onSelect(id)}
      aria-pressed={selected}
      aria-controls="architecture-detail"
    >
      <img src={item.logo} alt="" width="32" height="32" />
      <span>{item.title}</span>
      <small>{item.role}</small>
    </button>
  )
}

function CopyPrompt({ children }: { children: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')
  const resetTimer = useRef<number | undefined>(undefined)
  const promptId = useId()

  useEffect(() => () => window.clearTimeout(resetTimer.current), [])

  async function copyPrompt() {
    window.clearTimeout(resetTimer.current)
    try {
      await navigator.clipboard.writeText(children)
      setStatus('copied')
      resetTimer.current = window.setTimeout(() => setStatus('idle'), 2400)
    } catch {
      setStatus('failed')
    }
  }

  return (
    <article className="prompt-block">
      <p id={promptId}>{children}</p>
      <button type="button" onClick={copyPrompt} aria-describedby={promptId}>
        {status === 'copied' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
        {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy prompt'}
      </button>
      <span className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">{status === 'copied' ? 'Prompt copied to clipboard.' : status === 'failed' ? 'Copy failed. Select the prompt text and copy it manually.' : ''}</span>
    </article>
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
          <a href="#work">DSQ work</a>
          <a href="#personal">Personal</a>
          <a href="#models">Models</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title">Nick, this is what to build next.</h1>
            <p>Friday covered a lot. This page turns it into two useful tracks: DSQ work you can ship and a personal operating system your family can use.</p>
            <a className="primary-link" href="#recap">Start with the recap <ArrowDown size={19} aria-hidden="true" /></a>
          </div>

          <div className="hero-flow" id="architecture" aria-labelledby="architecture-title">
            <div className="flow-heading">
              <h2 id="architecture-title">How a project becomes a live app</h2>
              <p>Select any product to see its job.</p>
            </div>

            <div className="architecture-map" role="group" aria-label="Interactive application delivery flow">
              <p className="visually-hidden">Claude Code edits and reviews the local project. A commit creates a local version. A push sends commits to GitHub. When the Git integration is connected, GitHub can trigger a Vercel build and deployment. GoDaddy DNS points the custom domain to the Vercel project. Vercel serves the live app. Stripe is an optional work app integration.</p>
              <div className="core-flow" role="group" aria-label="Core deployment path from Claude Code to the live app">
                <ArchitectureNode id="claude" selected={selectedNode === 'claude'} onSelect={setSelectedNode} />
                <span className="action-label" aria-hidden="true">commit locally, then push<ArrowRight size={17} /></span>
                <ArchitectureNode id="github" selected={selectedNode === 'github'} onSelect={setSelectedNode} />
                <span className="action-label" aria-hidden="true">trigger build and deploy<ArrowRight size={17} /></span>
                <ArchitectureNode id="vercel" selected={selectedNode === 'vercel'} onSelect={setSelectedNode} />
                <span className="action-label" aria-hidden="true">serve over HTTPS<ArrowRight size={17} /></span>
                <ArchitectureNode id="app" selected={selectedNode === 'app'} onSelect={setSelectedNode} />
              </div>
              <div className="support-flow">
                <div>
                  <ArchitectureNode id="godaddy" selected={selectedNode === 'godaddy'} onSelect={setSelectedNode} />
                  <span className="support-label">DNS points the custom domain to Vercel</span>
                </div>
                <div>
                  <ArchitectureNode id="stripe" selected={selectedNode === 'stripe'} onSelect={setSelectedNode} />
                  <span className="support-label">Optional checkout for a DSQ work app</span>
                </div>
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

          <aside className="redbark-note" aria-label="Redbark reminder">
            <ClockCountdown size={25} aria-hidden="true" />
            <p><strong>Workshop action: Redbark trial ending Thursday.</strong> Check whether to keep it before the trial rolls over.</p>
          </aside>
        </section>

        <section className="recap section-shell" id="recap" aria-labelledby="recap-title">
          <div className="section-intro">
            <h2 id="recap-title">What is worth keeping from Friday</h2>
            <p>Use these ideas when they remove real work. You do not need to force all of them into every project.</p>
          </div>
          <div className="recap-notes">
            <article><Notebook size={26} aria-hidden="true" /><div><h3>Artifacts</h3><p>Ask Claude for a document, diagram or prototype you can inspect, not a long answer you have to translate yourself.</p></div></article>
            <article><Robot size={26} aria-hidden="true" /><div><h3>Skills and subagents</h3><p>A Skill gives Claude a repeatable method. Subagents help when separate pieces of work can run independently and return evidence to one lead.</p><a href="https://skills.sh/" target="_blank" rel="noreferrer">Browse skills.sh <ArrowRight size={16} aria-hidden="true" /></a></div></article>
            <article><FileText size={26} aria-hidden="true" /><div><h3>Wispr Flow</h3><p>Speak the rough draft when typing slows you down. Keep the useful detail, then edit the transcript into your own words.</p><a href="https://wisprflow.ai/" target="_blank" rel="noreferrer">Open Wispr Flow <ArrowRight size={16} aria-hidden="true" /></a></div></article>
          </div>
        </section>

        <section className="track work-track section-shell" id="work" aria-labelledby="work-title">
          <div className="track-heading">
            <span>DSQ work</span>
            <h2 id="work-title">Sell the plugins and improve the product around them.</h2>
            <p>Start with the path from interest to payment, then make the GIS product easier to learn.</p>
          </div>

          <div className="work-plan" role="group" aria-label="DSQ work priorities">
            <article><span>First</span><h3>Advertise a plugin</h3><p>Choose one useful plugin, explain the problem it solves and send people to one focused landing page.</p></article>
            <article><span>Next</span><h3>Add Stripe checkout</h3><p>Connect payment only after the offer, price and delivery method are clear. Use Stripe test mode before any live sale.</p></article>
            <article><span>Build</span><h3>Rebuild a strong reference page</h3><p>Use the reference for layout and interaction ideas. Keep DSQ's own copy, assets and identity.</p></article>
            <article><span>Improve</span><h3>Guide people inside the GIS app</h3><p>Put short instructions where a new user needs them, then remove any step the product can do for them.</p></article>
          </div>

          <div className="prompt-section" role="region" aria-labelledby="work-prompts-title">
            <div><h3 id="work-prompts-title">Prompts for the DSQ repo</h3><p>Copy one prompt into Claude Code from the project folder.</p></div>
            <div className="prompt-list">{workPrompts.map((prompt) => <CopyPrompt key={prompt}>{prompt}</CopyPrompt>)}</div>
          </div>

          <section className="github-save" aria-labelledby="github-save-title">
            <div>
              <img src="/brand/architecture/github.svg" alt="GitHub logo" width="42" height="42" />
              <h3 id="github-save-title">Save your work to GitHub</h3>
              <p>Git records versions. GitHub stores the commits you push. Vercel can deploy from GitHub, but GitHub does not host or save an uncommitted local change for you.</p>
            </div>
            <CopyPrompt>Inspect the current project and review the full diff. Run the relevant tests and production build. Explain any failures, list assumptions, and propose a descriptive commit message. If the checks pass, create the local commit. Then stop and ask for approval before pushing to GitHub.</CopyPrompt>
          </section>
        </section>

        <section className="track personal-track section-shell" id="personal" aria-labelledby="personal-title">
          <div className="track-heading">
            <span>Personal</span>
            <h2 id="personal-title">Build one family operating system before the baby arrives.</h2>
            <p>With about five weeks to go, the useful version is small: shared preparation, a neutral baby profile, finance, health and reminders.</p>
          </div>

          <section className="baby-profile" aria-labelledby="baby-profile-title">
            <div className="baby-summary">
              <Baby size={34} aria-hidden="true" />
              <span>Example view</span>
              <h3 id="baby-profile-title">Baby profile</h3>
              <p>About five weeks to the due date at Friday's workshop</p>
              <small>This is example timing from the workshop note. Confirm dates before adding reminders.</small>
            </div>
            <div className="baby-timeline" role="group" aria-label="Baby profile categories">
              <article><CalendarCheck size={23} aria-hidden="true" /><h4>Before birth</h4><p>Appointments, preparation, documents and reminders.</p></article>
              <article><ForkKnife size={23} aria-hidden="true" /><h4>Once born</h4><p>Feeding and sleep notes, kept simple enough to use when tired.</p></article>
              <article><Image size={23} aria-hidden="true" /><h4>Family record</h4><p>Photos, short notes and important documents in one private place.</p></article>
              <article><Heartbeat size={23} aria-hidden="true" /><h4>Milestones</h4><p>Age-appropriate prompts to observe and discuss, not medical verdicts.</p></article>
            </div>
          </section>

          <div className="family-system" role="group" aria-label="Family operating system areas">
            <article><Wallet size={27} aria-hidden="true" /><h3>Family finance</h3><p>See accounts, bills and upcoming costs together. Reconcile the source data instead of guessing at a total.</p></article>
            <article><Barbell size={27} aria-hidden="true" /><h3>Health and gym</h3><p>Track training, sleep and recovery in a weekly view. Keep health advice with qualified professionals.</p></article>
            <article><MapTrifold size={27} aria-hidden="true" /><h3>Shared home view</h3><p>Bring appointments, documents and reminders into one place that both parents can understand quickly.</p></article>
          </div>

          <div className="prompt-section family-prompts" role="region" aria-labelledby="family-prompts-title">
            <div><h3 id="family-prompts-title">Prompts for the family project</h3><p>Each prompt starts with the existing project and keeps private or external actions behind approval.</p></div>
            <div className="prompt-list">{familyPrompts.map((prompt) => <CopyPrompt key={prompt}>{prompt}</CopyPrompt>)}</div>
          </div>
        </section>

        <section className="models section-shell" id="models" aria-labelledby="models-title">
          <div className="section-intro models-intro">
            <h2 id="models-title">Choose the model for the job.</h2>
            <p>These short descriptions follow Anthropic's current model pages.</p>
          </div>
          <div className="model-list">
            <article><span>Most complex work</span><h3>Claude Opus 5.5</h3><p>Use it for long-running coding, audits and knowledge work that needs sustained judgment.</p><a href="https://www.anthropic.com/claude-opus-5-5" target="_blank" rel="noreferrer">Anthropic's Opus 5.5 note <ArrowRight size={16} aria-hidden="true" /></a></article>
            <article><span>Everyday work</span><h3>Claude Sonnet 5.5</h3><p>Use it for well-scoped tasks, bug fixes and polished documents when speed and cost still matter.</p><a href="https://www.anthropic.com/claude-sonnet-5-5" target="_blank" rel="noreferrer">Anthropic's Sonnet 5.5 note <ArrowRight size={16} aria-hidden="true" /></a></article>
            <article><span>Fast repeatable work</span><h3>Claude Haiku 5.5</h3><p>Use it for high-volume, cost-sensitive tasks such as summaries, classification, browser work and narrow subagent jobs.</p><a href="https://www.anthropic.com/claude-haiku-5-5" target="_blank" rel="noreferrer">Anthropic's Haiku 5.5 note <ArrowRight size={16} aria-hidden="true" /></a></article>
          </div>
        </section>

        <section className="references section-shell" aria-labelledby="references-title">
          <div className="section-intro">
            <h2 id="references-title">References to keep close</h2>
            <p>Use them to study decisions and patterns. Do not copy somebody else's page.</p>
          </div>
          <div className="reference-links">
            <a href="https://www.tasteskill.dev/" target="_blank" rel="noreferrer"><span>Taste Skill</span><strong>Frontend judgment</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://impeccable.style/" target="_blank" rel="noreferrer"><span>Impeccable</span><strong>UI structure and finish</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://variant.com/" target="_blank" rel="noreferrer"><span>Variant</span><strong>Product craft</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://dribbble.com/" target="_blank" rel="noreferrer"><span>Dribbble</span><strong>Visual pattern research</strong><ArrowRight size={18} aria-hidden="true" /></a>
            <a href="https://www.behance.net/" target="_blank" rel="noreferrer"><span>Behance</span><strong>Detailed project studies</strong><ArrowRight size={18} aria-hidden="true" /></a>
          </div>
        </section>
      </main>

      <footer>
        <a className="footer-logo" href="https://www.ential.com/" target="_blank" rel="noreferrer" aria-label="Visit Ential">
          <img src="/brand/ential-black.svg" alt="Ential" width="300" height="78" />
        </a>
        <p>Prepared by Ryan at Ential after Friday's Claude in a Day session.</p>
        <a href="https://claudepub.vercel.app/" target="_blank" rel="noreferrer">Workshop source</a>
      </footer>
    </>
  )
}

export default App
