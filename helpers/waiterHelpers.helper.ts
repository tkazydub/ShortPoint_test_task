import { Logger } from "./logger.helper";
import { browser, ElementFinder, ExpectedConditions } from "protractor";
import { BrowserActionsHelper } from "./browserActions.helper";

export class WaiterHelpers {
	logger: Logger;

	constructor() {
		this.logger = new Logger(this.constructor.name);
	}

	async waitForElementToBecomePresent(
		elm: ElementFinder,
		timeout: number = 5000
	): Promise<void> {
		this.logger.debug(`Going to wait for ${elm.locator()} to become present`);

		try {
			await browser.wait(ExpectedConditions.presenceOf(elm), timeout);
		} catch (err) {
			throw new Error(`Element is not present: ${elm.locator()} after timeout: ${timeout}`);
		}
	};

	async waitForElementToBecomeVisible(
		elm: ElementFinder,
		timeout: number = 5000
	): Promise<void> {
		try {
			await browser.wait(ExpectedConditions.visibilityOf(elm), timeout);
		} catch {
			throw new Error(
				`Unable to wait for element to become visible: ${elm.locator()}. Timeout: ${timeout}`
			);
		}
	};

	async waitForElementToBecomeClickable (
		elm: ElementFinder,
		timeout: number = 5000
	): Promise<void> {
		this.logger.debug(`Going to wait for ${elm.locator()} to become clickable`);

		try {
			await browser.wait(ExpectedConditions.elementToBeClickable(elm), timeout);
		} catch {
			throw new Error(`Element is not clickable: ${elm.locator()} after timeout: ${timeout}`);
		}
	};

	// This method will wait for the first element to become present
	async waitForOneOfTheElementToBePresent(elements: ElementFinder[], timeout: number = 5000): Promise<void> {
		let t = timeout;
		elements = elements.filter(i => i); // Filter out undefined elements

		this.logger.debug(`Going to wait for one of the elements to become present: ${elements.map(i => i.locator())}`);

		let results = await Promise.all(elements.map(async elm => await elm.isPresent()));

		while (results.filter(i => i).length === 0 && t > 0) {
			t -= 500;
			await browser.sleep(500);
			results = await Promise.all(elements.map(async elm => await elm.isPresent()));
		}

		if (results.filter(i => i).length > 0) {
			return Promise.resolve();
		}
		throw new Error(`None of the provided elements is present: ${results}, after: ${timeout} timeout`);
	};

	async waitForNumberOfTabsToBe(expectedAmount: number, timeout: number = 5000): Promise<void> {
		const browserActions = new BrowserActionsHelper();
		let numberOfTabs = (await browserActions.getTabs()).length;
		while (expectedAmount !== numberOfTabs && timeout > 0) {
			await browser.sleep(500);
			timeout -= 500;
			numberOfTabs = (await browserActions.getTabs()).length;
		}
		if (expectedAmount === numberOfTabs) {
			return Promise.resolve();
		}

		throw new Error(`Unable to wait for tabs amount to become: ${expectedAmount}, actual number of tabs: ${numberOfTabs}`);
	}
}
