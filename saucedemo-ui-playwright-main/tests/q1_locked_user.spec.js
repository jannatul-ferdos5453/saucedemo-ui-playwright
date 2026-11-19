const { test, expect } = require('../fixtures/pomFixtures');
const users = require('../test-data/users.json');
const checkoutData = require('../test-data/checkout.json');

test.describe('Q1: Locked Out User Authentication', () => {
  test('Verify error message when logging in with locked_out_user', async ({ loginPage }) => {
    await loginPage.navigateTo('/');
    await loginPage.login(users.lockedOutUser, users.password);

    const actualError = await loginPage.getErrorMessage();
    expect(actualError).toContain(checkoutData.messages.lockedOutError);
  });
});