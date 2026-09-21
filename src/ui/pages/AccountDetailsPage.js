import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';
import { formatAmount } from '../../common/helpers/stringHelpers';

export class AccountDetailsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Account Details' });
    this.accountNumber = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');
  }

  async assertOpened() {
    await this.step('Assert Account Details page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async assertAccountDetails({ accountNumber, accountType, balance }) {
    await this.step(`Assert details of account ${accountNumber}`, async () => {
      await expect(this.accountNumber).toHaveText(accountNumber);
      await expect(this.accountType).toHaveText(accountType);
      await expect(this.balance).toContainText(formatAmount(balance));
    });
  }
}
