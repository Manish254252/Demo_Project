import { test } from '../fixtures/test-base';
import { expect } from '@playwright/test';
import { CombinedPages } from '../../src/pages/DavidJeremiah';

test.describe('Login Page Tests', () => {
    test.describe.configure({ timeout: 60000 }); // 60 seconds for all tests in this block
  test('Successful Login', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    await davidJeremiahPages.performSplashPageActions();
    await davidJeremiahPages.performLoginProcess('dkassenova@davidjeremiah.org', 'LaMesa123!');
    await davidJeremiahPages.waitForTime(5000); // Wait for 5 seconds to ensure login is processed
    await davidJeremiahPages.verifySuccessfulLogin();
});

  test('Failed Login', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    await davidJeremiahPages.performSplashPageActions();
    await davidJeremiahPages.performLoginProcess('senova@davidjeremiah.org', 'LaMesa123!');
    await davidJeremiahPages.verifyInvalidLoginError();
  });
});