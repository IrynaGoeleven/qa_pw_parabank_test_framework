import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from '../pages/BasePage';

export class AccountServicesPanel extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.panel = page.locator('#leftPanel');
  }

  async clickLink(linkName) {
    await this.step(
      `Click "${linkName}" in Account Services menu`,
      async () => {
        await this.panel.getByRole('link', { name: linkName }).click();
      },
    );
  }

  async assertWelcomeMessage(firstName, lastName) {
    await this.step(
      `Assert welcome message for ${firstName} ${lastName}`,
      async () => {
        await expect(
          this.panel.getByText(`Welcome ${firstName} ${lastName}`),
        ).toBeVisible();
      },
    );
  }
}
