
import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import HomePageLocators from '../Locators/HomePageLocators.json';

export class HomePage extends BasePage {
	constructor(page: Page) {
		super(page);
	}

	async clickHome(): Promise<void> {
		await this.clickElement(HomePageLocators.NavHome.locator);
	}

	async clickRadio(): Promise<void> {
		await this.clickElement(HomePageLocators.NavRadio.locator);
	}

	async clickTelevision(): Promise<void> {
		await this.clickElement(HomePageLocators.NavTelevision.locator);
	}

	async clickMagazine(): Promise<void> {
		await this.clickElement(HomePageLocators.NavMagazine.locator);
	}

	async expectNavVisible(): Promise<void> {
		await expect(this.page.locator(HomePageLocators.NavSectionsLinks.locator)).toBeVisible();
	}

		async isHomeVisible(): Promise<boolean> {
			return await this.isElementVisible(this.page.locator(HomePageLocators.NavHome.locator));
		}

			// Slider controls
			async isSliderNextVisible(): Promise<boolean> {
				const candidates = [
					HomePageLocators.SliderNext.locator,
					"//a[contains(@class,'next') and contains(@onclick,'goToSlide')]",
					"a.next",
					"a.next[onclick*='goToSlide']",
				];

				for (const sel of candidates) {
					try {
						const loc = this.page.locator(sel).first();
						// wait briefly for the element to be attached
						await loc.waitFor({ state: 'attached', timeout: 1500 }).catch(() => {});
						// try to bring into view
						try { await loc.scrollIntoViewIfNeeded(); } catch (e) { void e; }
						// check visibility
						if (await this.isElementVisible(loc)) return true;
						// try hover to reveal controls (some sliders hide arrows until hover)
						try { await loc.hover(); } catch (e) { void e; }
						if (await this.isElementVisible(loc)) return true;
					} catch (e) {
						// ignore and try next selector
					}
				}
				return false;
			}

			async isSliderPrevVisible(): Promise<boolean> {
				const candidates = [
					HomePageLocators.SliderPrev.locator,
					"//a[contains(@class,'prev') and contains(@onclick,'goToSlide')]",
					"a.prev",
					"a.prev[onclick*='goToSlide']",
				];

				for (const sel of candidates) {
					try {
						const loc = this.page.locator(sel).first();
						await loc.waitFor({ state: 'attached', timeout: 1500 }).catch(() => {});
						try { await loc.scrollIntoViewIfNeeded(); } catch (e) { void e; }
						if (await this.isElementVisible(loc)) return true;
						try { await loc.hover(); } catch (e) { void e; }
						if (await this.isElementVisible(loc)) return true;
					} catch (e) {
						// ignore and continue
					}
				}
				return false;
			}

			async clickSliderNext(): Promise<void> {
				await this.clickElement(HomePageLocators.SliderNext.locator);
			}

			async clickSliderPrev(): Promise<void> {
				await this.clickElement(HomePageLocators.SliderPrev.locator);
			}

			/**
			 * Fill the search input and submit (press Enter). Waits for page load.
			 */
			async search(term: string): Promise<void> {
				const locator = HomePageLocators.SearchBar.locator;
				await this.fillInput(locator, term);
				// submit via Enter key
				await this.page.locator(locator).press('Enter');
				await this.waitForPageLoad();
			}

			async isSearchResultsVisible(): Promise<boolean> {
				return await this.isElementVisible(this.page.locator(HomePageLocators.searchResults.locator));
			}

			/**
			 * Navigate through all nav links found in the top nav menu.
			 * Collects hrefs first (so we don't rely on page-bound locators after navigation),
			 * then visits each link via page.goto and records the result.
			 * Returns an array of visit summaries.
			 */
	async navigateThroughNavLinks(): Promise<Array<{text: string; href: string; visitedUrl: string; error?: string}>> {
		const navKeys = ['NavHome', 'NavRadio', 'NavTelevision', 'NavMagazine'] as const;
		const results: Array<{text: string; href: string; visitedUrl: string; error?: string}> = [];

		for (const key of navKeys) {
			// @ts-ignore
			const locatorEntry = HomePageLocators[key];
			if (!locatorEntry || !locatorEntry.locator) {
				results.push({ text: key, href: '', visitedUrl: '', error: 'locator-missing' });
				continue;
			}

			const anchor = this.page.locator(locatorEntry.locator).first();
			let href = '';
			let text: string = '';
			try {
				href = (await anchor.getAttribute('href')) || '';
				text = (await anchor.locator('.nav-menu-item-text').textContent())?.trim() || (await anchor.textContent())?.trim() || key;
			} catch (e: any) {
				results.push({ text: key, href: href || '', visitedUrl: '', error: `read-error: ${e.message}` });
				continue;
			}

			try {
				await this.clickElement(locatorEntry.locator);
				await this.waitForPageLoad();
				const visited = await this.getCurrentUrl();
				const visible = await this.isElementVisible(this.page.locator(locatorEntry.locator));
				if (visible) {
					results.push({ text, href, visitedUrl: visited });
				} else {
					results.push({ text, href, visitedUrl: visited, error: 'locator-not-visible-after-click' });
				}
			} catch (err: any) {
				results.push({ text, href, visitedUrl: '', error: err.message });
			}
		}

		// Print results for debugging when running tests
		console.log('navigateThroughNavLinks results:', results);

		return results;
	}


}
