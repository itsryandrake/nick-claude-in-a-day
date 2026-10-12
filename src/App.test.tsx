import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('Claude in a Day recap', () => {
  it('contains the workshop outcomes and Thursday action', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Claude artifacts' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Wispr Flow' })).toBeInTheDocument()
    expect(screen.getByText(/7-day trial ends Thursday/i)).toBeInTheDocument()
  })

  it('updates the architecture detail when a node is selected', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /GoDaddy.*Domain and DNS/i }))

    expect(screen.getByText(/Those records point the public domain to Vercel/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /GoDaddy.*Domain and DNS/i })).toHaveAttribute('aria-pressed', 'true')
  })

  it('links model guidance to official Anthropic notes', () => {
    render(<App />)
    const modelLinks = screen.getAllByRole('link', { name: 'Official model note' })
    expect(modelLinks).toHaveLength(2)
    expect(modelLinks[0]).toHaveAttribute('href', 'https://www.anthropic.com/claude-sonnet-5-5')
    expect(modelLinks[1]).toHaveAttribute('href', 'https://www.anthropic.com/claude-haiku-5-5')
  })
})
