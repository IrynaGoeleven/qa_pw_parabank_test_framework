import { test as base } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { RegisterPage } from '../../src/ui/pages/RegisterPage';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { AccountServicesPanel } from '../../src/ui/components/AccountServicesPanel';
import { ForgotLoginInfoPage } from '../../src/ui/pages/ForgotLoginInfoPage';
import { AccountDetailsPage } from '../../src/ui/pages/AccountDetailsPage';

export const test = base.extend<{
  homePage: HomePage;
  registerPage: RegisterPage;
  accountsOverviewPage: AccountsOverviewPage;
  accountServicesPanel: AccountServicesPanel;
  forgotLoginInfoPage: ForgotLoginInfoPage;
  accountDetailsPage: AccountDetailsPage;
}>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },
  accountsOverviewPage: async ({ page }, use) => {
    await use(new AccountsOverviewPage(page));
  },
  accountServicesPanel: async ({ page }, use) => {
    await use(new AccountServicesPanel(page));
  },
  forgotLoginInfoPage: async ({ page }, use) => {
    await use(new ForgotLoginInfoPage(page));
  },
  accountDetailsPage: async ({ page }, use) => {
    await use(new AccountDetailsPage(page));
  },
});
