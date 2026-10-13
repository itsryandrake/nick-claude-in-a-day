import { useEffect, useId, useRef, useState } from 'react'
import { Check, Copy } from '@phosphor-icons/react'

const flow = [
  { name: 'Claude Code', action: 'Edit and test', logo: '/brand/architecture/claude.svg' },
  { name: 'GitHub', action: 'Commit and push', logo: '/brand/architecture/github.svg' },
  { name: 'Vercel', action: 'Build and deploy', logo: '/brand/architecture/vercel.svg' },
  { name: "Nick's app", action: 'Open the app', logo: '/brand/ential-black.svg' },
]

const prompts = [
  {
    label: 'Work',
    text: "Inspect the current repo first. Map how plugins are listed, sold and delivered, then propose a focused catalogue page for one plugin with an original campaign and Stripe Checkout in test mode. Preserve the existing architecture and working behaviour. Propose the data model and UI before implementation, then add tests. Protect customer and payment data. Ask before external integrations, migrations, deployment, live payments, publishing or any irreversible action.",
  },
  {
    label: 'Family',
    text: "Inspect Nick's current app first. Propose a Family module with a baby countdown, shared appointments, a preparation checklist, private documents, photos and notes, plus age appropriate milestone prompts after birth. Do not invent names, dates or medical facts. Preserve the existing architecture and working behaviour. Propose the data model and UI before implementation, then add tests. Protect family data. Ask before external integrations, migrations, deployment, messages, calendar changes or any irreversible action.",
  },
  {
    label: 'Health & Fitness',
    text: "Inspect Nick's current app first. Propose a Health & Fitness module for workouts, sleep, weight trends, authorised health data imports and a weekly review. Use read only defaults and make no medical claims. Preserve the existing architecture and working behaviour. Propose the data model and UI before implementation, then add tests. Protect health data. Ask before external integrations, migrations, deployment, account connections or any irreversible action.",
  },
  {
    label: 'Finances',
    text: "Inspect Nick's current app first. Propose a Finances module for bills, subscriptions, due dates, a read only account overview, a monthly household review and alerts that never spend money automatically. Preserve the existing architecture and working behaviour. Propose the data model and UI before implementation, then add tests for dates and totals. Protect financial data. Ask before external integrations, migrations, deployment, payments, bank connections or any irreversible action.",
  },
  {
    label: 'Household & admin',
    text: "Inspect Nick's current app first. Propose a Household & admin module for shared reminders, documents, open loops and one family calendar. Show who owns each item and what needs approval. Preserve the existing architecture and working behaviour. Propose the data model and UI before implementation, then add tests. Protect private documents. Ask before external integrations, migrations, deployment, messages, bookings or any irreversible action.",
  },
  {
    label: 'Save to GitHub',
    text: 'Inspect the current repo and review the full diff. Run the relevant tests and production build. Explain any failures and propose a clear commit message. If the checks pass, create the local commit. Stop and ask before pushing to GitHub or triggering a deployment.',
  },
]

const resources = [
  { name: 'skills.sh', note: 'Agent skills directory', href: 'https://skills.sh/', logo: '/brand/resources/skills.ico' },
  { name: 'Taste Skill', note: 'Frontend judgement', href: 'https://www.tasteskill.dev/', logo: '/brand/resources/taste.webp' },
  { name: 'Impeccable', note: 'Interface craft', href: 'https://impeccable.style/', logo: '/brand/resources/impeccable.svg' },
  { name: 'Variant', note: 'Product design references', href: 'https://variant.com/', logo: '/brand/resources/variant.svg' },
  { name: 'Dribbble', note: 'Visual pattern research', href: 'https://dribbble.com/', logo: '/brand/resources/dribbble.svg' },
  { name: 'Behance', note: 'Detailed project studies', href: 'https://www.behance.net/', logo: '/brand/resources/behance.png' },
  { name: 'Wispr Flow', note: 'Voice to text', href: 'https://wisprflow.ai/', logo: '/brand/resources/wispr-flow.png' },
]

