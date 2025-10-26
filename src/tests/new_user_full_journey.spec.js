import {test} from "@playwright/test";

import { ProductsPage } from "../page-objects/ProductsPage.js";
import { CheckoutPage } from "../page-objects/CheckoutPage.js";

test.only("New user full end-to-end test journey", async({page})=>{

    const productPage = new ProductsPage(page);

    await productPage.visit();
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    await productPage.clickCheckoutLink();

    const checkoutPage = new CheckoutPage(page);
    
    await checkoutPage.verifyBasketHeader();
    await checkoutPage.verifyTotalPrice();

    //await page.pause();

});