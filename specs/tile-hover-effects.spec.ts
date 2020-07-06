import { TestTaskPageObject } from "../pageObjects/testTask.po";

describe("Verify that hover effects for each Tile are animated", function () {
	const page = new TestTaskPageObject();

	beforeAll(async function () {
		await page.navigateTo();
		await page.signInToApp();
	});

	beforeEach(async function () {
		await page.navigateTo();
		await page.waitForPageToBeLoaded([page.header]);
		expect(await page.amISignedIn()).toBeTruthy('Expected user to be signed in to Test Task page');
		expect(await page.header.isPresent()).toBeTruthy('Expected Test Task page to be loaded');
		expect(await page.header.getText()).toBe('Test task', 'Expected Header text to be "Test task"');
		expect(await page.getCurrentUrl()).toContain(page.url, 'Expected page to have valid url');
		await page.waiters.waitForElementToBecomePresent(page.tilesSection);
		await page.waiters.waitForElementToBecomeVisible(page.tilesSection);
	});

	it('Validate animation for the tile #1', async function() {
		const tile = await page.tiles.get(0);
		await page.browserActions.hoverOverTheElement(tile);

		//TODO: add validation
	});

	it('Validate animation for the tile #2', async function() {
		const tile = await page.tiles.get(1);
		await page.browserActions.hoverOverTheElement(tile);

		//TODO: add validation
	});

	it('Validate animation for the tile #3', async function() {
		const tile = await page.tiles.get(2);
		await page.browserActions.hoverOverTheElement(tile);

		//TODO: add validation
	});

	it('Validate animation for the tile #4', async function() {
		const tile = await page.tiles.get(3);
		await page.browserActions.hoverOverTheElement(tile);

		//TODO: add validation
	});
});
