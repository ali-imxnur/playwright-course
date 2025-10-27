import {test} from "@playwright/test";

import { ProductsPage } from "../page-objects/ProductsPage.js";
import { CheckoutPage } from "../page-objects/CheckoutPage.js";
import { Navigation } from "../page-objects/Navigation.JS";

test.only("New user full end-to-end test journey", async({page})=>{

    const productPage = new ProductsPage(page);
    await productPage.visit();
    await productPage.sortByChpst();
    await productPage.addProductToBasket(0);
    await productPage.addProductToBasket(1);
    await productPage.addProductToBasket(2);
    const navigation = new Navigation(page)
    await navigation.clickCheckoutLink();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.verifyBasketHeader();
    await checkoutPage.verifyTotalPrice();
    await checkoutPage.removeCheapestProduct();

});