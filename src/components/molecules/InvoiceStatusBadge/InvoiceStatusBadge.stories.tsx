import type { Meta, StoryObj } from '@storybook/react';
import InvoiceStatusBadge from './InvoiceStatusBadge';

const meta: Meta<typeof InvoiceStatusBadge> = {
	title: 'Molecules/InvoiceStatusBadge',
	component: InvoiceStatusBadge,
	tags: ['autodocs'],
	argTypes: {
		status: {
			control: 'select',
			options: ['draft', 'finalized', 'paid', 'void', 'overdue', 'uncollectible'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof InvoiceStatusBadge>;

export const Paid: Story = { args: { status: 'paid' } };
export const Draft: Story = { args: { status: 'draft' } };
export const Void: Story = { args: { status: 'void' } };
export const Overdue: Story = { args: { status: 'overdue' } };
export const Finalized: Story = { args: { status: 'finalized' } };
export const Uncollectible: Story = { args: { status: 'uncollectible' } };

export const AllStatuses: Story = {
	render: () => (
		<div className='flex flex-wrap gap-2'>
			{(['draft', 'finalized', 'paid', 'void', 'overdue', 'uncollectible'] as const).map((s) => (
				<InvoiceStatusBadge key={s} status={s} />
			))}
		</div>
	),
};
