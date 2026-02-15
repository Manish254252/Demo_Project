import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import RadioLocators from '../Locators/RadioPageLocators.json';

export class RadioPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateToUrl('https://www.davidjeremiah.org/radio');
    await this.waitForPageLoad();
  }

  async isPageVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(RadioLocators.PageHeading.locator));
  }

  async hasResourceContent(): Promise<boolean> {
    const title = this.page.locator(RadioLocators.ResourceTitle.locator).first();
    const image = this.page.locator(RadioLocators.ResourceImage.locator).first();
    return (await this.isElementVisible(title)) && (await this.isElementVisible(image));
  }

  async clickCTA(): Promise<void> {
    await this.clickElement(RadioLocators.CTA.locator);
    await this.waitForPageLoad();
  }

  async gotoArchives(): Promise<void> {
    // try to follow obvious archive link or fallback to /radio/archives
    const link = this.page.locator(RadioLocators.ArchivesPath.locator).first();
    if (await this.isElementVisible(link)) {
      await link.click();
      await this.waitForPageLoad();
    } else {
      await this.navigateToUrl('https://www.davidjeremiah.org/radio/archives');
      await this.waitForPageLoad();
    }
  }

  async isArchiveListVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(RadioLocators.ArchiveList.locator));
  }

  async clickFirstArchiveItem(): Promise<void> {
    await this.clickElement(RadioLocators.ArchiveItemLink.locator);
    await this.waitForPageLoad();
  }

}
