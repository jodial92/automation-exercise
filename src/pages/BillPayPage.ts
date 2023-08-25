import { Locator, Page, expect } from '@playwright/test';

export default class BillPayPage {
    readonly page: Page;
    readonly payeeNameInput: Locator;
    readonly payeeAddressInput: Locator;
    readonly payeeCityInput: Locator;
    readonly payeeStateInput: Locator;
    readonly payeeZipInput: Locator;
    readonly payeePhoneInput: Locator;
    readonly payeeAccountInput: Locator;
    readonly payeeVerifyAccountInput: Locator;
    readonly tranferAmount: Locator;
    readonly sendPaymentButton: Locator;
    readonly billPaymentCompleteMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.payeeNameInput = page.locator('input[name="payee\\.name"]');
        this.payeeAddressInput = page.locator('input[name="payee\\.address\\.street"]');
        this.payeeCityInput = page.locator('input[name="payee\\.address\\.city"]');
        this.payeeStateInput = page.locator('input[name="payee\\.address\\.state"]');
        this.payeeZipInput = page.locator('input[name="payee\\.address\\.zipCode"]');
        this.payeePhoneInput = page.locator('input[name="payee\\.phoneNumber"]');
        this.payeeAccountInput = page.locator('input[name="payee\\.accountNumber"]');
        this.payeeVerifyAccountInput = page.locator('input[name="verifyAccount"]');
        this.tranferAmount = page.locator('input[name="amount"]');
        this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
        this.billPaymentCompleteMessage = page.getByRole('heading', { name: 'Bill Payment Complete' });
    }

    async enterBillPaymentInfo(
        name: string, 
        addres: string, 
        city: string, 
        state: string, 
        zip: string, 
        phone: string, 
        account: string, 
        amount: string) {

        await this.payeeNameInput.fill(name);
        await this.payeeAddressInput.fill(addres);
        await this.payeeCityInput.fill(city);
        await this.payeeStateInput.fill(state);
        await this.payeeZipInput.fill(zip);
        await this.payeePhoneInput.fill(phone);
        await this.payeeAccountInput.fill(account);
        await this.payeeVerifyAccountInput.fill(account);
        await this.tranferAmount.fill(amount);
    }

    async clickSendPaymentButton() {
        await this.sendPaymentButton.click();
    }

    async validateBillPaymentCompleteMessage() {
        await expect(this.billPaymentCompleteMessage).toBeVisible();
    }
}
