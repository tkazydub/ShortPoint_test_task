import { Logger } from "../helpers/logger.helper";
import { browser, by, element, ElementFinder } from "protractor";
import { WaiterHelpers } from "../helpers/waiterHelpers.helper";
import { BrowserActionsHelper } from "../helpers/browserActions.helper";
import { ConfigName, getEnvironmentConfig } from "../helpers/environmentConfig.helper";

export abstract class BasePage {
	url: string;
	logger: Logger;
	header: ElementFinder;
	waiters: WaiterHelpers;
	browserActions: BrowserActionsHelper;

	// Login Section
	loginForm: ElementFinder = element(by.css('form[name="f1"]'));
	emailField: ElementFinder = this.loginForm.element(by.css('input[type="email"]'));
	submitButton: ElementFinder = this.loginForm.element(by.css('input[type="submit"]'));
	passwdField: ElementFinder = this.loginForm.element(by.css('input[name="passwd"]'));
	staySignedInForm: ElementFinder = element(by.css('form[action="/kmsi"]'));
	submitStaySignedInButton: ElementFinder = this.staySignedInForm.element(by.css('input[type="submit"]'));

	async navigateTo() {
		this.logger.debug(`Going to navigate to ${this.url} page`);
		await browser.get(this.url);
	}

	async waitForPageToBeLoaded(elms: ElementFinder[]) {
		this.logger.debug(`Going to wait for page to be loaded`);
		await this.waiters.waitForOneOfTheElementToBePresent(elms);
	}

	async getCurrentUrl() {
		const currentUrl = await browser.getCurrentUrl();
		this.logger.debug(`Current Url is: ${currentUrl}`);
		return Promise.resolve(currentUrl);
	}

	async signInToApp(): Promise<void> {
		await this.waitForPageToBeLoaded([this.loginForm, this.header]);

		if (await this.loginForm.isPresent()) {
			this.logger.debug('Login form is displayed, sign is required');
			const username = getEnvironmentConfig(ConfigName.USERNAME),
				password = getEnvironmentConfig(ConfigName.PASSWORD);

			await this.browserActions.fillWith(this.emailField, username);
			await this.browserActions.clickElement(this.submitButton);

			await this.browserActions.fillWith(this.passwdField, password);
			await this.browserActions.clickElement(this.submitButton);
			await this.browserActions.clickElement(this.submitStaySignedInButton); // Submit Stay signed in? form
			await this.waiters.waitForElementToBecomePresent(this.header);
		}

		if (await this.header.isPresent()) {
			this.logger.debug(`Is already signed in to app, sign in is not required`);
		}
	}

	async amISignedIn(): Promise<boolean> {
		await this.waitForPageToBeLoaded([this.loginForm, this.header]);
		if (await this.loginForm.isPresent()) {
			return Promise.resolve(false);
		}
		return Promise.resolve(true);
	}
}
