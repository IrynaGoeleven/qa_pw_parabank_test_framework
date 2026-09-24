import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test('Log out returns user to the login page', async ({
  registeredUser,
  accountServicesPanel,
  homePage,
  accountsOverviewPage,
}) => {
  await allure.severity(allure.Severity.CRITICAL);

  await accountsOverviewPage.open();
  await accountServicesPanel.clickLink('Log Out');
  await homePage.assertLoginFormIsVisible();

  await accountsOverviewPage.open();
  await homePage.assertLoginFormIsVisible();
});
