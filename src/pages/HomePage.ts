import { Locator, Page, expect } from '@playwright/test';

export default class HomePage {
    readonly page: Page;

    readonly forgotLogin: Locator;
    readonly register: Locator;

    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly welcomeMessage: Locator;

    readonly transferFundsLink: Locator;
    readonly accountsOverViewLink: Locator;
    readonly billPayLink: Locator;
    readonly requestLoanLink: Locator;

    constructor(page: Page) {
        this.page = page;

        this.forgotLogin = page.getByRole('link', {name: 'Forgot login info?'});
        this.register = page.getByRole('link', {name: 'Register'});

        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.welcomeMessage = page.locator('p[class="smallText"]');

        this.transferFundsLink = page.getByRole('link', { name: 'Transfer Funds' });
        this.accountsOverViewLink = page.getByRole('link', { name: 'Accounts Overview' });
        this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
        this.requestLoanLink = page.getByRole('link', { name: 'Request Loan' });
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username); 
    }
    
    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton() {
        await this.loginButton.click();
    }

    async validateWelcomeMessage(userFullName: string) {
        await expect(this.welcomeMessage).toContainText(`Welcome ${userFullName}`);
    }

    async clickPageLink(pageName: string) {
        switch(pageName) { 
            case "forgot login": {
                await this.forgotLogin.click();
                break; 
            }
            case "register": {
                await this.register.click();
                break; 
            }
            case "transfer funds": { 
                await this.transferFundsLink.click();
                break; 
            } 
            case "accounts overview": {
                await this.accountsOverViewLink.click();
                break;
            } 
            case "bill pay": {
                await this.billPayLink.click();
                break;
            }
            case "request loan": { 
                await this.requestLoanLink.click();
                break;
            }
         } 
    }
}
