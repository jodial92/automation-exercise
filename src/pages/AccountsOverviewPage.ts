import { Locator, Page, expect } from '@playwright/test';

export default class AccountsOverviewPage {
    readonly page: Page;
    
    readonly amountInput: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async clickOnAccount(accountNumber: string) {
        await this.page.getByRole('link', { name: `${accountNumber}` }).click();
    }
}
