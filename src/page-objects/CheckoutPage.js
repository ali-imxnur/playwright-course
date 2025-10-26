import {expect} from "@playwright/test"

export class CheckoutPage{

    constructor(page){
        this.page = page;
        this.basketHeader = page.getByRole('heading', { name: 'Basket' });
        this.totalPrice = page.locator("//p[text()='Total:']/span");
    }

    verifyBasketHeader = async ()=>{
       await expect(this.basketHeader).toHaveText("Basket");
    }

    verifyTotalPrice = async ()=>{
        await expect(this.totalPrice).toContainText("1418$");
    }


}