# SauceDemo UI Automation Framework (Playwright JS)

An end-to-end UI automation framework built with **Playwright (JavaScript)** using the **Page Object Model (POM)** design pattern for [SauceDemo](https://www.saucedemo.com/).

## Automated Test Scenarios

- **Q1 (Locked Out User Verification):** Validates that `locked_out_user` is blocked from logging in and receives the appropriate error message.
- **Q2 (Standard User Full Purchase Flow):** Logs in as `standard_user`, resets app state, adds 3 items to the cart, verifies product names and price calculations (Item Total + Tax = Total), completes checkout, verifies the order confirmation message, resets app state, and logs out.
- **Q3 (Performance Glitch User Purchase Flow):** Logs in as `performance_glitch_user`, resets app state, filters products by **Name (Z to A)**, adds the first product to the cart, verifies product name and pricing at checkout, completes the purchase, resets app state, and logs out.

## Project Structure

```text
saucedemo-ui-playwright/
├── fixtures/           # Custom Playwright fixtures for POM injection
├── pages/              # Page Object classes (BasePage, Login, Inventory, Cart, Checkout)
├── test-data/          # Centralized credentials, customer info, and sort constants
├── tests/              # Isolated test specs (Q1, Q2, Q3) & Sequential suite
├── utils/              # Reusable helper functions (price parsing & math validation)
├── playwright.config.js
└── package.json