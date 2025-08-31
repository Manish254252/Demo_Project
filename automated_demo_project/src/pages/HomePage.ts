import { HomeSteps } from '../steps/HomeSteps';
import HomepageLocators from '../Locators/HomePageLocators.json';
import { expect, Page, Locator } from '@playwright/test';

export class HomePage {
 async assertSubscriptionErrorMsg() {
    // await this.page.locator(HomepageLocators.SubscriptionErrorMsg.locator).scrollIntoViewIfNeeded();
   await expect(this.page.locator(HomepageLocators.SubscriptionErrorMsg.locator)).toContainText("Please enter a valid email address");
   console.log(await this.page.locator(HomepageLocators.SubscriptionErrorMsg.locator).textContent());

 }
 async subscribeToNewsletter(arg0: string) {
   await this.page.fill(HomepageLocators.SubscriptionInput.locator, arg0);
 }
 async assertSubscriptionSuccessMsg() {
    // await this.page.locator(HomepageLocators.SubscriptionSuccessMsg.locator).scrollIntoViewIfNeeded();
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
  constructor(private page: Page) {
    this.page = page;
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
}
