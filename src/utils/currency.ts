/**
 * Currency formatting and parsing utilities for the FlexPrice billing UI.
 *
 * These helpers centralise all money-related display logic so that every
 * surface in the app (invoices, plans, wallets, dashboards) formats
 * monetary values in a consistent, locale-aware way.
 */

/** Map of common currency codes to their symbols */
const CURRENCY_SYMBOLS: Record<string, string> = {
	USD: '$',
	EUR: '€',
	GBP: '£',
	JPY: '¥',
	INR: '₹',
	AUD: 'A$',
	CAD: 'C$',
	CHF: 'CHF',
	CNY: '¥',
	KRW: '₩',
	BRL: 'R$',
	SAR: '﷼',
};

/**
 * Return the symbol for a currency code, falling back to the code itself.
 *
 * @param currencyCode - ISO 4217 currency code (e.g. "USD", "EUR")
 * @returns The currency symbol (e.g. "$", "€") or the code if unknown
 */
export function getCurrencySymbol(currencyCode: string): string {
	return CURRENCY_SYMBOLS[currencyCode.toUpperCase()] ?? currencyCode.toUpperCase();
}

/**
 * Format a numeric amount as a human-readable currency string.
 *
 * @param amount   - The numeric value (e.g. 1234.5)
 * @param currency - ISO 4217 currency code (default "USD")
 * @param locale   - BCP-47 locale tag (default "en-US")
 * @returns Formatted string such as "$1,234.50"
 *
 * @example
 * ```ts
 * formatCurrency(1234.5)          // "$1,234.50"
 * formatCurrency(1234.5, 'EUR')   // "€1,234.50"
 * formatCurrency(0)               // "$0.00"
 * formatCurrency(-99.9, 'GBP')   // "-£99.90"
 * ```
 */
export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US'): string {
	try {
		return new Intl.NumberFormat(locale, {
			style: 'currency',
			currency,
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(amount);
	} catch {
		// Fallback for unknown currency codes
		const symbol = getCurrencySymbol(currency);
		const formatted = Math.abs(amount).toLocaleString(locale, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
		return `${amount < 0 ? '-' : ''}${symbol}${formatted}`;
	}
}

/**
 * Format an amount in its minor unit (cents) to a currency string.
 *
 * Many APIs return prices in cents / paise / pence.  This helper
 * converts from minor units before formatting.
 *
 * @param minorAmount - Amount in minor currency units (e.g. 12345 = $123.45)
 * @param currency    - ISO 4217 currency code
 * @returns Formatted string
 */
export function formatCurrencyFromMinor(minorAmount: number, currency = 'USD'): string {
	// JPY and KRW have no minor units
	const zeroDecimalCurrencies = ['JPY', 'KRW', 'VND'];
	const divisor = zeroDecimalCurrencies.includes(currency.toUpperCase()) ? 1 : 100;
	return formatCurrency(minorAmount / divisor, currency);
}

/**
 * Parse a raw user input string into a numeric value.
 *
 * Strips common formatting characters (commas, spaces, currency symbols)
 * and returns `NaN` when the input cannot be interpreted as a number.
 *
 * @param value - The raw string from an input field
 * @returns The parsed number, or NaN
 *
 * @example
 * ```ts
 * parseCurrencyInput('$1,234.50')  // 1234.5
 * parseCurrencyInput('€99')        // 99
 * parseCurrencyInput('abc')        // NaN
 * parseCurrencyInput('')           // NaN
 * ```
 */
export function parseCurrencyInput(value: string): number {
	if (!value || value.trim() === '') return NaN;

	// Strip currency symbols, commas, spaces
	const cleaned = value.replace(/[^0-9.\-]/g, '');
	if (cleaned === '' || cleaned === '-') return NaN;

	return parseFloat(cleaned);
}
