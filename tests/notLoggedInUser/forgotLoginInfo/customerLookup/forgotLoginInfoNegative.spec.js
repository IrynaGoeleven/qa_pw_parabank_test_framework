import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { generateUser } from '../../../../src/common/helpers/testDataHelpers';
import { customerRequiredFields } from '../../../../src/common/testData/requiredFieldErrors';

for (const { field, error } of customerRequiredFields) {
  test(`Lookup fails when ${field} is empty`, async ({
    forgotLoginInfoPage,
  }) => {
    await allure.severity(allure.Severity.NORMAL);
    const customer = { ...generateUser(), [field]: '' };

    await forgotLoginInfoPage.open();
    await forgotLoginInfoPage.findLoginInfo(customer);
    await forgotLoginInfoPage.assertErrorMessageIsVisible(error);
  });
}

test('Lookup fails for non-existent customer', async ({
  forgotLoginInfoPage,
}) => {
  await allure.severity(allure.Severity.NORMAL);

  await forgotLoginInfoPage.open();
  await forgotLoginInfoPage.findLoginInfo(generateUser());
  await forgotLoginInfoPage.assertErrorMessageIsVisible(
    'The customer information provided could not be found.',
  );
});
