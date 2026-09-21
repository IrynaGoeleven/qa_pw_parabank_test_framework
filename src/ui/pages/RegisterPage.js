import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.firstNameField = page.locator('input[name="customer.firstName"]');
    this.lastNameField = page.locator('input[name="customer.lastName"]');
    this.addressField = page.locator('input[name="customer.address.street"]');
    this.cityField = page.locator('input[name="customer.address.city"]');
    this.stateField = page.locator('input[name="customer.address.state"]');
    this.zipCodeField = page.locator('input[name="customer.address.zipCode"]');
    this.phoneField = page.locator('input[name="customer.phoneNumber"]');
    this.ssnField = page.locator('input[name="customer.ssn"]');
    this.usernameField = page.locator('input[name="customer.username"]');
    this.passwordField = page.locator('input[name="customer.password"]');
    this.confirmPasswordField = page.locator('input[name="repeatedPassword"]');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async open() {
    await this.step('Open Register page', async () => {
      await this.page.goto('register.htm');
    });
  }

  async fillRegistrationForm(user) {
    await this.step(`Fill registration form for ${user.username}`, async () => {
      await this.firstNameField.fill(user.firstName);
      await this.lastNameField.fill(user.lastName);
      await this.addressField.fill(user.address);
      await this.cityField.fill(user.city);
      await this.stateField.fill(user.state);
      await this.zipCodeField.fill(user.zipCode);
      await this.phoneField.fill(user.phone);
      await this.ssnField.fill(user.ssn);
      await this.usernameField.fill(user.username);
      await this.passwordField.fill(user.password);
      await this.confirmPasswordField.fill(
        user.confirmPassword ?? user.password,
      );
    });
  }

  async clickRegisterButton() {
    await this.step('Click Register button', async () => {
      await this.registerButton.click();
    });
  }

  async register(user) {
    await this.fillRegistrationForm(user);
    await this.clickRegisterButton();
  }

  async assertSuccessfulRegistration(username) {
    await this.step('Assert successful registration message', async () => {
      await expect(
        this.page.getByRole('heading', { name: `Welcome ${username}` }),
      ).toBeVisible();
      await expect(
        this.page.getByText(
          'Your account was created successfully. You are now logged in.',
        ),
      ).toBeVisible();
    });
  }
}
