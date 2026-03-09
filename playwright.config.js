// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    headless: false,   // default headed for all browsers
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'safari',
    //   use: { ...devices['Desktop Safari'] }, // WebKit
    // },
  ],
});



module.exports = {
  reporter: [
    ['list'],
    ['allure-playwright']
  ],
  use: {
    headless: true,
    screenshot: 'only-on-failure'
  }
};