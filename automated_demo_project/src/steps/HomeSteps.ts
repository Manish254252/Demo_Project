import { Page } from '@playwright/test';
import { BaseSteps } from './BaseSteps';
import { CombinedPages } from '../pages/DavidJeremiah';

// HomeSteps provides page interaction methods for the David Jeremiah homepage
export class HomeSteps extends BaseSteps {
  constructor(page: Page) {
    super(page, new CombinedPages(page));
  }

  async navigateToHomePage(): Promise<void> {
    await this.combinedPages.navigateToUrl();
    await this.waitForPageLoad();
  }

  async verifyHomePageElements(): Promise<void> {
    await this.combinedPages.performHomePageVerification();
  }

  async clickLoginLink(): Promise<void> {
    await this.combinedPages.clickLoginLink();
  }

  async clickPromiseOfHeavenImage(): Promise<void> {
    await this.combinedPages.clickPromiseOfHeavenImage();
  }

  async clickPreorderTodayButton(): Promise<void> {
    await this.combinedPages.clickPreorderTodayButton();
  }
}