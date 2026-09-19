import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';

test('Login form is displayed on the Home page', async ({ homePage }) => {
  await allure.severity(allure.Severity.NORMAL);

  await homePage.open();
  await homePage.assertLoginFormIsVisible();
});
