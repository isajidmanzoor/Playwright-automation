import { test } from '@playwright/test';

test('Mouse hover using mouse.move() — animated with exit', async ({ page }) => {
  // Ensure visible browser and consistent viewport for observation
  await page.setViewportSize({ width: 1280, height: 800 });

  // Try to navigate; if navigation fails we'll record the error and stop the test
  try {
    await page.goto('https://Smartlivingpakistan.com/', { waitUntil: 'load', timeout: 20000 });
  } catch (err) {
    // Save a small screenshot of the blank/errored page and rethrow so the test shows the failure
    await page.screenshot({ path: 'hover-goto-error.png' });
    throw err;
  }

  // Bring the page to front so the headed browser shows the cursor
  await page.bringToFront();

  // First element hover (animated with many steps so motion is visible)
  const element1 = await page.getByRole('link', { name: '12 Watt SMD Ceiling Light in' }).first();
  await element1.waitFor({ state: 'visible', timeout: 10000 });
  const box1 = await element1.boundingBox();
  await page.mouse.move(box1.x + box1.width / 2, box1.y + box1.height / 2, { steps: 30 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'hover-step-1.png' });

  // Move to second element with visible animation
  const element2 = page.getByRole('link', { name: '7 Watt LED Ceiling Light in' }).first();
  await element2.waitFor({ state: 'visible', timeout: 10000 });
  await element2.scrollIntoViewIfNeeded({ timeout: 10000 });
  const box2 = await element2.boundingBox();
  await page.mouse.move(box2.x + box2.width / 2, box2.y + box2.height / 2, { steps: 30 });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'hover-step-2.png' });

  // Move cursor to the bottom-right corner (exit/edge point), then to top-left
  const vp = page.viewportSize();
  if (vp) {
    await page.mouse.move(vp.width - 2, vp.height - 2, { steps: 40 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'hover-edge.png' });

    // Move off the main visible area to indicate an exit point (to 0,0)
    await page.mouse.move(0, 0, { steps: 40 });
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'hover-exit.png' });
  }
});


test.beforeEach(async ({ page }) => {
  // Ye har test se pehle automatically chalega
  await page.goto('https://smartlivingpakistan.com/');
});

test.afterEach(async ({ page }) => {
  // Ye har test ke baad automatically chalega
  await page.screenshot({ path: `screenshots/test-${Date.now()}.png` });
});

test('Test 1', async ({ page }) => {
  await page.click('text=Islamic Wall Art');
});

test('Test 2', async ({ page }) => {
  await page.click('text=Garden Lights');
});