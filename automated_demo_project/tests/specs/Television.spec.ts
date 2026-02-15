import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { TelevisionPage } from '../../src/pages/TelevisionPage';
import Data from '../env.json';

test.describe('Television Page Tests', () => {

    test('TC-TV-001 Verify television page loads', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.waitForPageLoad();
        expect(await tv.isPageVisible()).toBe(true);
    });

    test('TC-TV-002 Verify Watch Now CTA', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.waitForPageLoad();
        await tv.clickWatchNow();
        expect(await tv.isMediaVisible()).toBe(true);
    });

    test('TC-TV-003 Verify broadcast schedule link', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.clickSchedule();
        await tv.waitForPageLoad();
        expect(await tv.isSchedulePageVisible()).toBe(true);
    });

    test('TC-TV-DAY-001 Verify daytime TV page loads', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.navigateToUrl(Data.DAYTIME_URL);
        await tv.waitForPageLoad();
        expect(await tv.isDaytimeVisible()).toBe(true);
    });

    test('TC-TV-DAY-002 Verify episode list visible', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.navigateToUrl(Data.DAYTIME_URL);
        await tv.waitForPageLoad();
        expect(await tv.isEpisodeListVisible()).toBe(true);
    });

    test('TC-TV-WKND-001 Verify weekend TV page loads', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.waitForPageLoad();
        await tv.clickWeekendTab();
        expect(await tv.isWeekendVisible()).toBe(true);
    });

    test('TC-TV-WKND-002 Verify weekend content exists', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.waitForPageLoad();
        await tv.waitForPageLoad();
        await tv.clickWeekendTab();
        expect(await tv.isMediaVisible()).toBe(true);
    });

    test('TC-TV-MONTH-001 Verify TV monthly resource loads', async ({ page }) => {
        await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.gotoMonthlyResource();
        expect(await tv.isMonthlyResourceVisible()).toBe(true);
    });

    test('TC-TV-MONTH-002 Verify resource CTA', async ({ page }) => {
        await page.goto(Data.BASE_URL);
       await page.goto(Data.BASE_URL);
        const tv = new TelevisionPage(page);
        const home = new HomePage(page);
        await home.clickTelevision();
        await tv.clickMonthlyResource();
        expect(await tv.isMonthlyResourceVisible()).toBe(true);
    });

});