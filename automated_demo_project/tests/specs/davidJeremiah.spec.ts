import { test } from '../fixtures/test-base';
import { expect } from '@playwright/test';
import { CombinedPages } from '../../src/pages/DavidJeremiah';

test.describe('David Jeremiah Website - Combined Workflow Tests', () => {
  test.describe.configure({ timeout: 60000 }); // 60 seconds for all tests in this block
  test('Complete David Jeremiah website workflow using CombinedPages', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    
    await test.step('Navigate to splash page and skip to main site', async () => {
      await davidJeremiahPages.performSplashPageActions();
    });

    await test.step('Verify homepage elements and navigation', async () => {
      await davidJeremiahPages.performHomePageVerification();
    });

    await test.step('Navigate to book content and interact with Promise of Heaven', async () => {
      await davidJeremiahPages.performBookInteraction();
    });

    await test.step('Return to main page and verify homepage', async () => {
      await davidJeremiahPages.navigateToUrl();
      await davidJeremiahPages.waitForPageLoad();
      await davidJeremiahPages.verifyHomePage();
    });

    await test.step('Navigate to login and attempt authentication', async () => {
      await davidJeremiahPages.performLoginProcess('dkassenova@davidjeremiah.org', 'LaMesa123!');
    });

    await test.step('Final verification and cleanup', async () => {
      if (!page.isClosed()) {
        const currentUrl = await davidJeremiahPages.getCurrentUrl();
        expect(currentUrl).toContain('davidjeremiah.org');
        await davidJeremiahPages.takeScreenshot('workflow-completed');
      }
      console.log('✅ Complete automation workflow finished successfully!');
    });
  });

  test('Intentionally failing test for demo', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    
    await test.step('Navigate to homepage', async () => {
      await davidJeremiahPages.navigateToUrl();
      await davidJeremiahPages.waitForPageLoad();
    });

    await test.step('This step will fail', async () => {
      // This assertion will intentionally fail
      expect(1).toBe(2);
    });
  });
});