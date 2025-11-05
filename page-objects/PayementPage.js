import { expect } from "@playwright/test";
export class PaymentPage{
    constructor(page){
        this.page = page;
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]');
        this.discountCodeInput = page.getByPlaceholder('Discount code');
        this.submitButton = page.locator('[data-qa="submit-discount-button"]');

        this.ownerInput = page.getByRole('textbox', { name: 'Credit card owner' });
        this.creditCardNumberInput = page.getByRole('textbox', { name: 'Credit card number' });
        this.validUntilInput = page.getByRole('textbox', { name: 'Valid until' });
        this.cvcInput = page.getByRole('textbox', { name: 'Credit card CVC' });
        this.payButton = page.getByRole('button', { name: 'Pay' });
    }

    activateDiscount = async ()=> {
        await this.discountCode.waitFor();
        const code = await this.discountCode.innerText();
        await this.discountCodeInput.waitFor();
        await this.discountCodeInput.fill(code);
        await expect(this.discountCodeInput).toHaveValue(code);
        await this.submitButton.click();
    }

    fillPaymentDetailsandClickPayButton = async (paymentDetails)=> {
        await this.ownerInput.waitFor({ state: "visible", timeout: 15000 });
        await this.ownerInput.fill(paymentDetails.owner);

        await this.creditCardNumberInput.waitFor();
        await this.creditCardNumberInput.fill(paymentDetails.creditCard);

        await this.validUntilInput.waitFor();
        await this.validUntilInput.fill(paymentDetails.validUntil);

        await this.cvcInput.waitFor();
        await this.cvcInput.fill(paymentDetails.cvc);
        
        await this.payButton.click();
        await expect(this.page).toHaveURL(/\/thank-you/, {timeout: 3000});
        // await this.page.pause();
    }

}
