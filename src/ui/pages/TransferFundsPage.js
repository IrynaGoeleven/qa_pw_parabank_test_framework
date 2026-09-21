import { expect } from '../../common/helpers/pwHelpers';
import { formatAmount } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class TransferFundsPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Transfer Funds' });
    this.amountField = page.locator('#amount');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.toAccountSelect = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });
    this.successHeader = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });
    this.rightPanel = page.locator('#rightPanel');
  }

  async open() {
    await this.step('Open Transfer Funds page', async () => {
      await this.page.goto('transfer.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Transfer Funds page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill amount: ${amount}`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select from account: ${accountNumber}`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber);
    });
  }

  async selectToAccount(accountNumber) {
    await this.step(`Select to account: ${accountNumber}`, async () => {
      await this.toAccountSelect.selectOption(accountNumber);
    });
  }

  async clickTransferButton() {
    return await this.step('Click Transfer button', async () => {
      const responsePromise = this.page.waitForResponse(
        response =>
          response.url().includes('/bank/transfer') &&
          response.request().method() === 'POST',
      );
      await this.transferButton.click();

      return await responsePromise;
    });
  }

  async transfer({ amount, from, to }) {
    await this.fillAmount(amount);
    await this.selectFromAccount(from);
    await this.selectToAccount(to);

    return await this.clickTransferButton();
  }

  async assertTransferRejected(response) {
    await this.step('Assert transfer is rejected', async () => {
      expect(response.status(), 'Transfer API response status').toBe(400);
      await expect(this.successHeader).toBeHidden();
    });
  }

  async assertTransferComplete({ amount, from, to }) {
    await this.step('Assert transfer is complete', async () => {
      await expect(this.successHeader).toBeVisible();
      await expect(this.rightPanel).toContainText(
        `${formatAmount(amount)} has been transferred from account #${from} ` +
          `to account #${to}.`,
      );
    });
  }
}
