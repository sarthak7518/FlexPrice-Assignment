import type { Meta, StoryObj } from '@storybook/react';
import PricingTierTable from './PricingTierTable';

const meta: Meta<typeof PricingTierTable> = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	argTypes: {
		model: { control: 'radio', options: ['graduated', 'volume'] },
		currency: { control: 'text' },
	},
	decorators: [
		(Story) => (
			<div style={{ width: '600px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

/** Graduated pricing with 3 tiers. */
export const GraduatedPricing: Story = {
	args: {
		model: 'graduated',
		tiers: [
			{ firstUnit: 1, lastUnit: 1000, unitPrice: 0.1 },
			{ firstUnit: 1001, lastUnit: 10000, unitPrice: 0.07 },
			{ firstUnit: 10001, lastUnit: Infinity, unitPrice: 0.04 },
		],
	},
};

/** Volume pricing with 3 tiers. */
export const VolumePricing: Story = {
	args: {
		model: 'volume',
		tiers: [
			{ firstUnit: 1, lastUnit: 1000, unitPrice: 0.12 },
			{ firstUnit: 1001, lastUnit: 5000, unitPrice: 0.08 },
			{ firstUnit: 5001, lastUnit: Infinity, unitPrice: 0.05 },
		],
	},
};

/** Tiers with flat fees. */
export const WithFlatFees: Story = {
	args: {
		model: 'graduated',
		tiers: [
			{ firstUnit: 1, lastUnit: 100, unitPrice: 10.0, flatFee: 50 },
			{ firstUnit: 101, lastUnit: 500, unitPrice: 8.0, flatFee: 30 },
			{ firstUnit: 501, lastUnit: Infinity, unitPrice: 5.0 },
		],
	},
};

/** Free tier + paid tiers. */
export const WithFreeTier: Story = {
	args: {
		model: 'graduated',
		tiers: [
			{ firstUnit: 1, lastUnit: 1000, unitPrice: 0 },
			{ firstUnit: 1001, lastUnit: 10000, unitPrice: 0.05 },
			{ firstUnit: 10001, lastUnit: Infinity, unitPrice: 0.02 },
		],
	},
};

/** Single flat rate (no tiers). */
export const SingleTier: Story = {
	args: {
		model: 'volume',
		tiers: [{ firstUnit: 1, lastUnit: Infinity, unitPrice: 0.1 }],
	},
};
