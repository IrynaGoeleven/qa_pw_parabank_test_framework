import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test('Sign in with valid credentials', async ({
  existingUser,
  homePage,
  accountsOverviewPage,
  accountServicesPanel,
}) => {
  await allure.severity(allure.Severity.BLOCKER);

  const { username, password } = existingUser;

  await homePage.open();
  await homePage.login(username, password);
  await accountsOverviewPage.assertOpened();
  await accountServicesPanel.assertWelcomeMessage(firstName, lastName);
  );
});
