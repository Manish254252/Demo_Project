import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { RadioPage } from '../../src/pages/RadioPage';
import Data from '../env.json';

test.describe('Radio Resource Tests (smoke + negative)', () => {
  test('PW-SMOKE-RADIO-MONTHLY-LOAD Verify radio monthly resource loads', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    // Navigate to Radio
    await home.clickRadio();
    await radio.waitForPageLoad();

    // Click the Monthly Resource nav (footer/top nav may contain this link)
    await radio.clickMonthlyResourceNav();
    // wait a short time for resource content to render
    await radio.waitForPageLoad();

    // Accept either a URL that contains 'monthly' or visible resource content
    const urlOk = page.url().toLowerCase().includes('monthly') || page.url().toLowerCase().includes('resources');
    const resourceVisible = await page.locator('.resource_wrapper, .res_body, .res_product, #PROD-SFHBK').first().isVisible().catch(() => false);
    expect(urlOk || resourceVisible).toBeTruthy();
  });

  test('PW-SMOKE-RADIO-ARCHIVE-LIST Verify radio archives list visible', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.waitForPageLoad();

    await radio.clickArchivesNav();
    await radio.waitForPageLoad();

    expect(await radio.isArchiveListVisible()).toBe(true);
  });

  test('PW-SMOKE-RADIO-ARCHIVE-NAV Verify archive item navigation', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.waitForPageLoad();

    await radio.clickArchivesNav();
    await radio.waitForPageLoad();

    // Use the page-object helper to click the first archive link if present
    const beforeUrl = page.url();
    await radio.clickFirstArchiveItem();

    // If navigation happened, url should change or detail content should appear
    await page.waitForLoadState('load').catch(() => {});
    const afterUrl = page.url();
    if (afterUrl === beforeUrl) {
      // fallback: assert a detail/header appears on the page
      const detailVisible = await page.locator('.radio_title, h1, .res_product__top').first().isVisible().catch(() => false);
      expect(detailVisible).toBeTruthy();
    } else {
      expect(afterUrl).not.toBe(beforeUrl);
    }
  });

  test('PW-NEG-RADIO-EMPTY-ARCHIVE Verify empty archive state handling', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.waitForPageLoad();

    await radio.clickArchivesNav();
    await radio.waitForPageLoad();

    // If archive list is empty, site should show an empty-state message; otherwise skip because we can't force an empty filter
    const hasList = await radio.isArchiveListVisible();
    if (!hasList) {
      // try several common empty-state selectors / messages
      const emptyMsg = page.locator('text=/no (results|items)|no (archives|broadcasts)|nothing found|empty/i');
      const found = await emptyMsg.first().isVisible().catch(() => false);
      expect(found).toBeTruthy();
    } else {
      test.skip(true, 'Archive list contains items; cannot verify empty state without filters');
    }
  });

  test('PW-NEG-RADIO-404 Verify radio invalid URL returns 404', async ({ page }) => {
    // Construct a likely-invalid radio URL
    const invalidUrl = `${Data.RADIO_URL.replace(/\/$/, '')}/invalid-test-url`;
    await page.pause();
    // Attempt navigation and verify we either receive a 404 response or the page shows a 404 message
    const resp = await page.goto(invalidUrl).catch(() => null);
    if (resp) {
      expect([404, 410]).toContain(resp.status());
    } else {
      const bodyText = await page.locator('body').innerText().catch(() => '');
      expect(/404|not found|page not found/i.test(bodyText)).toBeTruthy();
    }
  });

});
