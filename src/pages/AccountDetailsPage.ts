import { Locator, Page, expect } from '@playwright/test';

export default class AccountDetailsPage {
    readonly page: Page;
    
    readonly accountBalance: Locator;
    readonly activityPeriod: Locator;
    readonly transactionType: Locator;
    readonly goButton: Locator;
    readonly statementTable: Locator;
    readonly transactionHistory: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountBalance = page.locator('#balance');
        this.activityPeriod = page.locator('#month');
        this.transactionType= page.locator('#transactionType');
        this.goButton = page.getByRole('button', { name: 'Go' });
        this.statementTable = page.locator('#transactionTable');
        this.transactionHistory = page.locator('tr[ng-repeat="transaction in transactions"]').locator('td[class="ng-binding ng-scope"]');
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

    async validateApiBalance(responseBody: string) {
        expect(responseBody).toContain((await this.accountBalance.textContent())?.toString().substring(1));
    }

    async validateApiTransactionHistory(responseBody: string) {
        let transactions = await this.transactionHistory.all();
        const apiTransactions = await this.string_between_strings('<amount>','</amount>',responseBody);

        for(let i = 0; i < transactions.length; i++){
            const uiTransaction = (await transactions[i].textContent())?.toString().substring(1);
            expect(apiTransactions[i]).toEqual(uiTransaction);
        }
    }

    async string_between_strings(startTag: string, endTag: string, xmlString: string) {
        const amountStrings: string[] = [];
        let currentIndex = 0;

        while (true) {
            const startIndex = xmlString.indexOf(startTag, currentIndex);
            const endIndex = xmlString.indexOf(endTag, currentIndex);

            if (startIndex === -1 || endIndex === -1) {
                break;
            }

            const amountContent = xmlString.substring(startIndex + startTag.length, endIndex);
            amountStrings.push(amountContent);

            currentIndex = endIndex + endTag.length;
        }

        return amountStrings;
    }
}