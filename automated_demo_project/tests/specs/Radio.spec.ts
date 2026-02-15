import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { RadioPage } from '../../src/pages/RadioPage';
import Data from '../env.json';

test.describe('Radio Resource Tests', () => {

  test('TC-RADIO-001 Verify monthly resource page loads', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.waitForPageLoad();
    await expect(page).toHaveURL(/radio/);
    expect(await radio.isPageVisible()).toBe(true);
  });

  test('TC-RADIO-002 Verify resource content displayed', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.waitForPageLoad();
    expect(await radio.hasResourceContent()).toBe(true);
  });

  test('TC-RADIO-003 Verify CTA button navigation', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.waitForPageLoad();
    await radio.clickCTA();
    await expect(page).toHaveURL(/radio/);
  });

  test('TC-RADIO-ARCH-001 Verify radio archives page loads', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.gotoArchives();
    expect(await radio.isArchiveListVisible()).toBe(true);
  });

  test('TC-RADIO-ARCH-002 Verify archive list exists', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.gotoArchives();
    expect(await radio.isArchiveListVisible()).toBe(true);
  });

  test('TC-RADIO-ARCH-003 Verify archive item clickable', async ({ page }) => {
    await page.goto(Data.BASE_URL);
    const radio = new RadioPage(page);
    const home = new HomePage(page);
    await home.clickRadio();
    await radio.gotoArchives();
    await radio.clickFirstArchiveItem();
    // After clicking an archive item expect to not be on the archive list URL
    await expect(page).not.toHaveURL(/radio\/archives/);
  });

});
