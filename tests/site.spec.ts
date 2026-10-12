import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('renders without overflow, failed assets, console errors or serious accessibility issues', async ({ page }, testInfo) => {
  const errors: string[] = []
  const failedAssets: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('response', (response) => {
    if (response.status() >= 400) failedAssets.push(`${response.status()} ${response.url()}`)
  })

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /Nick, here’s what we can build next/i })).toBeVisible()
  await expect(page.getByRole('img', { name: 'Ential' }).first()).toBeVisible()
  await page.waitForTimeout(250)

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)

  await page.getByRole('button', { name: /GoDaddy.*Controls the domain and DNS/i }).click()
  await expect(page.getByText(/Those records point the public domain to Vercel/i)).toBeVisible()

  const results = await new AxeBuilder({ page }).analyze()
  const blockers = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
  expect(blockers).toEqual([])
  expect(errors).toEqual([])
  expect(failedAssets).toEqual([])

  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur()
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(100)
  await page.screenshot({
    path: testInfo.project.name === 'mobile' ? '.impeccable/review/mobile.png' : '.impeccable/review/desktop.png',
    fullPage: true,
  })
})

test('reduced motion removes authored animation', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  const animationName = await page.locator('.hero-copy').evaluate((element) => getComputedStyle(element).animationName)
  expect(animationName).toBe('none')
  await context.close()
})

test('normal motion loads visibly and stays accessible', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'no-preference', viewport: { width: 1440, height: 1000 } })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.locator('.hero-copy')).toHaveCSS('animation-name', 'hero-in')
  await expect(page.locator('.hero-flow')).toHaveCSS('animation-name', 'flow-in')
  await page.waitForTimeout(800)
  await expect(page.getByRole('heading', { name: /Nick, here’s what we can build next/i })).toBeVisible()
  const results = await new AxeBuilder({ page }).analyze()
  const blockers = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
  expect(blockers).toEqual([])
  await context.close()
})

test('layout stays intact at breakpoint edges', async ({ page }) => {
  for (const width of [767, 768, 899, 900, 1179, 1180, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
    expect(overflow, `horizontal overflow at ${width}px`).toBe(false)
    await expect(page.getByRole('button', { name: /Vercel.*Builds and hosts the site/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /The app.*What people open and use/i })).toBeVisible()
  }
})

test('architecture can be used from the keyboard', async ({ page }) => {
  await page.goto('/')
  const claude = page.getByRole('button', { name: /Claude Code.*Builds in the local project/i })
  await claude.focus()
  await expect(claude).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(claude).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText(/Claude Code edits the local project/i)).toBeVisible()
})

test('delivery paths stay explicit at desktop and mobile widths', async ({ page }) => {
  for (const width of [390, 1180, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.getByRole('group', { name: 'Build path from Claude Code to the app' })).toBeVisible()
    await expect(page.getByRole('group', { name: 'Domain path from GoDaddy to Vercel' })).toBeVisible()
    await expect(page.getByText('GoDaddy DNS points to Vercel', { exact: true })).toBeVisible()
  }
})
