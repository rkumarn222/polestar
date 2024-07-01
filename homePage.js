const BasePage = require('./basePage');

class HomePage extends BasePage {
    constructor(page) {
        super(page);
        this.header = 'header';
        this.menuButton = 'button[data-testid="header-navigation-toggle"]';
        this.polestar2Link = 'a:has-text("Polestar 2")';
        this.mainContent = 'main';
        this.footer = 'footer';
        this.buttons = 'button';
        this.links = 'a';
        this.imageButtons = 'img + button';  // Assuming buttons are directly after images
    }

    async validateHeader() {
        return await this.page.$(this.header) !== null;
    }

    async validateMenuButton() {
        return await this.page.$(this.menuButton) !== null;
    }

    async openMenu() {
        await this.page.click(this.menuButton);
    }

    async validatePolestar2Link() {
        return await this.page.$(this.polestar2Link) !== null;
    }

    async clickPolestar2Link() {
        await this.page.click(this.polestar2Link);
    }

    async validateMainContent() {
        return await this.page.$(this.mainContent) !== null;
    }

    async validateFooter() {
        return await this.page.$(this.footer) !== null;
    }

    async validateButtons() {
        const buttons = await this.page.$$(this.buttons);
        return buttons.length > 0;
    }

    async validateLinks() {
        const links = await this.page.$$(this.links);
        return links.length > 0;
    }

    async validateImageButtons() {
        const imageButtons = await this.page.$$(this.imageButtons);
        return imageButtons.length > 0;
    }

    async clickAllButtons() {
        const buttons = await this.page.$$(this.buttons);
        for (const button of buttons) {
            await button.click();
            // Optionally, add a small delay to avoid overwhelming the page
            await this.page.waitForTimeout(100);
        }
    }

    async clickAllLinks() {
        const links = await this.page.$$(this.links);
        for (const link of links) {
            const href = await link.getAttribute('href');
            if (href) {
                await this.page.click(`a[href="${href}"]`);
                await this.page.goBack();
                await this.page.waitForTimeout(100);
            }
        }
    }
}

module.exports = HomePage;
