class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // Role & Text based robust locators
    this.burgerMenuBtn = page.getByRole('button', { name: 'Open Menu' });
    this.burgerCloseBtn = page.getByRole('button', { name: 'Close Menu' });
    this.resetAppStateLink = page.getByText('Reset App State', { exact: true });
    this.logoutLink = page.getByText('Logout', { exact: true });
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async navigateTo(path = '/') {
    await this.page.goto(path);
  }

  async openSidebarMenu() {
    await this.burgerMenuBtn.waitFor({ state: 'visible' });
    await this.burgerMenuBtn.click();
    await this.resetAppStateLink.waitFor({ state: 'visible' });
  }

  async closeSidebarMenu() {
    if (await this.burgerCloseBtn.isVisible()) {
      await this.burgerCloseBtn.click();
      await this.burgerCloseBtn.waitFor({ state: 'hidden' });
    }
  }

  async resetAppState() {
    await this.openSidebarMenu();
    await this.resetAppStateLink.click();
    await this.closeSidebarMenu();
  }

  async logout() {
    await this.openSidebarMenu();
    await this.logoutLink.click();
  }
}

module.exports = BasePage;