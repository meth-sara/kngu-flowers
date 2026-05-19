export const EXCHANGE_RATE = 300;
export const CURRENCY_SYMBOL = "Rs.";
export const CURRENCY_CODE = "LKR";

/**
 * Formats a price value (assumed to be in USD internally if converted, 
 * or already in LKR if data is updated) to Sri Lankan Rupee format.
 * Currently, we will assume input is the LKR value.
 */
export function formatPrice(amount: number, showCode = false): string {
  const formatted = new Intl.NumberFormat('en-LK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return showCode ? `${CURRENCY_CODE} ${formatted}` : `${CURRENCY_SYMBOL} ${formatted}`;
}

export function formatPriceCompact(amount: number): string {
  const formatted = new Intl.NumberFormat('en-LK', {
    maximumFractionDigits: 0,
  }).format(amount);

  return `${CURRENCY_SYMBOL} ${formatted}`;
}
