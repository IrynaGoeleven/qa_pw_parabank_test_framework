import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class ForgotLoginInfoPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Customer Lookup' });
    this.firstNameField = page.locator('input[name="firstName"]');
    this.lastNameField = page.locator('input[name="lastName"]');
    this.addressField = page.locator('input[name="address.street"]');
    this.cityField = page.locator('input[name="address.city"]');
    this.stateField = page.locator('input[name="address.state"]');
    this.zipCodeField = page.locator('input[name="address.zipCode"]');
    this.ssnField = page.locator('input[name="ssn"]');
    this.findLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.rightPanel = page.locator('#rightPanel');
  }

  async open() {
    await this.step('Open Forgot Login Info page', async () => {
      await this.page.goto('lookup.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Customer Lookup page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async fillCustomerInfo(customer) {
    await this.step(
      `Fill customer info for ${customer.firstName} ${customer.lastName}`,
      async () => {
        await this.firstNameField.fill(customer.firstName);
        await this.lastNameField.fill(customer.lastName);
        await this.addressField.fill(customer.address);
        await this.cityField.fill(customer.city);
        await this.stateField.fill(customer.state);
        await this.zipCodeField.fill(customer.zipCode);
        await this.ssnField.fill(customer.ssn);
      },
    );
  }

  async clickFindLoginInfoButton() {
    await this.step('Click Find My Login Info button', async () => {
      await this.findLoginInfoButton.click();
    });
  }

  async findLoginInfo(customer) {
    await this.fillCustomerInfo(customer);
    await this.clickFindLoginInfoButton();
  }

  async assertLoginInfoIsShown(username, password) {
    await this.step(`Assert login info is shown for ${username}`, async () => {
      await expect(
        this.page.getByText(
          'Your login information was located successfully. ' +
            'You are now logged in.',
        ),
      ).toBeVisible();
      await expect(this.rightPanel).toContainText(`Username: ${username}`);
      await expect(this.rightPanel).toContainText(`Password: ${password}`);
    });
  }
}
