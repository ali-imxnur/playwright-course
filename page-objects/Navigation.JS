export class Navigation {

    constructor(page) {
        this.page = page;
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.checkOutLink = page.getByRole('link', { name: 'Checkout' });
    }
    getBasketCount = async () => {
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text);
    }

    clickCheckoutLink = async () => {
        await this.checkOutLink.click();
    }

}