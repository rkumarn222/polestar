const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');

test.describe('Polestar Website Validation', () => {
    test.beforeEach(async ({ page }) => {
        // Start tracing before each test.
        await page.tracing.start({ screenshots: true, snapshots: true });
    });

    test.afterEach(async ({ page }, testInfo) => {
        // Stop tracing and save the trace after each test.
        await page.tracing.stop({ path: `trace-${testInfo.title.replace(/\s+/g, '-')}.zip` });
    });

    test('Validate Polestar Homepage', async ({ page }) => {
        const homePage = new HomePage(page);

        // Navigate to the Polestar website
        await homePage.navigate('https://www.polestar.com/se');

        // Close the cookie consent banner if it appears
        await homePage.closeCookieBanner();

        // Validate the presence of the header
        expect(await homePage.validateHeader()).toBe(true);

        // Validate the presence of the navigation menu button
        expect(await homePage.validateMenuButton()).toBe(true);

        // Open the menu and validate the 'Polestar 2' link
        await homePage.openMenu();
        expect(await homePage.validatePolestar2Link()).toBe(true);

        // Click the 'Polestar 2' link and validate the navigation
        await homePage.clickPolestar2Link();
        await page.waitForSelector('title');
        const title = await page.title();
        expect(title).toContain('Polestar 2');

        // Validate the presence of the main content
        expect(await homePage.validateMainContent()).toBe(true);

        // Validate the presence of the footer
        expect(await homePage.validateFooter()).toBe(true);

        // Validate the presence of buttons
        expect(await homePage.validateButtons()).toBe(true);

        // Validate the presence of links
        expect(await homePage.validateLinks()).toBe(true);

        // Validate the presence of buttons inside images
        expect(await homePage.validateImageButtons()).toBe(true);

        // Optionally, click all buttons (this may affect the test, use with caution)
        // await homePage.clickAllButtons();

        // Optionally, click all links (this may affect the test, use with caution)
        // await homePage.clickAllLinks();
    });
});
