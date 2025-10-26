 import {test, expect} from "@playwright/test"

 export class ProductsPage{
    constructor(page){
        this.page = page;
        this.addToBasketButtons = page.locator("[data-qa='product-button']");
        this.checkOutLink = page.getByRole('link', { name: 'Checkout' });
        this.basketCounter = page.locator('[data-qa="header-basket-count"]');
    }

    visit = async ()=> {
        await this.page.goto("/");
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor();
        const text = await this.basketCounter.innerText();
        return parseInt(text, 10);
    }

    addProductToBasket = async (index)=> {
        const specificAddButton = this.addToBasketButtons.nth(index);
        await specificAddButton.waitFor();
        await expect(specificAddButton).toHaveText("Add to Basket");
        const basketCountBeforeAdding = await this.getBasketCount();
        await specificAddButton.click();
        await expect(specificAddButton).toHaveText("Remove from Basket");
        await this.page.waitForTimeout(500);
        const basketCountAfterAdding = await this.getBasketCount();
        await expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding);
    }

    clickCheckoutLink = async ()=>{
        await this.checkOutLink.click();
    }

}