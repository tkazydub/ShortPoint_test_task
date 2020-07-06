import { Logger } from "../helpers/logger.helper";
import { by, element, ElementFinder } from "protractor";
import { BasePage } from "./basePage.po";
import { WaiterHelpers } from "../helpers/waiterHelpers.helper";
import { BrowserActionsHelper } from "../helpers/browserActions.helper";

export class HomeSitePageObject extends BasePage {
	logger: Logger;
	startButton: ElementFinder;

	constructor() {
		super();
		this.logger = new Logger(this.constructor.name);
		this.waiters = new WaiterHelpers();
		this.browserActions = new BrowserActionsHelper();

		this.url = '/sites/HomeSite';

		this.header = element(by.css('span[data-automationid="SiteHeaderTitle"]'));
		this.startButton = element(by.css('a[data-shortpoint-type="button"]'));
	}

	clickStartButton(): Promise<void> {
		this.logger.debug('Going to click on "Start" button');
		return this.browserActions.clickElement(this.startButton);
	}
}
