import { Locator, Page, expect } from '@playwright/test';

export default class AccountDetailsPage {
    readonly page: Page;
    
    readonly activityPeriod: Locator;
    readonly transactionType: Locator;
    readonly goButton: Locator;
    readonly statementTable: Locator;

    constructor(page: Page) {
        this.page = page;
        this.activityPeriod = page.locator('#month');
        this.transactionType= page.locator('#transactionType');
        this.goButton = page.getByRole('button', { name: 'Go' });
        this.statementTable = page.locator('#transactionTable');
    }

    async selectActivityPeriod(month: string) {
        await this.activityPeriod.selectOption(month);
    }

    async selectTransactionType(type: string) {
        await this.transactionType.selectOption(type);
    }

    async clickGoButton() {
        await this.goButton.click();
    }

    async validateStatementTablePresence() {
        await expect(this.statementTable).toBeVisible();
    }
}