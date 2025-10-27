import { expect } from "@playwright/test";
import { timeout } from "../../playwright.config";

export class SignupPage{
    constructor(page){
        this.page = page;
        this.emailTextfield = page.getByRole('textbox', { name: 'E-Mail' });
        this.passwordTextfield = page.getByRole('textbox', { name: 'Password' });
        this.RegisterButton = page.getByRole('button', { name: 'Register' });
    }

    registerUser = async (email, pass)=> {
        await this.emailTextfield.waitFor();
        await this.emailTextfield.fill(email);

        await this.passwordTextfield.waitFor();
        await this.passwordTextfield.fill(pass);

        await this.RegisterButton.click();
        await this.page.waitForURL(/\/delivery/, {timeout: 3000});
    }

    
}