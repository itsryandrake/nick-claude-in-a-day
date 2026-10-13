import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from './App'

afterEach(() => vi.restoreAllMocks())

describe('Claude in a Day editorial note', () => {
  it('keeps the recap and both build tracks concise', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Friday recap' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: 'Work' }).length).toBeGreaterThan(0)
    expect(screen.getByRole('heading', { name: 'Personal' })).toBeInTheDocument()
    expect(screen.getByText(/Redbark trial ends Thursday/i)).toBeInTheDocument()
    const recap = document.querySelector('.recap-list') as HTMLElement
    for (const item of ['Artifacts', 'Wispr Flow', 'Skills and subagents', 'GIS onboarding', 'GitHub and Vercel', 'Personal dashboard']) {
      expect(within(recap).getByText(item)).toBeInTheDocument()
    }
  })

  it('explains push, pull, Vercel and Supabase without Stripe', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByRole('heading', { name: 'How it all works together' })).toBeInTheDocument()
    const map = document.querySelector('.system-map') as HTMLElement
    const summary = map.querySelector('figcaption')
    expect(summary).toHaveTextContent(/laptop and a desktop/i)
    expect(summary).toHaveTextContent(/Push sends commits from either computer to GitHub/i)
    expect(summary).toHaveTextContent(/pull brings the latest commits back down/i)
    expect(summary).toHaveTextContent(/Supabase stores/i)
    expect(summary).toHaveTextContent(/GoDaddy DNS points the domain to Vercel/i)
    expect(map.textContent).not.toMatch(/Stripe/)
    expect(map.querySelector('image[href*="ential"]')).toBeNull()

    await user.click(within(map).getByRole('button', { name: '2. Pull' }))
    expect(within(map).getByRole('heading', { name: /Pull brings the latest/i })).toBeInTheDocument()
    await user.click(within(map).getByRole('button', { name: 'Supabase: explain' }))
    expect(within(map).getByRole('heading', { name: 'Supabase' })).toBeInTheDocument()
  })

  it('includes safe prompts for work and personal modules inside Nick app', () => {
    render(<App />)
    for (const heading of ['Work', 'Family', 'Health & Fitness', 'Finances', 'Household & admin']) {
      expect(screen.getAllByRole('heading', { name: heading }).length).toBeGreaterThan(0)
    }
    const promptText = document.querySelector('.prompt-list')?.textContent ?? ''
    expect(promptText).toContain('Inspect my current app first')
    expect(promptText).not.toMatch(/Nick/)
    expect(promptText).toContain('Preserve my existing architecture and working behaviour')
    expect(promptText).toContain('Propose the data model and UI before you implement anything')
    expect(promptText).toContain('Protect')
    expect(promptText).toContain('Ask me before external integrations, migrations, deployment')
    expect(document.querySelectorAll('.prompt-art')).toHaveLength(6)
  })

  it('copies a prompt and reports clipboard failure', async () => {
    const user = userEvent.setup()
    render(<App />)
    const buttons = screen.getAllByRole('button', { name: 'Copy prompt' })
    expect(buttons).toHaveLength(6)
    await user.click(buttons[2])
    await expect(navigator.clipboard.readText()).resolves.toContain('Inspect my current app first')
    expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()

    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(new Error('blocked'))
    await user.click(buttons[2])
    expect(screen.getByText('Copy failed')).toBeInTheDocument()
    expect(screen.getAllByRole('status').some((element) => element.textContent?.includes('Select the prompt text and copy it manually.'))).toBe(true)
  })

  it('keeps verified models and all named resources', () => {
    render(<App />)
    for (const model of ['Claude Opus 5.5', 'Claude Sonnet 5.5', 'Claude Haiku 5.5']) {
      expect(screen.getByText(model)).toBeInTheDocument()
    }
    for (const resource of ['skills.sh', 'Taste Skill', 'Impeccable', 'Variant', 'Dribbble', 'Behance', 'Wispr Flow']) {
      expect(screen.getByRole('link', { name: resource })).toBeInTheDocument()
    }
  })

  it('guards against a return to card and panel layouts', () => {
    render(<App />)
    const classNames = [...document.querySelectorAll('[class]')].flatMap((element) => [...element.classList])
    expect(classNames.filter((name) => /card|panel|shell|tile|bento/i.test(name))).toEqual([])
    expect(document.querySelectorAll('.prompt-block')).toHaveLength(6)
    expect(document.querySelectorAll('.page-section')).toHaveLength(6)
  })

  it('uses the official Ential logo in the header and footer', () => {
    render(<App />)
    const logos = screen.getAllByRole('img', { name: 'Ential' })
    expect(logos).toHaveLength(2)
    expect(logos[0]).toHaveAttribute('src', '/brand/ential-black.svg')
    expect(logos[1]).toHaveAttribute('src', '/brand/ential-black.svg')
  })
})
