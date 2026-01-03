import { test, expect } from '@playwright/test';

test.describe('Brutalist Design System', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Navbar should have thick borders', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toHaveCSS('border-bottom-width', '3px');
    await expect(nav).toHaveCSS('border-bottom-color', 'rgb(0, 0, 0)');
  });

  test('Hero Text should be massive', async ({ page }) => {
    const heading = page.locator('h1');
    // Check if font size is large (e.g., greater than 40px)
    const fontSize = await heading.evaluate((el) => {
      return window.getComputedStyle(el).fontSize;
    });
    console.log('Hero Font Size:', fontSize);
    expect(parseInt(fontSize)).toBeGreaterThan(40);
  });

  test('Grid Lines should be visible', async ({ page }) => {
    // Check if the hero section has the black border
    const heroSection = page.locator('section').first();
    await expect(heroSection).toHaveCSS('border-bottom-width', '3px');
  });
});
