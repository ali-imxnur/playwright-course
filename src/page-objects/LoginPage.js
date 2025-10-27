import { expect } from "@playwright/test";

export class LoginPage{

    constructor(page) {
        this.page = page;
        this.LoginHeader = page.getByRole('heading', { name: 'Login' });
        this.RegisterButton = page.getByRole('button', { name: 'Register' });
    }

    verifyLoginPage = async ()=> {
        await this.LoginHeader.waitFor();
        await expect(this.LoginHeader).toBeVisible();
    }

    navigateToRegisterPage = async ()=> {
        await this.RegisterButton.waitFor();
        await expect(this.RegisterButton).toBeEnabled();
        await this.RegisterButton.click();
        await this.page.waitForURL(/\/signup/, {timeout: 3000});
        
    }

}