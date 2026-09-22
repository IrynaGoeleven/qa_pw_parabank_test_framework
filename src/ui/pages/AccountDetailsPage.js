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
    this.activityPeriodSelect = page.locator('#month');
    this.transactionTypeSelect = page.locator('#transactionType');
    this.goButton = page.getByRole('button', { name: 'Go' });
    this.transactionRows = page.locator('#transactionTable tbody tr');
    this.noTransactionsMessage = page.getByText('No transactions found.');
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

  async open(accountNumber) {
    await this.step(`Open Account Details for ${accountNumber}`, async () => {
      await this.page.goto(`activity.htm?id=${accountNumber}`);
    });
  }

  async filterActivity({ period, type }) {
    await this.step(
      `Filter activity: period "${period}", type "${type}"`,
      async () => {
        await this.activityPeriodSelect.selectOption(period);
        await this.transactionTypeSelect.selectOption(type);

        const responsePromise = this.page.waitForResponse(response =>
          response.url().includes('/transactions'),
        );
        await this.goButton.click();
        await responsePromise;
      },
    );
  }

  async getColumnValues(columnNumber) {
    await expect(this.transactionRows.first()).toBeVisible();
    const values = await this.transactionRows
      .locator(`td:nth-child(${columnNumber})`)
      .allTextContents();

    return values.map(value => value.trim());
  }

  async assertAllTransactionsOfType(type) {
    await this.step(`Assert all transactions are of type ${type}`, async () => {
      const debits = await this.getColumnValues(3);
      const credits = await this.getColumnValues(4);
      const [filledColumn, emptyColumn] =
        type === 'Debit' ? [debits, credits] : [credits, debits];

      expect(
        filledColumn.every(value => value !== ''),
        `Every row must have a ${type} amount`,
      ).toBe(true);
      expect(
        emptyColumn.every(value => value === ''),
        `No row may have an amount in the opposite column`,
      ).toBe(true);
    });
  }

  async assertAllTransactionsInMonth(date) {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    await this.step(
      `Assert all transactions are dated ${month}-${year}`,
      async () => {
        const dates = await this.getColumnValues(1);

        expect(
          dates.every(
            value =>
              value.startsWith(`${month}-`) && value.endsWith(`-${year}`),
          ),
          `All dates must be in ${month}-${year}, got: ${dates.join(', ')}`,
        ).toBe(true);
      },
    );
  }

  async assertBothTransactionTypesPresent() {
    await this.step(
      'Assert both debit and credit transactions are listed',
      async () => {
        const debits = await this.getColumnValues(3);
        const credits = await this.getColumnValues(4);

        expect(
          debits.some(value => value !== ''),
          'At least one debit',
        ).toBe(true);
        expect(
          credits.some(value => value !== ''),
          'At least one credit',
        ).toBe(true);
      },
    );
  }

  async assertNoTransactionsFound() {
    await this.step('Assert "No transactions found" message', async () => {
      await expect(this.noTransactionsMessage).toBeVisible();
    });
  }
}
