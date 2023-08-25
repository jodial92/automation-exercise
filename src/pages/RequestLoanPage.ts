import { Locator, Page, expect } from '@playwright/test';

export default class RequestLoanPage {
    readonly page: Page;
    
    readonly loanAmountInput: Locator;
    readonly downPaymentInput: Locator;
    readonly applyNowButton: Locator;
    readonly originAccount: Locator;
    readonly loanRequestProcessedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loanAmountInput = page.locator('#amount');
        this.downPaymentInput = page.locator('#downPayment');
        this.originAccount = page.locator('#fromAccountId');
        this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
        this.loanRequestProcessedMessage = page.getByRole('heading', { name: 'Loan Request Processed' });
    }

    async enterLoanInfo(
        loanAmount: string, 
        downPayment: string) {

        await this.loanAmountInput.fill(loanAmount);
        await this.downPaymentInput.fill(downPayment);
    }

    async selectOriginAccount(accountNumber: string) {
        await this.originAccount.selectOption(accountNumber);
    }

    async clickAppyNowButton() {
        await this.applyNowButton.click();
    }

    async validateBillPaymentCompleteMessage() {
        await expect(this.loanRequestProcessedMessage).toBeVisible();
    }
}