function CopyPrompt({ label, children }: { label: string; children: string }) {
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
      <h3>{label}</h3>
      <p id={promptId}>{children}</p>
      <button type="button" onClick={copyPrompt} aria-describedby={promptId}>
        {status === 'copied' ? <Check size={17} aria-hidden="true" /> : <Copy size={17} aria-hidden="true" />}
        {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy prompt'}
      </button>
      <span className="visually-hidden" role="status" aria-live="polite" aria-atomic="true">
        {status === 'copied' ? 'Prompt copied to clipboard.' : status === 'failed' ? 'Copy failed. Select the prompt text and copy it manually.' : ''}
      </span>
    </article>
  )
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to Nick's recap</a>
      <header className="site-header">
        <a href="#top" aria-label="Ential, back to top"><img src="/brand/ential-black.svg" alt="Ential" width="300" height="78" /></a>
        <a href="#architecture">How it goes live</a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <h1 id="hero-title">Nick, here is what to build next.</h1>
          <p>Friday gave us a practical base. This note keeps the useful parts and turns them into a short build list for work and home.</p>
          <a className="primary-link" href="#recap">See the Friday recap</a>
          <p className="redbark-note"><strong>Reminder:</strong> the Redbark trial ends Thursday. Decide whether to keep it before it rolls over.</p>
        </section>

        <section className="page-section recap" id="recap" aria-labelledby="recap-title">
          <div className="section-heading">
            <h2 id="recap-title">Friday recap</h2>
            <p>Keep the parts that remove work or make the next step clearer.</p>
          </div>
          <ul className="recap-list">
            <li><strong>Artifacts</strong><span>Ask for a document, diagram or working prototype you can inspect.</span></li>
            <li><strong>Wispr Flow</strong><span>Speak the rough draft, then edit it into your own words.</span></li>
            <li><strong>Skills and subagents</strong><span>Reuse a method with a skill. Split independent work across subagents.</span></li>
            <li><strong>GIS onboarding</strong><span>Put short guidance where a new user gets stuck.</span></li>
            <li><strong>GitHub and Vercel</strong><span>Commit a version, push it to GitHub, then let Vercel deploy it.</span></li>
            <li><strong>Personal dashboard</strong><span>Start with the family information you check every week.</span></li>
          </ul>
        </section>

        <section className="page-section architecture" id="architecture" aria-labelledby="architecture-title">
          <div className="section-heading">
            <h2 id="architecture-title">How the app goes live</h2>
            <p>Claude Code changes files locally. A commit records a version. Push sends it to GitHub. Vercel deploys from GitHub.</p>
          </div>

          <figure className="system-flow">
            <figcaption className="visually-hidden">Claude Code edits and tests the local project. A commit records a version and push sends it to GitHub. Vercel builds and deploys from GitHub. GoDaddy DNS points the domain to Vercel. Stripe is an optional integration with Nick's app.</figcaption>
            <ol className="core-flow" aria-label="Deployment path from Claude Code to Nick's app">
              {flow.map((item) => (
                <li key={item.name}>
                  <img src={item.logo} alt="" width="48" height="48" />
                  <div><strong>{item.name}</strong><span>{item.action}</span></div>
                </li>
              ))}
            </ol>
            <div className="secondary-flow" aria-label="Secondary connections">
              <p><img src="/brand/architecture/godaddy.svg" alt="" width="26" height="26" /><strong>GoDaddy DNS</strong><span aria-hidden="true">→</span>Vercel</p>
              <p><img src="/brand/architecture/stripe.svg" alt="" width="26" height="26" /><strong>Stripe</strong><span aria-hidden="true">→</span>Nick's app <small>optional checkout</small></p>
            </div>
          </figure>

          <CopyPrompt label="Safe GitHub prompt">Inspect the current repo and review the full diff. Run the relevant tests and production build. Explain any failures and propose a clear commit message. If the checks pass, create the local commit. Stop and ask before pushing to GitHub or triggering a deployment.</CopyPrompt>
        </section>

        <section className="page-section" id="build" aria-labelledby="build-title">
          <div className="section-heading"><h2 id="build-title">Build next</h2></div>
          <div className="build-columns">
            <section aria-labelledby="work-title">
              <h3 id="work-title">Work</h3>
              <ul>
                <li>Turn the plugin catalogue into a clear offer and advertise one useful plugin.</li>
                <li>Add Stripe Checkout in test mode before any live payment.</li>
                <li>Rebuild a strong reference landing page with original assets and copy.</li>
                <li>Improve GIS onboarding inside the product.</li>
              </ul>
            </section>
            <section aria-labelledby="personal-title">
              <h3 id="personal-title">Personal</h3>
              <ul>
                <li><strong>Family:</strong> baby countdown, appointments, preparation, documents, photos, notes and milestone prompts.</li>
                <li><strong>Health & Fitness:</strong> workouts, sleep, weight trends, authorised imports and a weekly review.</li>
                <li><strong>Finances:</strong> bills, subscriptions, due dates, read only accounts, reviews and alerts without automatic spending.</li>
                <li><strong>Household & admin:</strong> shared reminders, documents, open loops and one calendar.</li>
              </ul>
            </section>
          </div>
        </section>

        <section className="page-section prompts" id="prompts" aria-labelledby="prompts-title">
          <div className="section-heading">
            <h2 id="prompts-title">Prompts for Nick's app</h2>
            <p>Run one prompt at a time from the project folder.</p>
          </div>
          <div className="prompt-list">{prompts.slice(0, 5).map((prompt) => <CopyPrompt key={prompt.label} label={prompt.label}>{prompt.text}</CopyPrompt>)}</div>
        </section>

        <section className="page-section models" id="models" aria-labelledby="models-title">
          <div className="section-heading">
            <h2 id="models-title">Models</h2>
            <p>These descriptions follow Anthropic's official model notes.</p>
          </div>
          <div className="model-table" role="table" aria-label="Claude 5.5 model comparison">
            <div role="row"><div role="cell"><strong>Claude Opus 5.5</strong><span>Most complex work</span></div><p role="cell">Long running coding, audits and knowledge work that needs sustained judgement.</p><a role="cell" href="https://www.anthropic.com/claude-opus-5-5" target="_blank" rel="noreferrer">Official note</a></div>
            <div role="row"><div role="cell"><strong>Claude Sonnet 5.5</strong><span>Everyday work</span></div><p role="cell">Well scoped tasks, bug fixes and polished documents where speed and cost matter.</p><a role="cell" href="https://www.anthropic.com/claude-sonnet-5-5" target="_blank" rel="noreferrer">Official note</a></div>
            <div role="row"><div role="cell"><strong>Claude Haiku 5.5</strong><span>Fast repeatable work</span></div><p role="cell">High volume, cost sensitive tasks such as summaries, classification and narrow subagent jobs.</p><a role="cell" href="https://www.anthropic.com/claude-haiku-5-5" target="_blank" rel="noreferrer">Official note</a></div>
          </div>
        </section>

        <section className="page-section references" aria-labelledby="references-title">
          <div className="section-heading">
            <h2 id="references-title">References</h2>
            <p>Study the decisions and patterns. Keep Nick's work original.</p>
          </div>
          <ul className="reference-list">
            {resources.map((resource) => (
              <li key={resource.name}>
                <img src={resource.logo} alt="" width="28" height="28" />
                <a href={resource.href} target="_blank" rel="noreferrer">{resource.name}</a>
                <span>{resource.note}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <a href="https://www.ential.com/" target="_blank" rel="noreferrer" aria-label="Visit Ential"><img src="/brand/ential-black.svg" alt="Ential" width="300" height="78" /></a>
        <p>Prepared by Ryan at Ential after Friday's Claude in a Day session.</p>
        <a href="https://claudepub.vercel.app/" target="_blank" rel="noreferrer">Workshop source</a>
      </footer>
    </>
  )
}

export default App
