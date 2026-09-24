import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class RequestLoanPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Apply for a Loan' });
    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.loanStatus = page.locator('#loanStatus');
    this.newAccountId = page.locator('#newAccountId');
    this.loanRequestApproved = page.locator('#loanRequestApproved');
    this.loanRequestDenied = page.locator('#loanRequestDenied');
  }

  async open() {
    await this.step('Open Request Loan page', async () => {
      await this.page.goto('requestloan.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Request Loan page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async requestLoan({ amount, downPayment, fromAccount }) {
    await this.step(
      `Request loan of ${amount} with down payment ${downPayment}`,
      async () => {
        await this.loanAmountField.fill(amount);
        await this.downPaymentField.fill(downPayment);
        await this.fromAccountSelect.selectOption(fromAccount);
        await this.applyNowButton.click();
      },
    );
  }

  async assertLoanApproved() {
    await this.step('Assert loan request is approved', async () => {
      await expect(this.loanRequestApproved).toBeVisible();
      await expect(this.loanStatus).toHaveText('Approved');
      await expect(this.newAccountId).not.toBeEmpty();
    });
  }

  async assertLoanDenied() {
    await this.step('Assert loan request is denied', async () => {
      await expect(this.loanRequestDenied).toBeVisible();
      await expect(this.loanStatus).toHaveText('Denied');
    });
  }
}
