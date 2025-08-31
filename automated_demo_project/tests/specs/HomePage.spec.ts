import { test } from "@tests/fixtures/test-base";
import { devices, expect } from "@playwright/test";
import { CombinedPages } from "@/pages/DavidJeremiah";
import { HomePage } from '../../src/pages/HomePage';




test.describe('Home Page Tests', () => {
  test.describe.configure({ timeout: 60000 });
const iPhone12 = devices['iPhone 12'];
  test('Add to cart', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.addToCart();

   
  });

  test('Update Quantity ', async ({ page }) => {
    
   const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.updateQuantity(3);

  });

  test('Remove Item', async ({ page }) => {

   const davidJeremiahPages = new CombinedPages(page);
   const homepage = new HomePage(page);
   await davidJeremiahPages.performSplashPageActions();
   await homepage.removeItem();
  });


  test('Invalid Quantity', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.updateQuantity(-1000);
    await homepage.assertQuantityValueExceedAlert();

  });
  test('Exceed Stock ', async ({ page }) => {

   const davidJeremiahPages = new CombinedPages(page);
   const homepage = new HomePage(page);
   await davidJeremiahPages.performSplashPageActions();
   await homepage.updateQuantity(1000);
   await homepage.assertQuantityValueExceedAlert();

  });


  test('Navigate Through Sections on homepage', async ({ page }) => {
    test.setTimeout(180000); // 3 minutes for this test

    const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.navigateSections();
  });


  test('Searching item from search bar', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.searchItem('Promise of Heaven');
  });

   test('Empty Searching item from search bar', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.EmptysearchItem();
  });


  test('Select currency from dropdown', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.addToCart();
    await homepage.clickCurrencyDropdown();
    await homepage.SelectedCurrency('nzd');
    await homepage.assertSelectedCurrency('NZD');
  });

 test('US billing for US Domain', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    const homepage = new HomePage(page);
    await davidJeremiahPages.performSplashPageActions();
    await homepage.addToCart();
    await homepage.clickCurrencyDropdown();
    await homepage.SelectedCurrency('usd');
    await homepage.assertSelectedCurrency('USD');
  });


  test('Subscribe to newsletter', async ({ page }) => {
    test.setTimeout(90000); // 90 seconds for this test
    const davidJeremiahPages = new CombinedPages(page);
    await davidJeremiahPages.performSplashPageActions();
    const homepage = new HomePage(page);
    await homepage.subscribeToNewsletter('test@example.com');
    await homepage.assertSubscriptionSuccessMsg();    
  });

   test.only('Subscribe to newsletter with Invalid Email', async ({ page }) => {
    const davidJeremiahPages = new CombinedPages(page);
    await davidJeremiahPages.performSplashPageActions();
    const homepage = new HomePage(page);
    await homepage.subscribeToNewsletter('invalid-email');
    await homepage.assertSubscriptionErrorMsg();    
  });
});
