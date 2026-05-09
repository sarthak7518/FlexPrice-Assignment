import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import BreadCrumbs from './BreadCrumbs';

const meta: Meta<typeof BreadCrumbs> = {
	title: 'Molecules/BreadCrumbs',
	component: BreadCrumbs,
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BreadCrumbs>;

export const Default: Story = {
	args: {
		items: [{ label: 'Dashboard', onClick: fn() }, { label: 'Customers', onClick: fn() }, { label: 'Acme Corp' }],
	},
};

export const TwoLevels: Story = {
	args: {
		items: [{ label: 'Plans', onClick: fn() }, { label: 'Pro Plan' }],
	},
};

export const FourLevels: Story = {
	args: {
		items: [
			{ label: 'Dashboard', onClick: fn() },
			{ label: 'Customers', onClick: fn() },
			{ label: 'Acme Corp', onClick: fn() },
			{ label: 'Subscription #123' },
		],
	},
};

export const CustomSeparator: Story = {
	args: {
		items: [{ label: 'Home', onClick: fn() }, { label: 'Settings', onClick: fn() }, { label: 'Billing' }],
		separator: <span className='mx-2 text-muted-foreground'>/</span>,
	},
};

export const SingleItem: Story = {
	args: { items: [{ label: 'Dashboard' }] },
};
