import { expect } from '../../common/helpers/pwHelpers';
import { formatAmount } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class FindTransactionsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Find Transactions' });
    this.accountSelect = page.locator('#accountId');
    this.transactionIdField = page.locator('#transactionId');
    this.findByIdButton = page.locator('#findById');
    this.dateField = page.locator('#transactionDate');
    this.findByDateButton = page.locator('#findByDate');
    this.fromDateField = page.locator('#fromDate');
    this.toDateField = page.locator('#toDate');
    this.findByDateRangeButton = page.locator('#findByDateRange');
    this.amountField = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');
    this.resultRows = page.locator('#transactionBody tr');
    this.errorMessages = page.locator('#rightPanel .error:visible');
  }

  async open() {
    await this.step('Open Find Transactions page', async () => {
      await this.page.goto('findtrans.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Find Transactions page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async selectAccount(accountNumber) {
    await this.step(`Select account ${accountNumber}`, async () => {
      await this.accountSelect.selectOption(accountNumber);
    });
  }

  async clickFind(button, { expectRequest = true } = {}) {
    await this.step('Submit search', async () => {
      if (!expectRequest) {
        await button.click();
        return;
      }

      const responsePromise = this.page.waitForResponse(response =>
        response.url().includes('/transactions'),
      );
      await button.click();
      await responsePromise;
    });
  }

  async findByAmount(amount, options) {
    await this.step(`Find transactions by amount ${amount}`, async () => {
      await this.amountField.fill(String(amount));
      await this.clickFind(this.findByAmountButton, options);
    });
  }

  async findByDate(date) {
    await this.step(`Find transactions by date ${date}`, async () => {
      await this.dateField.fill(date);
      await this.clickFind(this.findByDateButton);
    });
  }

  async findByDateRange(fromDate, toDate) {
    await this.step(
      `Find transactions between ${fromDate} and ${toDate}`,
      async () => {
        await this.fromDateField.fill(fromDate);
        await this.toDateField.fill(toDate);
        await this.clickFind(this.findByDateRangeButton);
      },
    );
  }

  async assertResultsContainAmount(amount) {
    await this.step(
      `Assert results contain ${formatAmount(amount)}`,
      async () => {
        await expect(this.resultRows.first()).toBeVisible();
        await expect(
          this.resultRows.filter({ hasText: formatAmount(amount) }).first(),
        ).toBeVisible();
      },
    );
  }

  async assertResultsAreNotEmpty() {
    await this.step('Assert search results are not empty', async () => {
      await expect(this.resultRows.first()).toBeVisible();
    });
  }

  async assertValidationErrorIsVisible() {
    await this.step('Assert validation error is visible', async () => {
      await expect(this.errorMessages.first()).toBeVisible();
    });
  }

  async assertSearchIsNotSent(action) {
    await this.step('Assert search request is not sent', async () => {
      let requestSent = false;
      const listener = request => {
        if (request.url().includes('/transactions')) {
          requestSent = true;
        }
      };

      this.page.on('request', listener);
      await action();
      await this.page.waitForTimeout(1000);
      this.page.off('request', listener);

      expect(requestSent, 'Search request must not be sent').toBe(false);
    });
  }
}
