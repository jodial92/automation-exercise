import { Locator, Page, expect } from '@playwright/test';

export default class RegisterPage {
    readonly page: Page;

    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly addressInput: Locator;
    readonly cityInput: Locator;
    readonly stateInput: Locator;
    readonly zipInput: Locator;
    readonly phoneInput: Locator;
    readonly ssnInput: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPassInput: Locator;
    readonly registerButton: Locator;
    readonly welcomeMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[id="customer\\.firstName"]');
        this.lastNameInput = page.locator('[id="customer\\.lastName"]');
        this.addressInput = page.locator('[id="customer\\.address\\.street"]');
        this.cityInput = page.locator('[id="customer\\.address\\.city"]');
        this.stateInput = page.locator('[id="customer\\.address\\.state"]');
        this.zipInput = page.locator('[id="customer\\.address\\.zipCode"]');
        this.phoneInput = page.locator('[id="customer\\.phoneNumber"]');
        this.ssnInput = page.locator('[id="customer\\.ssn"]');
        this.usernameInput = page.locator('[id="customer\\.username"]');
        this.passwordInput = page.locator('[id="customer\\.password"]');
        this.confirmPassInput = page.locator('#repeatedPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.welcomeMessage = page.locator('h1[class="title"]');
    }

    async enterSignupInfo(
        firsName: string, 
        lastName: string,
        address: string, 
        city: string, 
        state: string, 
        zip: string, 
        phone: string, 
        ssn: string, 
        username: string,
        password: string) {

        await this.page.waitForTimeout(100);
        await this.firstNameInput.fill(firsName);
        await this.lastNameInput.fill(lastName);
        await this.addressInput.fill(address);
        await this.cityInput.fill(city);
        await this.stateInput.fill(state);
        await this.zipInput.fill(zip);
        await this.phoneInput.fill(phone);
        await this.ssnInput.fill(ssn);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.confirmPassInput.fill(password);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async validateWelcomeMessage(username: string) {
        await expect(this.welcomeMessage).toContainText(`Welcome ${username}`);
    }
}
