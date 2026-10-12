import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test('renders without overflow, console errors or serious accessibility issues', async ({ page }, testInfo) => {
  const errors: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') errors.push(message.text())
  })
  page.on('pageerror', (error) => errors.push(error.message))

  await page.goto('/')
  await expect(page.getByRole('heading', { name: /From a day with Claude/i })).toBeVisible()
  await page.waitForTimeout(750)

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth)
  expect(overflow).toBe(false)

  await page.getByRole('button', { name: /GoDaddy.*Domain and DNS/i }).click()
  await expect(page.getByText(/GoDaddy does not deploy the app/i)).toBeVisible()

  const results = await new AxeBuilder({ page }).analyze()
  const blockers = results.violations.filter((violation) => violation.impact === 'critical' || violation.impact === 'serious')
  expect(blockers).toEqual([])
  expect(errors).toEqual([])

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

test('architecture nodes stay separate around responsive breakpoints', async ({ page }) => {
  for (const width of [900, 1239, 1241]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    const boxes = await Promise.all([
      page.getByRole('button', { name: /Vercel.*Hosting and deployments/i }).boundingBox(),
      page.getByRole('button', { name: /The app.*What people use/i }).boundingBox(),
    ])
    expect(boxes[0]).not.toBeNull()
    expect(boxes[1]).not.toBeNull()
    const overlap = !(
      boxes[0]!.x + boxes[0]!.width <= boxes[1]!.x ||
      boxes[1]!.x + boxes[1]!.width <= boxes[0]!.x ||
      boxes[0]!.y + boxes[0]!.height <= boxes[1]!.y ||
      boxes[1]!.y + boxes[1]!.height <= boxes[0]!.y
    )
    expect(overlap).toBe(false)
  }
})
