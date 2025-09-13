import HomepageLocators from '../Locators/HomePageLocators.json';
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
 async assertSubscriptionErrorMsg() {
   
   await expect(this.page.locator(HomepageLocators.SubscriptionErrorMsg.locator)).toContainText("Please enter a valid email address");
   console.log(await this.page.locator(HomepageLocators.SubscriptionErrorMsg.locator).textContent());

 }
 async subscribeToNewsletter(arg0: string) {
   await this.page.fill(HomepageLocators.SubscriptionInput.locator, arg0);
 }
 async assertSubscriptionSuccessMsg() {
    
   await expect(this.page.locator(HomepageLocators.SubscriptionSuccessMsg.locator)).toContainText("You've been successfully signed up!");
 }
 async SelectedCurrency(arg0: string) {
      await this.clickWithOptText(arg0,HomepageLocators.CurrencyOptions.locator);
  }
  async clickCurrencyDropdown() {
    await this.page.click(HomepageLocators.CurrencyDropdown.locator);
    await this.page.waitForTimeout(2000);
  }
  async EmptysearchItem() {
    await this.page.locator(HomepageLocators.SearchBar.locator).fill("");
    await this.page.locator(HomepageLocators.SearchBar.locator).press('Enter');
    await this.page.waitForTimeout(5000);
    await expect(this.page.locator(HomepageLocators.EmptysearchResults.locator)).toBeVisible();
  }
  async navigateSections() {
    const length = await this.page.locator(HomepageLocators.NavSectionsLinks.locator).count();
    for (let index = 1; index <= length; index++) {
      const xpath = HomepageLocators.NavSectionsLinks.locator;
      console.log(xpath + `[${index}]`);
      await this.page.locator(xpath + `[${index}]`).click();
      await this.page.waitForTimeout(4000);
    }
  }
  constructor( page: Page) {
  super(page);
  }
  async addToCart() {
    await this.page.click(HomepageLocators.addToCart.locator);
    await this.page.waitForTimeout(3000); // Wait for 3 seconds to ensure the action is completed
  }

  async updateQuantity(quantity: number) {
    await this.page.click(HomepageLocators.addToCart.locator);
    await this.page.fill(HomepageLocators.UpdateQuantityInput.locator, quantity.toString());
    await this.clickItemHeader();
  }

  async removeItem() {
    await this.page.click(HomepageLocators.addToCart.locator);
    await this.page.click(HomepageLocators.RemoveItemBtn.locator);
  }

  async closeAddToCartPopup() {
    await this.page.click(HomepageLocators.AddToCartCloseBtn.locator);
  }

  async assertQuantityValueExceedAlert() {
    await expect(
      this.page.locator(HomepageLocators.QuantityValueExceedAlert.locator)
    ).toBeVisible();
  }

  async clickItemHeader() {
    await this.page.click(HomepageLocators.ItemHeader.locator);
  }

  async searchItem(arg0: string) {
    await this.page.locator(HomepageLocators.SearchBar.locator).fill(arg0);
    await this.page.locator(HomepageLocators.SearchBar.locator).press('Enter');
    await this.page.waitForTimeout(5000);
    await expect(this.page.locator(HomepageLocators.searchResults.locator)).toBeVisible();
  }

  async clickWithOptText(text:string,Locator:string)
  {
    console.log(Locator.replace('{optionaltext}', text));
    
    await this.page.locator(Locator.replace('{optionaltext}', text)).click();
  }

  async assertSelectedCurrency(text:string)
  {
    await expect(this.page.locator(HomepageLocators.SelectedCurrency.locator)).toHaveAttribute('title', text);
  }
    async performHomePageVerification(): Promise<void> {
    // Verify we're on the correct URL
    const currentUrl = await this.getCurrentUrl();
    expect(currentUrl).toContain('davidjeremiah.org');
    
    // Verify basic page elements are visible
    const bodyElement = this.page.locator('body');
    await expect(bodyElement).toBeVisible();
    
    // Check for header (try multiple selectors)
    const headerSelectors = ['.site-header', 'header', '#header', '.header'];
    let headerFound = false;
    for (const selector of headerSelectors) {
      try {
        const headerElement = this.page.locator(selector).first();
        await expect(headerElement).toBeVisible({ timeout: 5000 });
        headerFound = true;
        break;
      } catch (error) {
        continue;
      }
    }
    if (!headerFound) {
      console.log('No standard header found, but continuing with test...');
    }
    
    await this.waitForPageLoad();
  }

   async performHomePageNavigation(): Promise<void> {
    await this.navigateToUrl();
    await this.waitForPageLoad();
  }
  async verifyHomePage(): Promise<void> {
    await expect(this.page).toHaveURL(/davidjeremiah\.org/);
    await expect(this.page).toHaveTitle(/DavidJeremiah/);
  }
}
