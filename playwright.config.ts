import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1000 }, colorScheme: 'light', reducedMotion: 'reduce' } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, colorScheme: 'light', reducedMotion: 'reduce', isMobile: true, hasTouch: true, deviceScaleFactor: 2 } },
  ],
})
