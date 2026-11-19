const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartLink = page.locator('.shopping_cart_link');
  }

  async waitForPageLoad() {
    await this.inventoryContainer.waitFor({ state: 'visible' });
  }

  /**
   * Sorts products using option value (e.g., 'za', 'az', 'lohi', 'hilo')
   */
  async sortProductsBy(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
  }

  /**
   * Dynamically adds the first 'count' items from the current list and returns their names & prices
   * @param {number} count
   * @returns {Promise<Array<{name: string, price: number}>>}
   */
  async addFirstNItemsToCart(count) {
    await this.waitForPageLoad();
    const addedProducts = [];

    for (let i = 0; i < count; i++) {
      const item = this.inventoryItems.nth(i);
      const name = await item.locator('.inventory_item_name').textContent();
      const priceText = await item.locator('.inventory_item_price').textContent();
      const addButton = item.locator('button');

      await addButton.click();

      addedProducts.push({
        name: name.trim(),
        price: parseFloat(priceText.replace('$', '')),
      });
    }

    return addedProducts;
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = InventoryPage;