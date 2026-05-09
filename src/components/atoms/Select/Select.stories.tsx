import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import FlexPriceSelect from './Select';

/**
 * ## Select / Dropdown
 *
 * A single-select dropdown built on Radix Select primitives. Used throughout
 * FlexPrice for choosing billing intervals, currencies, plan types, etc.
 *
 * ### Props
 * - `options` — Array of `{ value, label, description?, disabled? }`
 * - `value` — Currently selected value
 * - `onChange` — Fires when selection changes
 * - `placeholder` — Text shown when no value is selected
 * - `label` — Label text above the select
 * - `error` — Error message
 * - `isRadio` — Use radio-button style items
 */
const meta: Meta<typeof FlexPriceSelect> = {
	title: 'Atoms/Select',
	component: FlexPriceSelect,
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean' },
		placeholder: { control: 'text' },
		label: { control: 'text' },
		error: { control: 'text' },
	},
	args: {
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '300px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof FlexPriceSelect>;

const billingOptions = [
	{ value: 'monthly', label: 'Monthly' },
	{ value: 'quarterly', label: 'Quarterly' },
	{ value: 'annual', label: 'Annual' },
];

const currencyOptions = [
	{ value: 'USD', label: 'US Dollar ($)' },
	{ value: 'EUR', label: 'Euro (€)' },
	{ value: 'GBP', label: 'British Pound (£)' },
	{ value: 'INR', label: 'Indian Rupee (₹)' },
	{ value: 'JPY', label: 'Japanese Yen (¥)' },
];

/** Default select with billing interval options. */
export const Default: Story = {
	args: {
		options: billingOptions,
		placeholder: 'Select billing interval',
	},
};

/** Select with a label and pre-selected value. */
export const WithLabel: Story = {
	args: {
		options: billingOptions,
		label: 'Billing Interval',
		value: 'monthly',
	},
};

/** Select with many options (currency picker). */
export const ManyOptions: Story = {
	args: {
		options: currencyOptions,
		label: 'Currency',
		placeholder: 'Choose currency…',
	},
};

/** Select with descriptions on each option. */
export const WithDescriptions: Story = {
	args: {
		options: [
			{ value: 'flat', label: 'Flat Rate', description: 'Fixed price per billing period' },
			{ value: 'tiered', label: 'Tiered', description: 'Price varies by usage tiers' },
			{ value: 'volume', label: 'Volume', description: 'All units priced by total volume' },
			{ value: 'graduated', label: 'Graduated', description: 'Each tier priced independently' },
		],
		label: 'Pricing Model',
		placeholder: 'Select model…',
	},
};

/** Disabled select. */
export const Disabled: Story = {
	args: {
		options: billingOptions,
		label: 'Billing Interval',
		value: 'monthly',
		disabled: true,
	},
};

/** Select with error state. */
export const WithError: Story = {
	args: {
		options: billingOptions,
		label: 'Billing Interval',
		error: 'Please select a billing interval',
	},
};

/** Radio-button style select items. */
export const RadioStyle: Story = {
	args: {
		options: [
			{ value: 'standard', label: 'Standard', description: 'Regular plan' },
			{ value: 'premium', label: 'Premium', description: 'Priority support included' },
		],
		label: 'Plan Tier',
		isRadio: true,
	},
};

/** Select with disabled options. */
export const WithDisabledOptions: Story = {
	args: {
		options: [
			{ value: 'free', label: 'Free Tier' },
			{ value: 'starter', label: 'Starter' },
			{ value: 'enterprise', label: 'Enterprise', disabled: true, description: 'Contact sales' },
		],
		label: 'Plan',
		placeholder: 'Choose plan…',
	},
};

/** Empty options list. */
export const NoOptions: Story = {
	args: {
		options: [],
		label: 'Meter',
		placeholder: 'Select meter…',
		noOptionsText: 'No meters found. Create one first.',
	},
};
