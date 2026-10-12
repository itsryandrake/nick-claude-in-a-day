import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Claude in a Day recap', () => {
  it('contains every workshop outcome and the Thursday action', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Claude artifacts' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Wispr Flow' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'GIS onboarding' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Finance and personal view' })).toBeInTheDocument()
    expect(screen.getByText(/7-day trial ends Thursday/i)).toBeInTheDocument()
  })

  it('updates the architecture detail when a node is selected', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /GoDaddy.*Controls the domain and DNS/i }))

    expect(screen.getByText(/Those records point the public domain to Vercel/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /GoDaddy.*Controls the domain and DNS/i })).toHaveAttribute('aria-pressed', 'true')
  })

  it('keeps the model guidance and source links', () => {
    render(<App />)
    const modelLinks = screen.getAllByRole('link', { name: /Read Anthropic's model note/i })
    expect(modelLinks).toHaveLength(2)
    expect(modelLinks[0]).toHaveAttribute('href', 'https://www.anthropic.com/claude-sonnet-5-5')
    expect(modelLinks[1]).toHaveAttribute('href', 'https://www.anthropic.com/claude-haiku-5-5')
    expect(screen.getByRole('link', { name: /Browse Skills at skills.sh/i })).toHaveAttribute('href', 'https://skills.sh/')
    expect(screen.getByRole('link', { name: /Taste Skill/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Impeccable/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Variant/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Dribbble/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Behance/i })).toBeInTheDocument()
    expect(screen.getByText(/Use it for well-scoped everyday work/i)).toBeInTheDocument()
    expect(screen.getByText(/Use it for fast, high-volume/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Claude Code subagents' })).toBeInTheDocument()
    expect(screen.getByText(/Build path: Claude Code prepares source for GitHub/i)).toBeInTheDocument()
  })

  it('uses the local Ential logo in the header and footer', () => {
    render(<App />)
    const logos = screen.getAllByRole('img', { name: 'Ential' })
    expect(logos).toHaveLength(2)
    expect(logos[0]).toHaveAttribute('src', '/brand/ential-black.svg')
    expect(logos[1]).toHaveAttribute('src', '/brand/ential-black.svg')
  })
})
