import { describe, it, expect } from 'vitest';
import { calculateGraduatedPrice, calculateVolumePrice, formatTierRange, formatUnitPrice, type PricingTier } from './tierPricing';

const sampleTiers: PricingTier[] = [
	{ firstUnit: 1, lastUnit: 100, unitPrice: 10 },
	{ firstUnit: 101, lastUnit: 500, unitPrice: 8 },
	{ firstUnit: 501, lastUnit: Infinity, unitPrice: 5 },
];

describe('calculateGraduatedPrice', () => {
	it('returns 0 for zero usage', () => {
		expect(calculateGraduatedPrice(sampleTiers, 0)).toBe(0);
	});

	it('returns 0 for negative usage', () => {
		expect(calculateGraduatedPrice(sampleTiers, -10)).toBe(0);
	});

	it('returns 0 for empty tiers', () => {
		expect(calculateGraduatedPrice([], 100)).toBe(0);
	});

	it('calculates price within first tier', () => {
		expect(calculateGraduatedPrice(sampleTiers, 50)).toBe(50 * 10);
	});

	it('calculates price spanning two tiers', () => {
		// 100 * 10 + 50 * 8 = 1400
		expect(calculateGraduatedPrice(sampleTiers, 150)).toBe(1400);
	});

	it('calculates price spanning all tiers', () => {
		// 100 * 10 + 400 * 8 + 100 * 5 = 1000 + 3200 + 500 = 4700
		expect(calculateGraduatedPrice(sampleTiers, 600)).toBe(4700);
	});

	it('handles flat fees', () => {
		const tiers: PricingTier[] = [
			{ firstUnit: 1, lastUnit: 10, unitPrice: 5, flatFee: 20 },
			{ firstUnit: 11, lastUnit: Infinity, unitPrice: 3 },
		];
		// 10 * 5 + 20 + 5 * 3 = 50 + 20 + 15 = 85
		expect(calculateGraduatedPrice(tiers, 15)).toBe(85);
	});

	it('handles exact tier boundary', () => {
		expect(calculateGraduatedPrice(sampleTiers, 100)).toBe(100 * 10);
	});
});

describe('calculateVolumePrice', () => {
	it('returns 0 for zero usage', () => {
		expect(calculateVolumePrice(sampleTiers, 0)).toBe(0);
	});

	it('uses tier rate for all units when in first tier', () => {
		expect(calculateVolumePrice(sampleTiers, 50)).toBe(50 * 10);
	});

	it('uses tier rate for all units when in second tier', () => {
		expect(calculateVolumePrice(sampleTiers, 200)).toBe(200 * 8);
	});

	it('uses tier rate for all units when in last tier', () => {
		expect(calculateVolumePrice(sampleTiers, 1000)).toBe(1000 * 5);
	});

	it('includes flat fee for volume pricing', () => {
		const tiers: PricingTier[] = [{ firstUnit: 1, lastUnit: 100, unitPrice: 10, flatFee: 50 }];
		expect(calculateVolumePrice(tiers, 50)).toBe(50 * 10 + 50);
	});
});

describe('formatTierRange', () => {
	it('formats a bounded range', () => {
		expect(formatTierRange({ firstUnit: 1, lastUnit: 100, unitPrice: 10 })).toBe('1 – 100 units');
	});

	it('formats an unbounded range with + suffix', () => {
		expect(formatTierRange({ firstUnit: 101, lastUnit: Infinity, unitPrice: 5 })).toBe('101+ units');
	});

	it('formats large numbers with locale separators', () => {
		expect(formatTierRange({ firstUnit: 1001, lastUnit: 10000, unitPrice: 2 })).toBe('1,001 – 10,000 units');
	});
});

describe('formatUnitPrice', () => {
	it('formats USD unit price', () => {
		expect(formatUnitPrice(10, 'USD')).toBe('$10.00 / unit');
	});

	it('formats small USD unit price with 4 decimals', () => {
		expect(formatUnitPrice(0.0025, 'USD')).toBe('$0.0025 / unit');
	});

	it('formats EUR', () => {
		expect(formatUnitPrice(5, 'EUR')).toBe('€5.00 / unit');
	});
});
