import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.JS";

export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addToBasketButtons = page.locator("[data-qa='product-button']");
        this.checkOutLink = page.getByRole('link', { name: 'Checkout' });

    }

    visit = async () => {
        await this.page.goto("/");
    }


    addProductToBasket = async (index) => {
        const specificAddButton = this.addToBasketButtons.nth(index);
        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
        const navigation = new Navigation(this.page);
        const basketCountBeforeAdding = await navigation.getBasketCount();
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");
        await this.page.waitForTimeout(500);
        const basketCountAfterAdding = await navigation.getBasketCount();
        await expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }

    clickCheckoutLink = async () => {
        await this.checkOutLink.click();
    }

}