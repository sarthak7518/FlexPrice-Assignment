import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, userEvent, within } from '@storybook/test';
import Input from './Input';
import { DollarSign, Search, Mail } from 'lucide-react';

/**
 * ## Input
 *
 * A flexible text/number input with support for labels, error states,
 * prefix elements (e.g. currency symbol), suffix elements, and
 * automatic number formatting.
 *
 * ### Props
 * - `label` — Text label above the input
 * - `error` — Error message (highlights the border red)
 * - `variant` — `text | number | formatted-number | integer`
 * - `inputPrefix` — Element rendered inside the input (left)
 * - `suffix` — Element rendered inside the input (right)
 * - `size` — `xs | sm | default | lg | icon`
 * - `disabled` — Disables the input
 */
const meta: Meta<typeof Input> = {
	title: 'Atoms/Input',
	component: Input,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		error: { control: 'text' },
		disabled: { control: 'boolean' },
		variant: {
			control: 'select',
			options: ['text', 'number', 'formatted-number', 'integer'],
		},
		size: {
			control: 'select',
			options: ['xs', 'sm', 'default', 'lg'],
		},
	},
	args: {
		onChange: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof Input>;

/** Default text input. */
export const Default: Story = {
	args: {
		placeholder: 'Enter plan name…',
	},
};

/** Input with a label. */
export const WithLabel: Story = {
	args: {
		label: 'Plan Name',
		placeholder: 'e.g. Pro Plan',
	},
};

/** Input showing an error state. */
export const WithError: Story = {
	args: {
		label: 'Email',
		placeholder: 'you@company.com',
		error: 'Please enter a valid email address',
		value: 'invalid-email',
	},
};

/** Currency input with a $ prefix — used in pricing forms. */
export const CurrencyPrefix: Story = {
	args: {
		label: 'Price per Unit',
		placeholder: '0.00',
		variant: 'formatted-number',
		inputPrefix: <DollarSign className='size-4 text-muted-foreground' />,
	},
};

/** Number-only input. */
export const NumberInput: Story = {
	args: {
		label: 'Quantity',
		placeholder: '0',
		variant: 'integer',
	},
};

/** Input with a search icon prefix. */
export const WithSearchIcon: Story = {
	args: {
		placeholder: 'Search customers…',
		inputPrefix: <Search className='size-4 text-muted-foreground' />,
	},
};

/** Input with a suffix element. */
export const WithSuffix: Story = {
	args: {
		label: 'API Calls',
		placeholder: '0',
		variant: 'integer',
		suffix: <span>/ month</span>,
	},
};

/** Input with email icon prefix. */
export const WithEmailIcon: Story = {
	args: {
		label: 'Email Address',
		placeholder: 'name@company.com',
		inputPrefix: <Mail className='size-4 text-muted-foreground' />,
	},
};

/** Disabled input. */
export const Disabled: Story = {
	args: {
		label: 'Read Only',
		value: 'Cannot edit this',
		disabled: true,
	},
};

/** Small size input. */
export const SmallSize: Story = {
	args: {
		placeholder: 'Small input',
		size: 'sm',
	},
};

/** Large size input. */
export const LargeSize: Story = {
	args: {
		placeholder: 'Large input',
		size: 'lg',
	},
};

/** With description text. */
export const WithDescription: Story = {
	args: {
		label: 'Meter Name',
		placeholder: 'api_calls',
		description: 'Use lowercase with underscores. This cannot be changed later.',
	},
};

// ── Interaction Test ────────────────────────────────────────────────

/** Verifies typing triggers onChange and error state displays. */
export const InteractionTest: Story = {
	args: {
		label: 'Test Input',
		placeholder: 'Type here…',
		onChange: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type here…');

		await userEvent.type(input, 'Hello');
		expect(args.onChange).toHaveBeenCalled();
	},
};
