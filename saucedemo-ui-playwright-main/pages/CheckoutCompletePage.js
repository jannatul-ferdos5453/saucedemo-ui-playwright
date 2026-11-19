const BasePage = require('./BasePage');

class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.completeHeader = page.locator('[data-test="complete-header"]');
  }

  async getOrderSuccessMessage() {
    await this.completeHeader.waitFor({ state: 'visible' });
    return (await this.completeHeader.textContent()).trim();
  }
}

module.exports = CheckoutCompletePage;