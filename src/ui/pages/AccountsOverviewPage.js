import { expect } from '../../common/helpers/pwHelpers';
import { BasePage } from './BasePage';

export class AccountsOverviewPage extends BasePage {
  constructor(page, userId = 0) {
    super(page, userId);
    this.header = page.getByRole('heading', { name: 'Accounts Overview' });
  }

  async open() {
    await this.step('Open Accounts Overview page', async () => {
      await this.page.goto('overview.htm');
    });
  }

  async assertOpened() {
    await this.step('Assert Accounts Overview page is opened', async () => {
      await expect(this.header).toBeVisible();
    });
  }
}
