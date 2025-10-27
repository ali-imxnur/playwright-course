import {test} from "@playwright/test";
import { v4 as uuidv4 } from "uuid";
import { ProductsPage } from "../page-objects/ProductsPage.js";
import { CheckoutPage } from "../page-objects/CheckoutPage.js";
import { Navigation } from "../page-objects/Navigation.js";
import { LoginPage} from "../page-objects/LoginPage.js";
import { SignupPage } from "../page-objects/SignupPage.js";
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js";

test.only("New user full end-to-end test journey", async ({page}) => {
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
    await checkoutPage.continueToCheckout();

    const loginPage = new LoginPage(page);
    await loginPage.verifyLoginPage();
    await loginPage.navigateToRegisterPage();

    const signupPage = new SignupPage(page);
    const email = uuidv4() + '@gmail.com';
    const password = uuidv4();
    await signupPage.registerUser(email, password);
    await page.waitForLoadState('networkidle');
    const deliveryDetailsPage = new DeliveryDetails(page);
    await deliveryDetailsPage.verifyDeliveryPage();
    await deliveryDetailsPage.fillDetails();
});