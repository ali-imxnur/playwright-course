import {expect} from "@playwright/test"

export class CheckoutPage{

    constructor(page){
        this.page = page;
        this.basketHeader = page.getByRole('heading', { name: 'Basket' });
        this.totalPrice = page.locator("//p[text()='Total:']/span");
        this.basketCards = page.locator('[data-qa="basket-card"]');
        this.allItemPrices = page.locator('[data-qa="basket-item-price"]');
        this.removeFromBasketButton = page.locator('[data-qa="basket-card-remove-item"]')

    }

    verifyBasketHeader = async ()=> {
       await expect(this.basketHeader).toHaveText("Basket");
    }

    verifyTotalPrice = async ()=> { 
        await expect(this.totalPrice).toContainText("1418$");
    }

    removeCheapestProduct = async ()=> { 
        await this.basketCards.first().waitFor();
        const basketCountBeforeRemove = await this.basketCards.count();
        const allItemPricesTexts = await this.allItemPrices.allInnerTexts();
        const justNumbrs = allItemPricesTexts.map((element) => {
        const withoutDollarsSign = element.replace("$", "");
        return parseInt(withoutDollarsSign, 10);
        })
        const smallestPrice = Math.min(...justNumbrs)
        const smallestPricIndx = justNumbrs.indexOf(smallestPrice);
        await this.removeFromBasketButton.nth(smallestPricIndx).waitFor();
        await this.removeFromBasketButton.nth(smallestPricIndx).click();
        await expect(this.basketCards).toHaveCount(basketCountBeforeRemove - 1);
      
    }


}