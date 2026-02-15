import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import RadioLocators from '../Locators/RadioPageLocators.json';
import Data from '../../tests/env.json';

export class RadioPage extends BasePage {
  isRadioPageVisible(): any {
      return this.isElementVisible(this.page.locator(RadioLocators.RadioPageTitle.locator));
  }
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateToUrl(Data.RADIO_URL);
    await this.waitForPageLoad();
  }

  async isPageVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(RadioLocators.RadioPageTitle.locator));
  }



  

  

 

}
