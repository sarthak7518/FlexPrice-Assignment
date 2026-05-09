/**
 * Tier pricing calculation utilities for FlexPrice.
 *
 * FlexPrice supports graduated (staircase) and volume-based pricing.
 * These helpers compute the total price for a given usage quantity
 * across a set of pricing tiers, and format tier ranges for display.
 */

/** A single pricing tier definition */
export interface PricingTier {
	/** First unit in the tier (inclusive, 1-based) */
	firstUnit: number;
	/** Last unit in the tier (inclusive). Use Infinity for unbounded top tiers. */
	lastUnit: number;
	/** Price per unit in this tier */
	unitPrice: number;
	/** Optional flat fee applied once when this tier is reached */
	flatFee?: number;
}

/**
 * Calculate the total cost for a given usage using **graduated** pricing.
 *
 * In graduated pricing each unit is priced at the rate of the tier it
 * falls into.  For example, if tier 1 is $10/unit for units 1-100 and
 * tier 2 is $8/unit for units 101-500, then 150 units cost
 * (100 × $10) + (50 × $8) = $1,400.
 *
 * @param tiers - Sorted array of pricing tiers
 * @param usage - Total number of units consumed
 * @returns Total cost
 *
 * @example
 * ```ts
 * const tiers = [
 *   { firstUnit: 1, lastUnit: 100, unitPrice: 10 },
 *   { firstUnit: 101, lastUnit: Infinity, unitPrice: 8 },
 * ];
 * calculateGraduatedPrice(tiers, 150) // 1400
 * ```
 */
export function calculateGraduatedPrice(tiers: PricingTier[], usage: number): number {
	if (usage <= 0 || tiers.length === 0) return 0;

	let total = 0;
	let remainingUsage = usage;

	for (const tier of tiers) {
		if (remainingUsage <= 0) break;

		const tierSize = tier.lastUnit === Infinity ? remainingUsage : tier.lastUnit - tier.firstUnit + 1;
		const unitsInTier = Math.min(remainingUsage, tierSize);

		total += unitsInTier * tier.unitPrice;

		// Add flat fee if this tier is reached
		if (tier.flatFee && unitsInTier > 0) {
			total += tier.flatFee;
		}

		remainingUsage -= unitsInTier;
	}

	return total;
}

/**
 * Calculate the total cost using **volume** pricing.
 *
 * In volume pricing the *entire* usage is charged at the rate of
 * whichever tier the total quantity lands in.
 *
 * @param tiers - Sorted array of pricing tiers
 * @param usage - Total number of units
 * @returns Total cost
 */
export function calculateVolumePrice(tiers: PricingTier[], usage: number): number {
	if (usage <= 0 || tiers.length === 0) return 0;

	for (const tier of tiers) {
		if (usage >= tier.firstUnit && usage <= tier.lastUnit) {
			return usage * tier.unitPrice + (tier.flatFee ?? 0);
		}
	}

	// Fallback: use last tier
	const lastTier = tiers[tiers.length - 1];
	return usage * lastTier.unitPrice + (lastTier.flatFee ?? 0);
}

/**
 * Format a tier range for display purposes.
 *
 * @param tier - The pricing tier
 * @returns A human-readable range string
 *
 * @example
 * ```ts
 * formatTierRange({ firstUnit: 1, lastUnit: 100, unitPrice: 10 })
 * // "1 – 100 units"
 * formatTierRange({ firstUnit: 101, lastUnit: Infinity, unitPrice: 8 })
 * // "101+ units"
 * ```
 */
export function formatTierRange(tier: PricingTier): string {
	if (tier.lastUnit === Infinity) {
		return `${tier.firstUnit.toLocaleString()}+ units`;
	}
	return `${tier.firstUnit.toLocaleString()} – ${tier.lastUnit.toLocaleString()} units`;
}

/**
 * Format a per-unit price for display (e.g. "$0.10 / unit").
 */
export function formatUnitPrice(unitPrice: number, currency = 'USD'): string {
	const symbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency;
	return `${symbol}${unitPrice.toFixed(unitPrice < 1 ? 4 : 2)} / unit`;
}
