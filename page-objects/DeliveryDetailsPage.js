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

    fillDetails = async (userDetails)=> {
        await this.firstNameInput.waitFor({ state: "visible", timeout: 15000 });
        await this.firstNameInput.fill(userDetails.firstName);

        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(userDetails.lastName);

        await this.streetInput.waitFor();
        await this.streetInput.fill(userDetails.street);

        await this.postcodeInput.waitFor();
        await this.postcodeInput.fill(userDetails.postalcode);

        await this.cityInput.waitFor();
        await this.cityInput.fill(userDetails.city);

        await this.countryDropdown.waitFor();
        await this.countryDropdown.selectOption(userDetails.country);
    }

    continueToPayement = async ()=> {
        await this.continueToPaymentButton.waitFor();
        await this.continueToPaymentButton.click();
        await expect(this.page).toHaveURL(/\/payment/, {timeout: 3000})
    }

}