import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { generateUser } from '../../../../src/common/helpers/testDataHelpers';

test('Update contact info with new valid data', async ({
  registeredUser,
  accountServicesPanel,
  updateContactInfoPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);
  const newData = generateUser();

  await accountServicesPanel.clickLink('Update Contact Info');
  await updateContactInfoPage.assertOpened();
  await updateContactInfoPage.assertFormPrefilledWith(registeredUser);
  await updateContactInfoPage.updateContactInfo(newData);
  await updateContactInfoPage.assertProfileUpdated();

  await updateContactInfoPage.open();
  await updateContactInfoPage.assertFormPrefilledWith(newData);
});
