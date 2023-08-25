import { Locator, Page, expect } from '@playwright/test';

export default class TransferFundsPage {
    readonly page: Page;
    
    readonly amountInput: Locator;
    readonly transferButton: Locator;
    readonly transferCompleteMessage: Locator;
    readonly destinationAccount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.amountInput = page.locator('#amount');
        this.destinationAccount = page.locator('#fromAccountId');
        this.transferButton = page.getByRole('button', { name: 'Transfer' });
        this.transferCompleteMessage = page.getByRole('heading', { name: 'Transfer Complete!' });
    }

    async enterAmount(amount: string) {
        await this.page.waitForTimeout(100);
        await this.amountInput.fill(amount);
    }

    async selectDestinationAccount(accountNumber: string) {
        await this.destinationAccount.selectOption(accountNumber);
    }

    async clickTransferButton() {
        await this.transferButton.click();
    }

    async validateTransferCompleteMessage() {
        await expect(this.transferCompleteMessage).toBeVisible();
    }
}
