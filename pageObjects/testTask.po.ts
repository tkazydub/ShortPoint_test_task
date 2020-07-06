import { BasePage } from "./basePage.po";
import { Logger } from "../helpers/logger.helper";
import { WaiterHelpers } from "../helpers/waiterHelpers.helper";
import { browser, by, element, ElementArrayFinder, ElementFinder } from "protractor";
import { BrowserActionsHelper } from "../helpers/browserActions.helper";

export class TestTaskPageObject extends BasePage {
	slideShowSection: ElementFinder;
	carouselImages: ElementArrayFinder;
	tilesSection: ElementFinder;
	tiles: ElementArrayFinder;

	constructor() {
		super();
		this.logger = new Logger(this.constructor.name);
		this.waiters = new WaiterHelpers();
		this.browserActions = new BrowserActionsHelper();
		this.url = '/sites/HomeSite/internalsite/testtask';

		this.header = element(by.cssContainingText('span[data-automationid="SiteHeaderTitle"]', 'Test task'));

		this.slideShowSection = element(by.cssContainingText('.shortpoint-panel-title-text', 'Slideshow'));
		this.carouselImages = element.all(by.css('.shortpoint-image-carousel-content .shortpoint-image-carousel-title'));

		this.tilesSection = element(by.cssContainingText('.shortpoint-panel-title-text', 'Tiles'));
		this.tiles = element.all(by.css('div[data-shortpoint-type="tile"]'));
	}

	async getAllImagesFromCarousel(expectedNumber: number): Promise<string[]> {
		let displayedImages = await this.getDisplayedCarouselImages();
		let timeout = 10000;
		while(displayedImages.length !== expectedNumber && timeout > 0) {
			await browser.sleep(500);
			timeout -= 500;
			// Creating array of unique Image names
			displayedImages = Array.from(new Set(displayedImages.concat(await this.getDisplayedCarouselImages())));
		}
		this.logger.debug(`All images from carousel: ${JSON.stringify(displayedImages)}`);
		return Promise.resolve(displayedImages);
	}

	private async getDisplayedCarouselImages(): Promise<string[]> {
		this.logger.debug('Going to get displayed carousel images');

		// @ts-ignore
		const text: string[]= await this.carouselImages.getText();
		const result = text.filter(i => i);

		this.logger.debug(`Displayed carousel images: ${JSON.stringify(result)}`);
		return result;
	}
}
