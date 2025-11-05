import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js";


export class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addToBasketButtons = page.locator("[data-qa='product-button']");
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]');
        this.ProductTitle = page.locator('[data-qa="product-title"]');
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
        expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }

    sortByChpst = async ()=> {
        await this.sortDropdown.waitFor();
        await this.ProductTitle.first().waitFor();
        const productTitleBeforeSorted = await this.ProductTitle.allInnerTexts();
        await this.sortDropdown.selectOption('Price ascending');
        const productTitleAfterSorted = await this.ProductTitle.allInnerTexts();
        expect(productTitleBeforeSorted).not.toEqual(productTitleAfterSorted);
       
    }

    
}