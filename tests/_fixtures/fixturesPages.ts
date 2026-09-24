import { test as base } from '@playwright/test';
import { HomePage } from '../../src/ui/pages/HomePage';
import { RegisterPage } from '../../src/ui/pages/RegisterPage';
import { AccountsOverviewPage } from '../../src/ui/pages/AccountsOverviewPage';
import { AccountServicesPanel } from '../../src/ui/components/AccountServicesPanel';
import { ForgotLoginInfoPage } from '../../src/ui/pages/ForgotLoginInfoPage';
import { AccountDetailsPage } from '../../src/ui/pages/AccountDetailsPage';
import { OpenNewAccountPage } from '../../src/ui/pages/OpenNewAccountPage';
import { TransferFundsPage } from '../../src/ui/pages/TransferFundsPage';
import { BillPayPage } from '../../src/ui/pages/BillPayPage';
import { FindTransactionsPage } from '../../src/ui/pages/FindTransactionsPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/UpdateContactInfoPage';
import { RequestLoanPage } from '../../src/ui/pages/RequestLoanPage';

export const test = base.extend<{
  homePage: HomePage;
  registerPage: RegisterPage;
  accountsOverviewPage: AccountsOverviewPage;
  accountServicesPanel: AccountServicesPanel;
  forgotLoginInfoPage: ForgotLoginInfoPage;
  accountDetailsPage: AccountDetailsPage;
  openNewAccountPage: OpenNewAccountPage;
  transferFundsPage: TransferFundsPage;
  billPayPage: BillPayPage;
  findTransactionsPage: FindTransactionsPage;
  updateContactInfoPage: UpdateContactInfoPage;
  requestLoanPage: RequestLoanPage;
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
  openNewAccountPage: async ({ page }, use) => {
    await use(new OpenNewAccountPage(page));
  },
  transferFundsPage: async ({ page }, use) => {
    await use(new TransferFundsPage(page));
  },
  billPayPage: async ({ page }, use) => {
    await use(new BillPayPage(page));
  },
  findTransactionsPage: async ({ page }, use) => {
    await use(new FindTransactionsPage(page));
  },
  updateContactInfoPage: async ({ page }, use) => {
    await use(new UpdateContactInfoPage(page));
  },
  requestLoanPage: async ({ page }, use) => {
    await use(new RequestLoanPage(page));
  },
});
