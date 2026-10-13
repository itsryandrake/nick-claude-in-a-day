import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('renders the flat editorial note without overflow, broken assets or serious accessibility issues', async ({ page }, testInfo) => {
  const errors: string[] = []
  const failedResponses: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()) })
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => { if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`) })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Nick, here is what to build next/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'How the app goes live' })).toBeAttached()
  await expect(page.getByRole('heading', { name: 'Build next', exact: true })).toBeAttached()

  expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)).toBe(false)

  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    expect(await image.evaluate((element) => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true)
  }

  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')).toEqual([])
  expect(errors).toEqual([])
  expect(failedResponses).toEqual([])

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: `.impeccable/review/${testInfo.project.name}.png`, fullPage: true })
})

test('architecture is compact, ordered and accurate', async ({ page }) => {
  await page.goto('/')
  const flow = page.getByRole('list', { name: "Deployment path from Claude Code to Nick's app" })
  await expect(flow).toBeVisible()
  await expect(flow.getByRole('listitem')).toHaveCount(4)
  const summary = page.locator('.system-flow figcaption')
  await expect(summary).toContainText(/A commit records a version/i)
  await expect(summary).toContainText(/push sends it to GitHub/i)
  await expect(summary).toContainText(/GoDaddy DNS points the domain to Vercel/i)
  await expect(summary).toContainText(/Stripe is an optional integration/i)
})

test('copy control copies a safe prompt and shows feedback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  const familyPrompt = page.locator('.prompt-list .prompt-block').filter({ has: page.getByRole('heading', { name: 'Family' }) })
  await familyPrompt.getByRole('button', { name: 'Copy prompt' }).click()
  await expect(familyPrompt.getByRole('button', { name: 'Copied' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain("Inspect Nick's current app first")
})

test('required models, modules and resources are present', async ({ page }) => {
  await page.goto('/')
  for (const text of ['Claude Opus 5.5', 'Claude Sonnet 5.5', 'Claude Haiku 5.5', 'Family', 'Health & Fitness', 'Finances', 'Household & admin']) {
    await expect(page.getByText(text, { exact: true }).first()).toBeAttached()
  }
  for (const resource of ['skills.sh', 'Taste Skill', 'Impeccable', 'Variant', 'Dribbble', 'Behance', 'Wispr Flow']) {
    await expect(page.getByRole('link', { name: resource })).toBeAttached()
  }
  await expect(page.getByText(/Redbark trial ends Thursday/i)).toBeAttached()
})

test('key widths have no horizontal overflow or clipped editorial sections', async ({ page }) => {
  for (const width of [390, 768, 900, 901, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    expect(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), `horizontal overflow at ${width}px`).toBe(false)
    for (const section of ['.architecture', '.build-columns', '.prompts', '.models', '.references']) {
      const box = await page.locator(section).boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x, `${section} clipped left at ${width}px`).toBeGreaterThanOrEqual(-1)
      expect(box!.x + box!.width, `${section} clipped right at ${width}px`).toBeLessThanOrEqual(width + 1)
    }
  }
})

test('reduced motion is static and visible copy has no long dashes', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.locator('.hero')).toHaveCSS('animation-name', 'none')
  expect(await page.locator('body').innerText()).not.toMatch(/[\u2013\u2014]/)
  await context.close()
})
