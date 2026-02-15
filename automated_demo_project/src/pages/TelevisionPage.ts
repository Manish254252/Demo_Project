import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import TelevisionLocators from '../Locators/TelevisionPageLocators.json';
import Data from '../../tests/env.json';

export class TelevisionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateToUrl('https://www.davidjeremiah.org/television');
    await this.waitForPageLoad();
  }

  async isPageVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(TelevisionLocators.PageHeading.locator));
  }
  async isSchedulePageVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(TelevisionLocators.ArchivesTab.locator));
  }

  async clickWatchNow(): Promise<void> {
    await this.clickElement(TelevisionLocators.WatchNow.locator);
    await this.waitForPageLoad();
  }

  async isMediaVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(TelevisionLocators.Media.locator));
  }

  async clickSchedule(): Promise<void> {
    await this.clickElement(TelevisionLocators.ScheduleLink.locator);
    await this.waitForPageLoad();
  }

  async isDaytimeVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(TelevisionLocators.DaytimeHeading.locator));
  }

  async isEpisodeListVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(TelevisionLocators.EpisodeList.locator));
  }

    async clickWeekendTab(): Promise<void> {
    await this.clickElement(TelevisionLocators.WeekendLocator.locator);
    await this.waitForPageLoad();
  }
  async isWeekendVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(TelevisionLocators.WeekendLocator.locator));
  }

  async clickMonthlyResource(): Promise<void> {
    await this.clickElement(TelevisionLocators.MonthlyResourceLink.locator);
    await this.waitForPageLoad();
  }
    async gotoMonthlyResource(): Promise<void> {
    await this.page.goto(Data.MONTHLY_RESOURCE_URL);
    await this.waitForPageLoad();
  }

  async isMonthlyResourceVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(TelevisionLocators.OrderNowBtn.locator));
  }

  async clickResourceCTA(): Promise<void> {
    await this.clickElement(TelevisionLocators.ResourceCTA.locator);
    await this.waitForPageLoad();
  }

}
