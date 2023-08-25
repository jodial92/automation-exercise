import { Locator, Page, expect } from '@playwright/test';

export default class UpdateContactInfoPage {
    readonly page: Page;
    
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly updateProfileButton: Locator;
    readonly profileUpdatedMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[id="customer\\.firstName"]');
        this.lastNameInput = page.locator('[id="customer\\.lastName"]');
        this.updateProfileButton = page.getByRole('button', { name: 'Update Profile' });
        this.profileUpdatedMessage = page.getByRole('heading', { name: 'Profile Updated' });
    }

    async enterFirstName(firstName: string) {
        await this.page.waitForTimeout(100);
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    async clickUpdateProfileButton() {
        await this.updateProfileButton.click();
    }

    async validateProfileUpdatedMessage() {
        await expect(this.profileUpdatedMessage).toBeVisible();
    }
}
