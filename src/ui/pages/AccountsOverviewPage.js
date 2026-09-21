import { expect } from '../../common/helpers/pwHelpers';
import { parseAmount, formatAmount } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Accounts Overview' });
    this.accountTable = page.locator('#accountTable');
    this.accountRows = this.accountTable
      .locator('tbody tr')
      .filter({ has: page.locator('a') });
    this.totalRow = this.accountTable
      .locator('tbody tr')
      .filter({ hasText: 'Total' });
  }

  accountRow(accountNumber) {
    return this.accountRows.filter({
      has: this.page.getByRole('link', { name: accountNumber, exact: true }),
    });
  }

  async open() {
    await this.step('Open Accounts Overview page', async () => {
      await this.page.goto('overview.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Accounts Overview page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async getAccountNumbers() {
    return await this.step('Get account numbers', async () => {
      await expect(this.accountRows.first()).toBeVisible();
      return await this.accountRows.locator('a').allTextContents();
    });
  }

  async getAccountBalance(accountNumber) {
    return await this.step(
      `Get balance of account ${accountNumber}`,
      async () => {
        const balanceText = await this.accountRow(accountNumber)
          .locator('td')
          .nth(1)
          .textContent();
        return parseAmount(balanceText);
      },
    );
  }

  async clickAccount(accountNumber) {
    await this.step(`Click account ${accountNumber}`, async () => {
      await this.accountTable
        .getByRole('link', { name: accountNumber, exact: true })
        .click();
    });
  }

  async assertAccountsCount(expectedCount) {
    await this.step(`Assert accounts count is ${expectedCount}`, async () => {
      await expect(this.accountRows).toHaveCount(expectedCount);
    });
  }

  async assertTotalEqualsSumOfBalances() {
    await this.step('Assert Total equals sum of account balances', async () => {
      await expect(this.totalRow).toBeVisible();
      const balances = await this.accountRows
        .locator('td:nth-child(2)')
        .allTextContents();
      const sum = balances.map(parseAmount).reduce((a, b) => a + b, 0);
      const total = parseAmount(
        await this.totalRow.locator('td').nth(1).textContent(),
      );

      expect(total).toBeCloseTo(sum, 2);
    });
  }

  async assertAccountBalance(accountNumber, expectedBalance) {
    await this.step(
      `Assert balance of account ${accountNumber} is ${formatAmount(
        expectedBalance,
      )}`,
      async () => {
        await expect(
          this.accountRow(accountNumber).locator('td').nth(1),
        ).toHaveText(formatAmount(expectedBalance));
      },
    );
  }
}
