import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('renders the revised page without overflow, broken assets or serious accessibility issues', async ({ page }, testInfo) => {
  const errors: string[] = []
  const failedResponses: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) failedResponses.push(`${response.status()} ${response.url()}`)
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Nick, this is what to build next/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: /Sell the plugins and improve the product/i })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Baby profile' })).toBeVisible()

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)

  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded()
    await expect(image).toBeVisible()
    expect(await image.evaluate((element) => (element as HTMLImageElement).complete && (element as HTMLImageElement).naturalWidth > 0)).toBe(true)
  }

  const results = await new AxeBuilder({ page }).analyze()
  const blockers = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
  expect(blockers).toEqual([])
  expect(errors).toEqual([])
  expect(failedResponses).toEqual([])

  await page.evaluate(() => window.scrollTo(0, 0))
  await page.screenshot({ path: `.impeccable/review/${testInfo.project.name}.png`, fullPage: true })
})

test('architecture remains accurate and works with keyboard input', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('group', { name: 'Core deployment path from Claude Code to the live app' })).toBeVisible()
  const stripe = page.getByRole('button', { name: /Stripe.*Optional checkout/i })
  await stripe.focus()
  await expect(stripe).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(stripe).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText(/not part of the core deployment chain/i)).toBeVisible()
  await expect(page.getByText(/A commit creates a local version/i)).toBeAttached()
  await expect(page.getByText(/A push sends commits to GitHub/i)).toBeAttached()
})

test('copy controls copy safe prompts and show feedback', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/')
  const firstCopy = page.getByRole('button', { name: 'Copy prompt' }).first()
  await firstCopy.click()
  await expect(page.getByRole('button', { name: 'Copied' })).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('Inspect the existing DSQ project first')
})

test('model names, baby categories and required resources are present', async ({ page }) => {
  await page.goto('/')
  for (const heading of ['Claude Opus 5.5', 'Claude Sonnet 5.5', 'Claude Haiku 5.5', 'Before birth', 'Once born', 'Family record', 'Milestones']) {
    await expect(page.getByRole('heading', { name: heading })).toBeAttached()
  }
  for (const resource of ['Taste Skill', 'Impeccable', 'Variant', 'Dribbble', 'Behance']) {
    await expect(page.getByRole('link', { name: new RegExp(resource, 'i') })).toBeAttached()
  }
  await expect(page.getByRole('link', { name: /Open Wispr Flow/i })).toBeAttached()
  await expect(page.getByText(/Redbark trial ending Thursday/i)).toBeAttached()
})

test('responsive layouts have no horizontal overflow at key widths', async ({ page }) => {
  for (const width of [390, 767, 768, 1079, 1080, 1081, 1279, 1280, 1281, 1379, 1380, 1381, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow, `horizontal overflow at ${width}px`).toBe(false)
    const map = await page.locator('.architecture-map').boundingBox()
    expect(map).not.toBeNull()
    for (const node of [
      page.getByRole('button', { name: /Vercel.*Build and deploy/i }),
      page.getByRole('button', { name: /Live app.*Open the published site/i }),
    ]) {
      await expect(node).toBeVisible()
      const box = await node.boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x, `node clipped on the left at ${width}px`).toBeGreaterThanOrEqual(map!.x - 1)
      expect(box!.x + box!.width, `node clipped on the right at ${width}px`).toBeLessThanOrEqual(map!.x + map!.width + 1)
    }
    for (const section of ['.recap', '.models', '.references']) {
      const box = await page.locator(section).boundingBox()
      expect(box).not.toBeNull()
      expect(box!.x + box!.width, `${section} clipped at ${width}px`).toBeLessThanOrEqual(width + 1)
    }
  }
})

test('reduced motion is static, normal motion runs and visible copy has no long dashes', async ({ browser }) => {
  const reducedContext = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const reducedPage = await reducedContext.newPage()
  await reducedPage.goto('http://127.0.0.1:4173/')
  await expect(reducedPage.locator('.hero-copy')).toHaveCSS('animation-name', 'none')
  const visibleText = await reducedPage.locator('body').innerText()
  expect(visibleText).not.toMatch(/[–—]/)
  await reducedContext.close()

  const normalContext = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 1000 } })
  const normalPage = await normalContext.newPage()
  await normalPage.goto('http://127.0.0.1:4173/')
  await expect(normalPage.locator('.hero-copy')).toHaveCSS('animation-name', 'hero-in')
  await expect(normalPage.locator('.hero-flow')).toHaveCSS('animation-name', 'flow-in')
  await normalContext.close()
})
