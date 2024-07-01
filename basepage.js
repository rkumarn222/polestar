class BasePage {
    constructor(page) {
        this.page = page;
    }

    async navigate(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('networkidle');
    }

    async closeCookieBanner() {
        try {
            const cookieButton = await this.page.$('button[data-testid="cookie-banner-accept"]');
            if (cookieButton) {
                await cookieButton.click();
            }
        } catch (error) {
            console.log('Cookie banner not found or already closed');
        }
    }
}

module.exports = BasePage;
