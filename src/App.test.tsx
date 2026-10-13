import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => vi.restoreAllMocks())

describe('Claude in a Day follow-up', () => {
  it('organises the practical next steps into DSQ work and personal tracks', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /sell the plugins and improve the product around them/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /build one family operating system before the baby arrives/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Advertise a plugin' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Add Stripe checkout' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Guide people inside the GIS app' })).toBeInTheDocument()
    expect(screen.getByText(/Redbark trial ending Thursday/i)).toBeInTheDocument()
  })

  it('shows a neutral baby profile with useful categories and example labels', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Baby profile' })).toBeInTheDocument()
    expect(screen.getByText('Example view')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Before birth' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Once born' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Family record' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Milestones' })).toBeInTheDocument()
    expect(screen.getByText(/Confirm dates before adding reminders/i)).toBeInTheDocument()
  })

  it('updates the architecture detail when a product is selected', async () => {
    const user = userEvent.setup()
    render(<App />)
    const stripe = screen.getByRole('button', { name: /Stripe.*Optional checkout/i })
    await user.click(stripe)
    expect(screen.getByText(/It is not part of the core deployment chain/i)).toBeInTheDocument()
    expect(stripe).toHaveAttribute('aria-pressed', 'true')
  })

  it('states every step in the deployment path accurately', () => {
    render(<App />)
    const summary = document.querySelector('.architecture-map > .visually-hidden')
    expect(summary).toHaveTextContent(/A commit creates a local version/i)
    expect(summary).toHaveTextContent(/A push sends commits to GitHub/i)
    expect(summary).toHaveTextContent(/GitHub can trigger a Vercel build and deployment/i)
    expect(summary).toHaveTextContent(/GoDaddy DNS points the custom domain to the Vercel project/i)
    expect(summary).toHaveTextContent(/Stripe is an optional work app integration/i)
  })

  it('includes all three verified Claude 5.5 models and official links', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Claude Opus 5.5' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Claude Sonnet 5.5' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Claude Haiku 5.5' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Anthropic's Opus 5.5 note/i })).toHaveAttribute('href', 'https://www.anthropic.com/claude-opus-5-5')
    expect(screen.getByRole('link', { name: /Anthropic's Sonnet 5.5 note/i })).toHaveAttribute('href', 'https://www.anthropic.com/claude-sonnet-5-5')
    expect(screen.getByRole('link', { name: /Anthropic's Haiku 5.5 note/i })).toHaveAttribute('href', 'https://www.anthropic.com/claude-haiku-5-5')
  })

  it('copies a safe project prompt', async () => {
    const user = userEvent.setup()
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: 'Copy prompt' })
    expect(buttons.length).toBeGreaterThanOrEqual(9)
    await user.click(buttons[0])
    await expect(navigator.clipboard.readText()).resolves.toContain('Inspect the existing DSQ project first')
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
  })

  it('shows a useful fallback when clipboard access fails', async () => {
    const user = userEvent.setup()
    render(<App />)
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('blocked'))
    await user.click(screen.getAllByRole('button', { name: 'Copy prompt' })[0])
    expect(screen.getByText('Copy failed')).toBeInTheDocument()
    expect(screen.getAllByRole('status').some((element) => element.textContent?.includes('Select the prompt text and copy it manually.'))).toBe(true)
  })

  it('keeps the named workshop resources', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: /Browse skills.sh/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Open Wispr Flow/i })).toBeInTheDocument()
    for (const name of ['Taste Skill', 'Impeccable', 'Variant', 'Dribbble', 'Behance']) {
      expect(screen.getByRole('link', { name: new RegExp(name, 'i') })).toBeInTheDocument()
    }
  })

  it('uses the official Ential logo in the header and footer', () => {
    render(<App />)
    const logos = screen.getAllByRole('img', { name: 'Ential' })
    expect(logos).toHaveLength(2)
    expect(logos[0]).toHaveAttribute('src', '/brand/ential-black.svg')
    expect(logos[1]).toHaveAttribute('src', '/brand/ential-black.svg')
  })
})
