import { test, expect } from '@playwright/test';
import data  from "../env.json";
import { HomePage } from '@/pages/HomePage';






test.describe('Home Page Tests', () => {

  test('Verify homepage loads successfully', async ({ page }) => {
    const baseUrl = data.BASE_URL;
    await page.goto(baseUrl);
    const home = new HomePage(page);
    expect(await home.isHomeVisible()).toBe(true);
  });

  test('Verify navigation links are visible', async ({ page }) => {
    const baseUrl = data.BASE_URL;
    await page.goto(baseUrl);
    const home = new HomePage(page);
    await home.navigateThroughNavLinks();
  
  });

  test('Verify slider controls are visible', async ({ page }) => {
    const baseUrl = data.BASE_URL;
    await page.goto(baseUrl);
    const home = new HomePage(page);
    await home.clickHome();
    expect(await home.isSliderNextVisible()).toBe(true);
    expect(await home.isSliderPrevVisible()).toBe(true);
  });

  test('Verify slider navigation using next and prev', async ({ page }) => {
    const baseUrl = data.BASE_URL;
    await page.goto(baseUrl);
    const home = new HomePage(page);
    await home.clickHome();
    // Navigate slider forward and back; assert controls remain visible after each action
    await home.clickSliderNext();
    expect(await home.isSliderNextVisible()).toBe(true);
    expect(await home.isSliderPrevVisible()).toBe(true);
    await home.clickSliderPrev();
    expect(await home.isSliderNextVisible()).toBe(true);
    expect(await home.isSliderPrevVisible()).toBe(true);
    // Ensure controls remain visible after navigation
    expect(await home.isSliderNextVisible()).toBe(true);
    expect(await home.isSliderPrevVisible()).toBe(true);
  });

 test('Verify Search functionality', async ({ page }) => {
   const baseUrl = data.BASE_URL;
   await page.goto(baseUrl);
   const home = new HomePage(page);
   await home.search('test');
   expect(await home.isSearchResultsVisible()).toBe(true);
  });
});
