// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  
  /* ৬০ সেকেন্ড টাইমআউট */
  timeout: 60 * 1000,
  
  expect: {
    timeout: 15 * 1000,
  },

  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,

  /* HTML এবং Allure রিপোর্টার কনফিগারেশন */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { outputFolder: 'allure-results' }]
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    headless: false,
    launchOptions: {
      slowMo: 400,
      args: ['--disable-features=PasswordLeakDetection'], // Chrome-এর পাসওয়ার্ড পপ-আপ বন্ধ রাখবে
    },
    viewport: { width: 1280, height: 720 },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});