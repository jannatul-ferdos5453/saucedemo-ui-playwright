const BasePage = require('./BasePage');
const { parsePrice } = require('../utils/priceHelper');

class CheckoutStepTwoPage extends BasePage {
  constructor(page) {
    super(page);
    this.itemNames = page.locator('.inventory_item_name');
    this.itemTotalLabel = page.locator('.summary_subtotal_label');
    this.taxLabel = page.locator('.summary_tax_label');
    this.totalLabel = page.locator('.summary_total_label');
    this.finishButton = page.locator('[data-test="finish"]');
  }

  /**
   * Returns an array of all product names displayed on the final checkout overview
   * @returns {Promise<string[]>}
   */
  async getCheckoutProductNames() {
    const names = await this.itemNames.allTextContents();
    return names.map((name) => name.trim());
  }

  /**
   * Extracts numeric Item Total, Tax, and Total Price
   */
  async getPriceBreakdown() {
    const itemTotalText = await this.itemTotalLabel.textContent();
    const taxText = await this.taxLabel.textContent();
    const totalText = await this.totalLabel.textContent();

    return {
      itemTotal: parsePrice(itemTotalText),
      tax: parsePrice(taxText),
      total: parsePrice(totalText),
    };
  }

  async finishOrder() {
    await this.finishButton.click();
  }
}

module.exports = CheckoutStepTwoPage;