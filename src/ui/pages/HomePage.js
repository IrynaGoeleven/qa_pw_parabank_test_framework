import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.customerLoginHeader = page.getByRole('heading', {
      name: 'Customer Login',
    });
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.forgotLoginInfoLink = page.getByRole('link', {
      name: 'Forgot login info?',
    });
    this.registerLink = page.getByRole('link', { name: 'Register' });
  }

  async open() {
    await this.step('Open Home page', async () => {
      await this.page.goto('index.htm');
    });
  }

  async assertLoginFormIsVisible() {
    await this.step('Assert login form is visible', async () => {
      await expect(this.customerLoginHeader).toBeVisible();
      await expect(this.usernameField).toBeVisible();
      await expect(this.passwordField).toBeVisible();
      await expect(this.logInButton).toBeVisible();
    });
  }

  async fillUsername(username) {
    await this.step(`Fill username: ${username}`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPassword(password) {
    await this.step('Fill password', async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step('Click Log In button', async () => {
      await this.logInButton.click();
    });
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogInButton();
  }

  async assertLoginErrorMessage(message) {
    await this.step(`Assert login error "${message}" is visible`, async () => {
      await expect(this.page.locator('#rightPanel .error')).toHaveText(message);
    });
  }
}
