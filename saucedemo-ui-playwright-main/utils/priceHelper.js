/**
 * Extracts numeric float value from price text (e.g., "Item total: $29.99" -> 29.99)
 * @param {string} priceText
 * @returns {number}
 */
function parsePrice(priceText) {
  const cleaned = priceText.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned);
}

/**
 * Calculates sum of an array of prices rounded to 2 decimal places
 * @param {number[]} prices
 * @returns {number}
 */
function calculateSum(prices) {
  const sum = prices.reduce((acc, val) => acc + val, 0);
  return Number(sum.toFixed(2));
}

module.exports = {
  parsePrice,
  calculateSum,
};