import { test, expect } from '@playwright/test';
import Data from '../env.json';
import { MagazinePage } from '@/pages/MagazinePage';

test('TC-MAG-001 Verify magazine signup overlay opens', async ({ page }) => {
    const origin = new URL(Data.BASE_URL).origin;
    await page.goto(`${origin}/magazine`);

    // Click Signup link and wait for new page (signup page) to open
    const [signupPage] = await Promise.all([
      page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
      page.locator('a[href="/magazine/signup"]').first().click()
    ]);

    const p = signupPage ?? page;
    if (signupPage) await p.waitForLoadState('load');
    else await page.waitForLoadState('load');
    

    // Click Get My Free Devotional Magazines (use role-based locators first)
    await page.getByRole('link', { name: /Get My Free Devotional Magazines|Get My Free|Free Devotional/i }).first().click()
    


    const overlay = p.locator('#mag_signup_overlay, .ov-mag-signup, .tp-checkout');
    await expect(overlay.first()).toBeVisible({ timeout: 5000 });
  });

test('TC-MAG-002 Verify email input validation (server rejects invalid email)', async ({ page }) => {
    const origin = new URL(Data.BASE_URL).origin;
    await page.goto(`${origin}/magazine`);

    // Click Signup and switch to signup page
    const [signupPage] = await Promise.all([
      page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
      page.locator('a[href="/magazine/signup"]').first().click()
    ]);
    const p = signupPage || page;
    if (signupPage) await p.waitForLoadState('load');
    else await page.waitForLoadState('load');
    // Click Get My Free Devotional Magazines (use role-based locators first)
     // Click Get My Free Devotional Magazines (use role-based locators first)
    await page.getByRole('link', { name: /Get My Free Devotional Magazines|Get My Free|Free Devotional/i }).first().click()
    const overlay = p.locator('#mag_signup_overlay, .ov-mag-signup, .tp-checkout');
    await expect(overlay.first()).toBeVisible({ timeout: 5000 });

    // Fill the form with invalid email
    await p.fill('#input_3mag_firstname', 'Test');
    await p.fill('#input_3mag_lastname', 'User');
    await p.fill('#input_3mag_email', 'not-an-email');
    await p.getByRole('link', { name: "Continue" }).click();

    const isVisible = await page.getByText('Please correct the fields').first().isVisible();
    expect(isVisible).toBeTruthy();

    });

  

  

test('TC-MAG-003 Verify successful signup flow (server accepts)', async ({ page }) => {
     const origin = new URL(Data.BASE_URL).origin;
    await page.goto(`${origin}/magazine`);

    // Click Signup and switch to signup page
    const [signupPage] = await Promise.all([
      page.context().waitForEvent('page', { timeout: 5000 }).catch(() => null),
      page.locator('a[href="/magazine/signup"]').first().click()
    ]);
    const p = signupPage || page;
    if (signupPage) await p.waitForLoadState('load');
    else await page.waitForLoadState('load');
    
    // Click Get My Free Devotional Magazines (use role-based locators first)
     // Click Get My Free Devotional Magazines (use role-based locators first)
    await p.getByRole('link', { name: /Get My Free Devotional Magazines|Get My Free|Free Devotional/i }).first().click()
    const overlay = p.locator('#mag_signup_overlay, .ov-mag-signup, .tp-checkout');
    await expect(overlay.first()).toBeVisible({ timeout: 5000 });
    const magazine = new MagazinePage(p);
    await magazine.completeMagazineSignup();
    try {
         await page.locator("//a[@class='btn-address']").click({ timeout: 3000 });
         await magazine.submitSignup();

    } catch (err) {
        console.warn('btn-address not found or not clickable, continuing...');
    }

     await expect(page.getByRole('heading', { name: 'Thank you!' })).toBeVisible();

  });

