import { Page } from '@playwright/test';
import { BasePage } from './BasePage';
import MagazineLocators from '../Locators/MagazinePageLocators.json';
import { generateUser } from '@/utils/TestData';
import { Address } from '@utils/types';

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

  // -------------------------
  // STEP 1
  // -------------------------
  async fillStep1() {
    const user = generateUser();

    await this.fillInput('#input_3mag_firstname', user.firstName);
    await this.fillInput('#input_3mag_lastname', user.lastName);
    await this.fillInput('#input_3mag_email', user.email);

    await this.page.locator('.btn-submit', { hasText: 'Continue' }).click();

    await this.page.locator('#input_3mag_address').waitFor({ state: 'visible' });

    return user;
  }

  // -------------------------
  // STEP 2
  // -------------------------
  async fillStep2(address?: Address) {
    const addr: Address = {
      country: address?.country ?? 'United States of America',
      street: address?.street ?? '123 Main Street',
      line2: address?.line2 ?? '',
      city: address?.city ?? 'Dallas',
      state: address?.state ?? 'TX',
      postalCode: address?.postalCode ?? '75001'
    };

    await this.page.selectOption('#input_3mag_country', { label: addr.country });
    await this.fillInput('#input_3mag_address', addr.street!);

    if (addr.line2) {
      await this.fillInput('#input_3mag_line2', addr.line2!);
    }

    await this.fillInput('#input_3mag_city', addr.city!);

    const stateDropdown = this.page.locator('#input_3mag_state');
    if (await stateDropdown.isVisible()) {
      await stateDropdown.selectOption(addr.state!);
    } else {
      await this.fillInput('#input_3mag_state_text', addr.state!);
    }

    await this.fillInput('#input_3mag_postal_code', addr.postalCode!);
  }

  // -------------------------
  // SUBMIT
  // -------------------------
  async submitSignup() {
    await this.page.locator('.btn-submit', { hasText: 'Submit' }).click();
  }

  // -------------------------
  // ONE-LINE HELPER (Used in tests)
  // -------------------------
  async completeMagazineSignup(address?: Address) {
    const user = await this.fillStep1();
    await this.fillStep2(address);
    await this.submitSignup();
    return user;
  }
}