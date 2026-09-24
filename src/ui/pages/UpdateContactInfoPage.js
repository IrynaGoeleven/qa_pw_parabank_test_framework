import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class UpdateContactInfoPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Update Profile' });
    this.firstNameField = page.locator('#customer\\.firstName');
    this.lastNameField = page.locator('#customer\\.lastName');
    this.addressField = page.locator('#customer\\.address\\.street');
    this.cityField = page.locator('#customer\\.address\\.city');
    this.stateField = page.locator('#customer\\.address\\.state');
    this.zipCodeField = page.locator('#customer\\.address\\.zipCode');
    this.phoneField = page.locator('#customer\\.phoneNumber');
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.successHeader = page.getByRole('heading', {
      name: 'Profile Updated',
    });
  }

  async open() {
    await this.step('Open Update Contact Info page', async () => {
      await this.page.goto('updateprofile.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Update Profile page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }

  async assertFormPrefilledWith(user) {
    await this.step(
      `Assert form is prefilled for ${user.firstName} ${user.lastName}`,
      async () => {
        await expect(this.firstNameField).toHaveValue(user.firstName);
        await expect(this.lastNameField).toHaveValue(user.lastName);
        await expect(this.addressField).toHaveValue(user.address);
        await expect(this.cityField).toHaveValue(user.city);
        await expect(this.stateField).toHaveValue(user.state);
        await expect(this.zipCodeField).toHaveValue(user.zipCode);
        await expect(this.phoneField).toHaveValue(user.phone);
      },
    );
  }

  async updateContactInfo(user) {
    await this.step(
      `Update contact info to ${user.firstName} ${user.lastName}`,
      async () => {
        await this.firstNameField.fill(user.firstName);
        await this.lastNameField.fill(user.lastName);
        await this.addressField.fill(user.address);
        await this.cityField.fill(user.city);
        await this.stateField.fill(user.state);
        await this.zipCodeField.fill(user.zipCode);
        await this.phoneField.fill(user.phone);
        await this.updateProfileButton.click();
      },
    );
  }

  async assertProfileUpdated() {
    await this.step('Assert profile is updated', async () => {
      await expect(this.successHeader).toBeVisible();
    });
  }
}
