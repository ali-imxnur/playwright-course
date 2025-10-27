import { expect } from "@playwright/test";

export class DeliveryDetails{
    constructor(page){
        this.page = page;
        this.deliveryHeader = page.locator("//h1[normalize-space()='Delivery details']");
        this.firstNameInput = page.locator('[data-qa="delivery-first-name"]')
        this.lastNameInput = page.locator('[data-qa="delivery-last-name"]');
        this.streetInput = page.locator('[data-qa="delivery-address-street"]');
        this.postcodeInput = page.locator('[data-qa="delivery-postcode"]');
        this.cityInput = page.locator('[data-qa="delivery-city"]');
        this.countryDropdown = page.locator('[data-qa="country-dropdown"]');
        this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' });
    }

    verifyDeliveryPage = async ()=>{
        await expect(this.deliveryHeader).toBeVisible();
    }

    fillDetails = async ()=> {
        await this.firstNameInput.waitFor({ state: "visible", timeout: 15000 });
        await this.firstNameInput.fill("test");

        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill("details");

        await this.streetInput.waitFor();
        await this.streetInput.fill("something 123");

        await this.postcodeInput.waitFor();
        await this.postcodeInput.fill("12345");

        await this.cityInput.waitFor();
        await this.cityInput.fill("xyz");

        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption({value: "India"});

        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();

        await this.page.pause();
    }

}