import { HomeSitePageObject } from "../pageObjects/homeSite.po";
import { TestTaskPageObject } from "../pageObjects/testTask.po";

describe('Navigation between sites works properly', function() {
	const homeSitePage = new HomeSitePageObject(),
		testTaskPage = new TestTaskPageObject();

	beforeEach(async function () {
		await homeSitePage.navigateTo();
	});

	it('Login to HomeSite', async function() {
		await homeSitePage.signInToApp();
		expect(await homeSitePage.header.isPresent()).toBeTruthy(`Expected logo is not displayed, looks like it is not signed in to the HomeSite`);
		expect(await homeSitePage.header.getText()).toBe('Home Site', 'Expected Header text to be "Home Site"');
	});

	it('Click on Start button and check that Test task site is opened', async function () {
		expect(await homeSitePage.amISignedIn()).toBeTruthy('Expected user to be signed in to app');
		expect(await homeSitePage.startButton.isPresent()).toBeTruthy('Expected "Start" button to be present');

		const numberOfTabs = (await homeSitePage.browserActions.getTabs()).length;
		await homeSitePage.clickStartButton();
		await homeSitePage.waiters.waitForNumberOfTabsToBe(numberOfTabs + 1);
		expect((await homeSitePage.browserActions.getTabs()).length).toBe(numberOfTabs + 1, 'Expected that Test Task page to be opened in the new tab');
		await homeSitePage.browserActions.switchTotab(numberOfTabs + 1);

		await testTaskPage.waitForPageToBeLoaded([testTaskPage.header]);
		expect(await testTaskPage.header.isPresent()).toBeTruthy('Expected Test Task page to be loaded');
		expect(await testTaskPage.header.getText()).toBe('Test task', 'Expected Header text to be "Test task"');
		expect(await testTaskPage.getCurrentUrl()).toContain(testTaskPage.url, 'Expected page to have valid url');
	});
});
