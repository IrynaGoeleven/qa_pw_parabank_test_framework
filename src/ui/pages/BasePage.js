import { expect, testStep } from '../../common/helpers/pwHelpers';

export class BasePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertErrorMessageIsVisible(message) {
    await this.step(
      `Assert error message "${message}" is visible`,
      async () => {
        await expect(
          this.page.getByText(message, { exact: true }),
        ).toBeVisible();
      },
    );
  }
}
