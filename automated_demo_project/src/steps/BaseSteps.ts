import { Page, expect } from '@playwright/test';
import { CombinedPages } from '../pages/DavidJeremiah';

export abstract class BaseSteps {
  protected page: Page;
  protected combinedPages: CombinedPages;

  constructor(page: Page, combinedPages: CombinedPages) {
    this.page = page;
    this.combinedPages = combinedPages;
  }

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    const actualTitle = await this.combinedPages.getTitle();
    expect(actualTitle).toBe(expectedTitle);
  }

  async verifyCurrentUrl(expectedUrl: string | RegExp): Promise<void> {
    const currentUrl = await this.combinedPages.getCurrentUrl();
    if (typeof expectedUrl === 'string') {
      expect(currentUrl).toBe(expectedUrl);
    } else {
      expect(currentUrl).toMatch(expectedUrl);
    }
  }

  async verifyElementIsVisible(locator: any): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async verifyElementText(locator: any, expectedText: string): Promise<void> {
    await expect(locator).toHaveText(expectedText);
  }

  async verifyElementContainsText(locator: any, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  async waitForPageLoad(): Promise<void> {
    await this.combinedPages.waitForPageLoad();
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.combinedPages.takeScreenshot(name);
  }
}