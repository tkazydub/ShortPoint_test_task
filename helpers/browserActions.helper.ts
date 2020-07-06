import { browser, ElementFinder } from "protractor";
import { Logger } from "./logger.helper";
import { WaiterHelpers } from "./waiterHelpers.helper";

export class BrowserActionsHelper {
	logger: Logger;
	waiters: WaiterHelpers;

	constructor() {
		this.logger = new Logger(this.constructor.name);
		this.waiters = new WaiterHelpers();
	}

	async fillWith(elm: ElementFinder, value: string | number): Promise<void> {
		this.logger.debug(`Going to fill ${elm.locator()} with ${value} value`);
		try {
			await this.waiters.waitForElementToBecomePresent(elm);
			await this.waiters.waitForElementToBecomeVisible(elm);
			await this.scrollToElement(elm);
			await elm.sendKeys(value);
		} catch (err) {
			this.logger.error(`Unable to fill element with provided value. Error: ${err}`);
			throw new Error(err);
		}
	}

	async clickElement(elm: ElementFinder): Promise<void> {
		this.logger.debug(`Going to click on element: ${elm.locator()}`);
		try {
			await this.waiters.waitForElementToBecomeClickable(elm);
			await this.scrollToElement(elm);
			await elm.click();
		} catch (err) {
			this.logger.error(`Unable to click on element: ${err}`);
			throw new Error(err);
		}
	}

	async hoverOverTheElement(elm: ElementFinder): Promise<void> {
		this.logger.debug(`Going to hover over the element: ${elm.locator()}`);
		try {
			await this.waiters.waitForElementToBecomePresent(elm);
			await this.waiters.waitForElementToBecomeVisible(elm);
			await this.scrollToElement(elm);
			await browser.actions().mouseMove(elm).perform();
			await browser.sleep(500);
		} catch (err) {
			this.logger.error("Unable to hover over the element");
			throw new Error(err);
		}

	}

	reloadPage(): PromiseLike<void> {
		this.logger.debug("Re-loading page");
		return browser.refresh();
	}

	getTabs(): PromiseLike<string[]> {
		return browser.getAllWindowHandles();
	}

	// Should accept tabNumber starting from 1 (not form 0);
	async switchTotab(tabNumber: number): Promise<void> {
		const tabs = await this.getTabs();
		return browser.switchTo().window(tabs[tabNumber - 1]);
	}

	private scrollToElement = (elm: ElementFinder): PromiseLike<void> => {
		return browser.executeScript('arguments[0].scrollIntoView(true)', elm.getWebElement());
	};
}
