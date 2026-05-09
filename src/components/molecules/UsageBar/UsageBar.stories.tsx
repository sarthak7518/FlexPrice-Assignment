import type { Meta, StoryObj } from '@storybook/react';
import UsageBar from './UsageBar';

const meta: Meta<typeof UsageBar> = {
	title: 'Molecules/UsageBar',
	component: UsageBar,
	tags: ['autodocs'],
	argTypes: {
		used: { control: { type: 'number', min: 0 } },
		entitled: { control: { type: 'number', min: 0 } },
		label: { control: 'text' },
		unit: { control: 'text' },
		showPercentage: { control: 'boolean' },
		loading: { control: 'boolean' },
	},
	decorators: [
		(Story) => (
			<div style={{ width: '400px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof UsageBar>;

export const Default: Story = {
	args: { label: 'API Calls', used: 5000, entitled: 10000, unit: 'calls' },
};

export const HalfUsed: Story = {
	args: { label: 'Storage', used: 50, entitled: 100, unit: 'GB' },
};

export const NearLimit: Story = {
	args: { label: 'API Calls', used: 9200, entitled: 10000, unit: 'calls' },
};

export const Exceeded: Story = {
	args: { label: 'API Calls', used: 12000, entitled: 10000, unit: 'calls' },
};

export const ZeroUsage: Story = {
	args: { label: 'Seats', used: 0, entitled: 5, unit: 'seats' },
};

export const Loading: Story = {
	args: { label: '', used: 0, entitled: 0, loading: true },
};

export const MultipleMeters: Story = {
	render: () => (
		<div className='space-y-6 w-[400px]'>
			<UsageBar label='API Calls' used={7500} entitled={10000} unit='calls' />
			<UsageBar label='Storage' used={45} entitled={100} unit='GB' />
			<UsageBar label='Team Members' used={4} entitled={5} unit='seats' />
			<UsageBar label='Webhooks' used={1200} entitled={1000} unit='events' />
		</div>
	),
};
