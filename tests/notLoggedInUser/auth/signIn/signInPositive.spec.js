import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test('Sign in with valid credentials', async ({
  existingUser,
  homePage,
  accountsOverviewPage,
  accountServicesPanel,
}) => {
  await allure.severity(allure.Severity.BLOCKER);

  await homePage.open();
  await homePage.login(existingUser.username, existingUser.password);
  await accountsOverviewPage.assertOpened();
  await accountServicesPanel.assertWelcomeMessage(
    existingUser.firstName,
    existingUser.lastName,
  );
});
