const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/homePage');
const fs = require('fs');

test.describe('Polestar Website Validation', () => {
    let page; // Define page outside of tests to share across tests

    test.beforeAll(async ({ browser }) => {
        // Create a new context and page instance once for all tests
        const context = await browser.newContext();
        page = await context.newPage();
    });

    test.afterAll(async () => {
        // Close the page and context after all tests
        await page.context().close();
    });

    test.beforeEach(async () => {
        // Start tracing before each test.
        await page.tracing.start({ screenshots: true, snapshots: true });
    });

    test.afterEach(async ({ testInfo }) => {
        // Stop tracing and save the trace after each test.
        const tracePath = `trace-${testInfo.title.replace(/\s+/g, '-')}.zip`;
        const traceBuffer = await page.tracing.stop();
        fs.writeFileSync(tracePath, traceBuffer.toString('base64'), 'base64');
    });

    test('Validate Polestar Homepage', async () => {
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