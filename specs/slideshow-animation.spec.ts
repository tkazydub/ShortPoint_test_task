import { TestTaskPageObject } from "../pageObjects/testTask.po";

describe('Slideshow (animation) is working', function () {
	const page = new TestTaskPageObject();

	beforeAll(async function () {
		await page.navigateTo();
		await page.signInToApp();
	});

	it('Validate that ALL images are eventually shown', async function () {
		await page.waitForPageToBeLoaded([page.header]);
		expect(await page.amISignedIn()).toBeTruthy('Expected user to be signed in to Test Task page');
		expect(await page.header.isPresent()).toBeTruthy('Expected Test Task page to be loaded');
		expect(await page.header.getText()).toBe('Test task', 'Expected Header text to be "Test task"');
		expect(await page.getCurrentUrl()).toContain(page.url, 'Expected page to have valid url');

		await page.waiters.waitForElementToBecomePresent(page.slideShowSection);
		await page.waiters.waitForElementToBecomeVisible(page.slideShowSection);

		const displayedImages = await page.getAllImagesFromCarousel(4);

		expect(displayedImages.length).toBe(4, 'Expected to have exactly 4 images in carousel');
		expect(displayedImages).toContain('Picture 1', 'Expected Picture 1 to be displayed in the carousel');
		expect(displayedImages).toContain('Picture 2', 'Expected Picture 2 to be displayed in the carousel');
		expect(displayedImages).toContain('Picture 3', 'Expected Picture 3 to be displayed in the carousel');
		expect(displayedImages).toContain('Picture 4', 'Expected Picture 4 to be displayed in the carousel');
	});
});
