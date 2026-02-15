/* eslint-disable @typescript-eslint/no-unused-vars */
import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';

export class BasePage {
  
  async waitForTime(arg0: number) {
      await this.page.waitForTimeout(arg0);
  }
  
  protected page: Page;
  private readonly baseUrl: string = 'https://www.davidjeremiah.org/';

  // Element locators - organized by page type
  private readonly splashElements = {
    skipButton: () => this.page.locator('[data-testid="skip-button"]')
      .or(this.page.locator('text="Skip"'))
      .or(this.page.locator('button:has-text("Skip")'))
      .or(this.page.locator('text="SKIP AND GO TO DAVIDJEREMIAH.ORG"'))
  };



  

  constructor(page: Page) {
    this.page = page;
  }

  // ================================
  // BASE PAGE FUNCTIONALITY
  // ================================

  async navigateToUrl(url?: string): Promise<void> {
    const targetUrl = url || this.baseUrl;
    await this.page.goto(targetUrl);
  }

  async waitForPageLoad(timeout: number = 30000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
  }

  async waitForElement(locator: string | Locator, timeout: number = 30000): Promise<void> {
    if (typeof locator === 'string') {
      await this.page.locator(locator).waitFor({ state: 'visible', timeout });
    } else {
      await locator.waitFor({ state: 'visible', timeout });
    }
  }

  async clickElement(locator: string): Promise<void> {
    const loc = this.page.locator(locator).first();
    await this.waitForElement(loc);
    await loc.click();
  }

  async fillInput(locator: string, text: string): Promise<void> {
    await this.waitForElement(locator);
    await this.page.locator(locator).fill(text);
  }

  async getText(locator: string): Promise<string> {
    await this.waitForElement(locator);
    return await this.page.locator(locator).textContent() || '';
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async takeScreenshot(name: string): Promise<Buffer | null> {
    try {
      if (this.page.isClosed()) {
        console.log(`Cannot take screenshot '${name}' - page is closed`);
        return null;
      }
      return await this.page.screenshot({ path: `screenshots/${name}.png` });
    } catch (error: any) {
      console.log(`Failed to take screenshot '${name}':`, error.message);
      return null;
    }
  }

  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async waitForUrl(urlPattern: string | RegExp, timeout: number = 30000): Promise<void> {
    await this.page.waitForURL(urlPattern, { timeout });
  }

  // ================================
  // SPLASH PAGE FUNCTIONALITY
  // ================================

  async performSplashPageActions(): Promise<void> {
    await this.page.goto(`${this.baseUrl}`);
    // await this.page.waitForTimeout(15000);
    await this.page.waitForLoadState('domcontentloaded');
    // Wait for potential animations
    await this.waitForPageLoad();
    
    // Try to click skip button if present
    try {
      await this.clickSkipButton();
      await this.waitForPageLoad();
    } catch (error) {
      console.log('Skip button not found, may already be on main site');
    }
  }

  async clickSkipButton(): Promise<void> {
   await this.splashElements.skipButton().click();
  }

 

  

  





  
    

    

}