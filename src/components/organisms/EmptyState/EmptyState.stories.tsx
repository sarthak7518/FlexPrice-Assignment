import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import EmptyState from './EmptyState';
import { Users, FileText, Zap, CreditCard, Plus, Upload } from 'lucide-react';

const meta: Meta<typeof EmptyState> = {
	title: 'Organisms/EmptyState',
	component: EmptyState,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		description: { control: 'text' },
		actionLabel: { control: 'text' },
	},
	args: {
		onAction: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/** Default empty state. */
export const Default: Story = {
	args: {
		title: 'No data found',
		description: 'There are no items to display. Try adjusting your filters or create a new entry.',
	},
};

/** No customers. */
export const NoCustomers: Story = {
	args: {
		icon: <Users className='size-8' />,
		title: 'No customers yet',
		description: 'Start by adding your first customer. You can import from Stripe or create one manually.',
		actionLabel: 'Add Customer',
		actionIcon: <Plus className='size-4' />,
	},
};

/** No invoices. */
export const NoInvoices: Story = {
	args: {
		icon: <FileText className='size-8' />,
		title: 'No invoices',
		description: 'Invoices will appear here once you start billing your customers.',
		actionLabel: 'Create Invoice',
		actionIcon: <Plus className='size-4' />,
	},
};

/** No subscriptions. */
export const NoSubscriptions: Story = {
	args: {
		icon: <CreditCard className='size-8' />,
		title: 'No active subscriptions',
		description: 'Create a plan and subscribe your first customer to get started.',
		actionLabel: 'Create Plan',
		actionIcon: <Plus className='size-4' />,
	},
};

/** No meters / usage data. */
export const NoMeters: Story = {
	args: {
		icon: <Zap className='size-8' />,
		title: 'No meters configured',
		description: 'Set up usage meters to track API calls, storage, or any custom metric.',
		actionLabel: 'Create Meter',
		actionIcon: <Plus className='size-4' />,
	},
};

/** Empty search results. */
export const EmptySearch: Story = {
	args: {
		title: 'No results found',
		description: 'No items match your search. Try different keywords or clear your filters.',
	},
};

/** With import action. */
export const WithImport: Story = {
	args: {
		icon: <Upload className='size-8' />,
		title: 'Import your data',
		description: 'Get started quickly by importing customers and plans from your existing billing provider.',
		actionLabel: 'Import from Stripe',
		actionIcon: <Upload className='size-4' />,
	},
};
