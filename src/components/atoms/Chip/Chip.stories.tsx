import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';
import { CheckCircle, XCircle, Clock, AlertTriangle, Info } from 'lucide-react';

/**
 * ## Badge / StatusChip
 *
 * A compact label used to indicate the status of an entity (plan, invoice,
 * subscription). Uses the FlexPrice colour system for semantic meaning:
 *
 * - **success** (green) — active, paid
 * - **failed** (red) — cancelled, void, overdue
 * - **warning** (orange) — draft, pending, paused
 * - **info** (blue) — finalized, trialing
 * - **default** (grey) — neutral / unknown
 *
 * ### Props
 * - `label` — The text displayed inside the chip
 * - `variant` — One of `default | success | warning | failed | info`
 * - `icon` — Optional icon rendered before the label
 * - `textColor` / `bgColor` — Custom overrides for colour
 */
const meta: Meta<typeof Chip> = {
	title: 'Atoms/Badge',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'failed', 'info'],
			description: 'Semantic colour variant',
		},
		label: { control: 'text' },
		disabled: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

/** Default grey badge. */
export const Default: Story = {
	args: { label: 'Default', variant: 'default' },
};

/** Active / Paid — green. */
export const Active: Story = {
	args: {
		label: 'Active',
		variant: 'success',
		icon: <CheckCircle className='size-3.5' />,
	},
};

/** Archived / Cancelled — grey. */
export const Archived: Story = {
	args: { label: 'Archived', variant: 'default' },
};

/** Paid invoice — green. */
export const Paid: Story = {
	args: {
		label: 'Paid',
		variant: 'success',
		icon: <CheckCircle className='size-3.5' />,
	},
};

/** Draft — orange/warning. */
export const Draft: Story = {
	args: {
		label: 'Draft',
		variant: 'warning',
		icon: <Clock className='size-3.5' />,
	},
};

/** Void — grey. */
export const Void: Story = {
	args: { label: 'Void', variant: 'default' },
};

/** Overdue — red. */
export const Overdue: Story = {
	args: {
		label: 'Overdue',
		variant: 'failed',
		icon: <AlertTriangle className='size-3.5' />,
	},
};

/** Finalized — blue/info. */
export const Finalized: Story = {
	args: {
		label: 'Finalized',
		variant: 'info',
		icon: <Info className='size-3.5' />,
	},
};

/** Failed / Error — red. */
export const Failed: Story = {
	args: {
		label: 'Failed',
		variant: 'failed',
		icon: <XCircle className='size-3.5' />,
	},
};

/** Disabled badge. */
export const Disabled: Story = {
	args: {
		label: 'Disabled',
		variant: 'default',
		disabled: true,
	},
};

/** All variants side by side. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-wrap gap-2'>
			<Chip label='Default' variant='default' />
			<Chip label='Active' variant='success' icon={<CheckCircle className='size-3.5' />} />
			<Chip label='Draft' variant='warning' icon={<Clock className='size-3.5' />} />
			<Chip label='Overdue' variant='failed' icon={<AlertTriangle className='size-3.5' />} />
			<Chip label='Finalized' variant='info' icon={<Info className='size-3.5' />} />
		</div>
	),
};

/** Custom colours override the variant palette. */
export const CustomColors: Story = {
	args: {
		label: 'Custom',
		bgColor: '#F0E7FF',
		textColor: '#7C3AED',
		borderColor: '#DDD6FE',
	},
};
