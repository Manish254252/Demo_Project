import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import MagazineLocators from '../Locators/MagazinePageLocators.json';

export class MagazinePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateToUrl('https://www.davidjeremiah.org/magazine');
    await this.waitForPageLoad();
  }

  async isPageVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(MagazineLocators.PageHeading.locator));
  }

  async fillEmail(email: string): Promise<void> {
    await this.fillInput(MagazineLocators.EmailInput.locator, email);
  }

  async submit(): Promise<void> {
    // Prefer clicking submit button if present, otherwise press Enter in the email field
    const btn = this.page.locator(MagazineLocators.SubmitBtn.locator).first();
    if (await this.isElementVisible(btn)) {
      await btn.click();
    } else {
      await this.page.locator(MagazineLocators.EmailInput.locator).press('Enter');
    }
    await this.waitForPageLoad();
  }

  async isInlineErrorVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(MagazineLocators.InlineError.locator));
  }

  async isSuccessVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(MagazineLocators.SuccessMsg.locator));
  }

}
