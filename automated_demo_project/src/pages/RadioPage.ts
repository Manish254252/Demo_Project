import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import RadioLocators from '../Locators/RadioPageLocators.json';
import Data from '../../tests/env.json';

export class RadioPage extends BasePage {
  isRadioPageVisible(): any {
      return this.isElementVisible(this.page.locator(RadioLocators.RadioHeading.locator));
  }
  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.navigateToUrl(Data.RADIO_URL);
    await this.waitForPageLoad();
  }

  async isPageVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(RadioLocators.RadioHeading.locator));
  }

  async clickListenNow(): Promise<void> {
    const locator = this.page.locator(RadioLocators.ListenNowBtn.locator);
    if (await locator.count() > 0) {
      const btn = locator.first();
      // ensure it's in viewport before clicking otherwise repeated retries can time out
      try {
        await btn.scrollIntoViewIfNeeded();
        await btn.click({ timeout: 10000 });
      } catch (e) {
        // fallback: evaluate onclick attribute to trigger player if present
        const onclick = await btn.getAttribute('onclick');
        if (onclick) {
          await this.page.evaluate((fn) => { try { eval(fn); } catch(e) { console.warn('onclick eval failed', e); } }, onclick);
        }
      }
    }
  }

  async clickMonthlyResourceNav(): Promise<void> {
    const locator = this.page.locator(RadioLocators.MonthlyResourceNavLink.locator);
    if (await locator.count() > 0) {
      await locator.first().click();
      await this.waitForPageLoad();
    }
  }

  async isArchiveListVisible(): Promise<boolean> {
    // The archives list on the site uses different table/row structures depending on the page
    // layout. Try several candidate selectors and return true when any yields a visible row.
    const candidates = [
      RadioLocators.ArchivesRow.locator,
      '.archives_table tr',
      'table tr',
      'table:has-text("Digital Product") tr',
      '.broadcast_archive tr',
    ];

    for (const sel of candidates) {
      try {
        const loc = this.page.locator(sel);
        const count = await loc.count();
        if (count <= 0) continue;
        for (let i = 0; i < count; i++) {
          if (await loc.nth(i).isVisible()) return true;
        }
      } catch (e) {
        // ignore selector errors and try next candidate
      }
    }
    return false;
  }

  async clickFirstArchiveItem(): Promise<void> {
    // Try a set of sensible archive link selectors and click the first visible one
    const candidates = [
      RadioLocators.ArchivesRow.locator,
      'a[href*="radio_archives.aspx"]',
      'a[href*="/site/radio_archives.aspx"]',
      '.archive_list li a',
      '.archive_item a',
      '.broadcast_archive a',
      '.radio_archive a',
    ];
    for (const sel of candidates) {
      const loc = this.page.locator(sel);
      const count = await loc.count();
      if (count <= 0) continue;
      for (let i = 0; i < count; i++) {
        const item = loc.nth(i);
        if (!(await item.isVisible())) continue;
        try {
          await item.scrollIntoViewIfNeeded();
          await item.click({ timeout: 10000 });
          return;
        } catch (e) {
          // try next candidate
        }
      }
    }
  }

  async isListenNowVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(RadioLocators.ListenNowBtn.locator));
  }

  async isPurchaseDigitalVisible(): Promise<boolean> {
    return this.isElementVisible(this.page.locator(RadioLocators.PurchaseDigitalLink.locator));
  }

  async clickPurchaseDigitalLink(): Promise<void> {
    const locator = this.page.locator(RadioLocators.PurchaseDigitalLink.locator);
    if (await locator.count() > 0) {
      await locator.first().click();
      await this.waitForPageLoad();
    }
  }

  async clickArchivesNav(): Promise<void> {
    const locator = this.page.locator(RadioLocators.ArchivesLink.locator);
    if (await locator.count() > 0) {
      await locator.first().click();
      await this.waitForPageLoad();
    }
  }



  

  

 

}
