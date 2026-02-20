import { test, expect } from '@playwright/test';
import path from 'path';

const fileToUpload = path.join(process.cwd(), 'uploads', 'image.jpeg');

test('should upload a file successfully', async ({ page }) => {
  await page.goto('https://practice.expandtesting.com/upload');

  await page.getByTestId('file-input').setInputFiles(fileToUpload);

  // Wait for 10 seconds
  await page.waitForTimeout(10000);

  await page.getByTestId('file-submit').click();

  // Check for upload confirmation
  await expect(page.locator('h1:has-text("File Uploaded!")'))
    .toBeVisible({ timeout: 20000 }); // Wait up to 20 seconds for the element
}, { timeout: 60000 }); // Increase the test timeout to 60 seconds
