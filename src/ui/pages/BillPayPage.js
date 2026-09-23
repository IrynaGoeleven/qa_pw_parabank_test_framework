import { expect } from '../../common/helpers/pwHelpers';
import { formatAmount } from '../../common/helpers/stringHelpers';
import { BasePage } from './BasePage';

export class BillPayPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Bill Payment Service' });
    this.payeeNameField = page.locator('input[name="payee.name"]');
    this.addressField = page.locator('input[name="payee.address.street"]');
    this.cityField = page.locator('input[name="payee.address.city"]');
    this.stateField = page.locator('input[name="payee.address.state"]');
    this.zipCodeField = page.locator('input[name="payee.address.zipCode"]');
    this.phoneField = page.locator('input[name="payee.phoneNumber"]');
    this.accountNumberField = page.locator('input[name="payee.accountNumber"]');
    this.verifyAccountField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.fromAccountSelect = page.locator('select[name="fromAccountId"]');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.successHeader = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });
    this.rightPanel = page.locator('#rightPanel');
  }

  async open() {
    await this.step('Open Bill Pay page', async () => {
      await this.page.goto('billpay.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Bill Pay page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async fillPayeeInfo(payee) {
    await this.step(`Fill payee info for ${payee.name}`, async () => {
      await this.payeeNameField.fill(payee.name);
      await this.addressField.fill(payee.address);
      await this.cityField.fill(payee.city);
      await this.stateField.fill(payee.state);
      await this.zipCodeField.fill(payee.zipCode);
      await this.phoneField.fill(payee.phone);
      await this.accountNumberField.fill(payee.accountNumber);
      await this.verifyAccountField.fill(
        payee.verifyAccount ?? payee.accountNumber,
      );
    });
  }

  async fillAmount(amount) {
    await this.step(`Fill amount: ${amount}`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async selectFromAccount(accountNumber) {
    await this.step(`Select source account: ${accountNumber}`, async () => {
      await this.fromAccountSelect.selectOption(accountNumber);
    });
  }

  async clickSendPaymentButton() {
    await this.step('Click Send Payment button', async () => {
      await this.sendPaymentButton.click();
    });
  }

  async payBill({ payee, amount, fromAccount }) {
    await this.fillPayeeInfo(payee);
    await this.fillAmount(amount);
    await this.selectFromAccount(fromAccount);
    await this.clickSendPaymentButton();
  }

  async assertPaymentComplete({ payeeName, amount, fromAccount }) {
    await this.step('Assert bill payment is complete', async () => {
      await expect(this.successHeader).toBeVisible();
      await expect(this.rightPanel).toContainText(
        `Bill Payment to ${payeeName} in the amount of ${formatAmount(
          amount,
        )} from account ${fromAccount} was successful.`,
      );
    });
  }

  async assertFieldErrorIsVisible(errorId, message) {
    await this.step(`Assert error "${message}" for ${errorId}`, async () => {
      await expect(this.page.locator(`#${errorId}`)).toHaveText(message);
    });
  }

  async assertOnlyFieldErrorIsVisible(errorId, message) {
    await this.step(
      `Assert only "${message}" is shown for ${errorId}`,
      async () => {
        await expect(this.page.locator(`#${errorId}`)).toHaveText(message);
        await expect(
          this.page.locator('[id^=validationModel]:visible'),
        ).toHaveCount(1);
      },
    );
  }
}
