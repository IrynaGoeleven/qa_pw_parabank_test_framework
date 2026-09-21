import { expect } from '../../common/helpers/pwHelpers';
import { parseAmount } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class OpenNewAccountPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Open New Account' });
    this.accountTypeSelect = page.locator('#type');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.minimumDepositText = page.locator('#rightPanel p', {
      hasText: 'minimum of',
    });
    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.successHeader = page.getByRole('heading', { name: 'Account Opened!' });
    this.newAccountNumberLink = page.locator('#newAccountId');
  }

  async open() {
    await this.step('Open "Open New Account" page', async () => {
      await this.page.goto('openaccount.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Open New Account page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async getMinimumDeposit() {
    return await this.step('Get minimum deposit amount', async () => {
      await expect(this.minimumDepositText).toBeVisible();
      const text = await this.minimumDepositText.textContent();
      const [amount] = text.match(/\$[\d,]+\.\d{2}/);

      return parseAmount(amount);
    });
  }

  async selectAccountType(accountType) {
    await this.step(`Select account type: ${accountType}`, async () => {
      await this.accountTypeSelect.selectOption(accountType);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select source account: ${accountNumber}`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber);
    });
  }

  async clickOpenNewAccountButton() {
    await this.step('Click Open New Account button', async () => {
      await this.openNewAccountButton.click();
    });
  }

  async openAccount(accountType, fromAccountNumber) {
    await this.selectAccountType(accountType);
    await this.selectFromAccount(fromAccountNumber);
    await this.clickOpenNewAccountButton();

    return await this.step('Get new account number', async () => {
      await expect(this.newAccountNumberLink).toBeVisible();
      return await this.newAccountNumberLink.textContent();
    });
  }

  async assertAccountOpened() {
    await this.step('Assert account opened successfully', async () => {
      await expect(this.successHeader).toBeVisible();
      await expect(
        this.page.getByText('Congratulations, your account is now open.'),
      ).toBeVisible();
    });
  }
}
