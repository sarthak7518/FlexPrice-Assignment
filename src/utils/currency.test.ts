import { describe, it, expect } from 'vitest';
import { formatCurrency, parseCurrencyInput, getCurrencySymbol, formatCurrencyFromMinor } from './currency';

describe('formatCurrency', () => {
	it('formats USD amount with $ symbol and two decimals', () => {
		expect(formatCurrency(1234.5)).toBe('$1,234.50');
	});

	it('formats zero as $0.00', () => {
		expect(formatCurrency(0)).toBe('$0.00');
	});

	it('formats negative amounts with a minus sign', () => {
		const result = formatCurrency(-99.9, 'USD');
		expect(result).toContain('99.90');
		expect(result).toContain('-');
	});

	it('formats EUR with euro symbol', () => {
		const result = formatCurrency(1234.5, 'EUR');
		expect(result).toContain('1,234.50');
	});

	it('formats GBP correctly', () => {
		const result = formatCurrency(50, 'GBP');
		expect(result).toContain('50.00');
	});

	it('rounds to two decimal places', () => {
		expect(formatCurrency(1.999)).toBe('$2.00');
	});

	it('handles very large amounts', () => {
		const result = formatCurrency(1000000);
		expect(result).toContain('1,000,000.00');
	});
});

describe('parseCurrencyInput', () => {
	it('parses a clean number string', () => {
		expect(parseCurrencyInput('1234.50')).toBe(1234.5);
	});

	it('strips $ symbol', () => {
		expect(parseCurrencyInput('$1,234.50')).toBe(1234.5);
	});

	it('strips € symbol', () => {
		expect(parseCurrencyInput('€99')).toBe(99);
	});

	it('returns NaN for empty string', () => {
		expect(parseCurrencyInput('')).toBeNaN();
	});

	it('returns NaN for non-numeric input', () => {
		expect(parseCurrencyInput('abc')).toBeNaN();
	});

	it('handles negative values', () => {
		expect(parseCurrencyInput('-$50.00')).toBe(-50);
	});

	it('handles whitespace-only input', () => {
		expect(parseCurrencyInput('   ')).toBeNaN();
	});
});

describe('getCurrencySymbol', () => {
	it('returns $ for USD', () => {
		expect(getCurrencySymbol('USD')).toBe('$');
	});

	it('returns € for EUR', () => {
		expect(getCurrencySymbol('EUR')).toBe('€');
	});

	it('is case-insensitive', () => {
		expect(getCurrencySymbol('usd')).toBe('$');
	});

	it('returns code for unknown currency', () => {
		expect(getCurrencySymbol('XYZ')).toBe('XYZ');
	});
});

describe('formatCurrencyFromMinor', () => {
	it('converts cents to dollars', () => {
		expect(formatCurrencyFromMinor(12345)).toBe('$123.45');
	});

	it('handles JPY without division', () => {
		const result = formatCurrencyFromMinor(1000, 'JPY');
		expect(result).toContain('1,000');
	});

	it('handles zero', () => {
		expect(formatCurrencyFromMinor(0)).toBe('$0.00');
	});
});
