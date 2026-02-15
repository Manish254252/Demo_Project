import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { MagazinePage } from '../../src/pages/MagazinePage';

test.describe('Magazine Signup Tests', () => {

  test('TC-MAG-001 Verify magazine signup page loads', async ({ page }) => {
    const home = new HomePage(page);
    await home.clickMagazine();
    const mag = new MagazinePage(page);
    await mag.waitForPageLoad();
    await expect(page).toHaveURL(/magazine/);
    expect(await mag.isPageVisible()).toBe(true);
  });

  test('TC-MAG-002 Verify email input validation', async ({ page }) => {
    const mag = new MagazinePage(page);
    await mag.goto();
    await mag.fillEmail('invalid-email');
    await mag.submit();
    expect(await mag.isInlineErrorVisible()).toBe(true);
  });

  test('TC-MAG-003 Verify successful signup flow', async ({ page }) => {
    const mag = new MagazinePage(page);
    await mag.goto();
    const testEmail = `test+mag${Date.now()}@example.com`;
    await mag.fillEmail(testEmail);
    await mag.submit();
    expect(await mag.isSuccessVisible()).toBe(true);
  });

});
