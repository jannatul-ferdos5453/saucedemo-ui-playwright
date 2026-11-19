const { test, expect } = require('../fixtures/pomFixtures');
const users = require('../test-data/users.json');
const checkoutData = require('../test-data/checkout.json');
const { calculateSum } = require('../utils/priceHelper');

test.describe('Q2: Standard User Full Purchase Flow', () => {
  test('Complete purchase with 3 items, verify prices, reset state and logout', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
  }) => {
    // 1. Login & Reset App State
    await loginPage.navigateTo('/');
    await loginPage.login(users.standardUser, users.password);
    await inventoryPage.waitForPageLoad();
    await inventoryPage.resetAppState();

    // 2. Add any 3 items to the cart
    const selectedProducts = await inventoryPage.addFirstNItemsToCart(3);
    const expectedNames = selectedProducts.map((item) => item.name);
    const expectedItemSubtotal = calculateSum(selectedProducts.map((item) => item.price));

    // 3. Navigate to Cart & Checkout
    await inventoryPage.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.fillCustomerDetails(
      checkoutData.customerInfo.firstName,
      checkoutData.customerInfo.lastName,
      checkoutData.customerInfo.postalCode
    );

    // 4. Final Checkout Page: Verify Product Names & Total Price
    const actualNames = await checkoutStepTwoPage.getCheckoutProductNames();
    expect(actualNames).toEqual(expectedNames);

    const { itemTotal, tax, total } = await checkoutStepTwoPage.getPriceBreakdown();
    expect(itemTotal).toBe(expectedItemSubtotal);
    expect(total).toBe(calculateSum([itemTotal, tax]));

    // 5. Finish Purchase & Verify Success Message
    await checkoutStepTwoPage.finishOrder();
    const successMsg = await checkoutCompletePage.getOrderSuccessMessage();
    expect(successMsg).toBe(checkoutData.messages.orderSuccess);

    // 6. Reset App State again and Logout
    await checkoutCompletePage.resetAppState();
    await checkoutCompletePage.logout();
    await expect(page).toHaveURL(/.*saucedemo\.com\/$/);
  });
});