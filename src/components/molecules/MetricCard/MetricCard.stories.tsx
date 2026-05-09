import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';
import { DollarSign, Users, Zap, FileText } from 'lucide-react';

/**
 * ## MetricCard
 *
 * Dashboard KPI card displaying a metric label, large value, and optional
 * trend indicator. Used across the FlexPrice dashboard for revenue, customer
 * count, usage metrics, and more.
 */
const meta: Meta<typeof MetricCard> = {
	title: 'Molecules/MetricCard',
	component: MetricCard,
	tags: ['autodocs'],
	argTypes: {
		title: { control: 'text' },
		value: { control: 'text' },
		trend: { control: { type: 'number', min: -100, max: 100, step: 0.1 } },
		trendLabel: { control: 'text' },
		loading: { control: 'boolean' },
	},
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

/** Default metric card showing revenue. */
export const Default: Story = {
	args: {
		title: 'Total Revenue',
		value: '$12,340.00',
		trend: 12.5,
		trendLabel: 'vs last month',
		icon: <DollarSign className='size-4' />,
	},
};

/** Positive trend (growth). */
export const PositiveTrend: Story = {
	args: {
		title: 'Active Customers',
		value: '1,234',
		trend: 8.3,
		trendLabel: 'vs last month',
		icon: <Users className='size-4' />,
	},
};

/** Negative trend (decline). */
export const NegativeTrend: Story = {
	args: {
		title: 'API Calls',
		value: '45,230',
		trend: -3.2,
		trendLabel: 'vs last week',
		icon: <Zap className='size-4' />,
	},
};

/** No trend indicator. */
export const NoTrend: Story = {
	args: {
		title: 'Open Invoices',
		value: '23',
		icon: <FileText className='size-4' />,
	},
};

/** Loading skeleton state. */
export const Loading: Story = {
	args: {
		title: 'Total Revenue',
		value: '',
		loading: true,
	},
};

/** Currency value without trend. */
export const CurrencyValue: Story = {
	args: {
		title: 'Monthly Recurring Revenue',
		value: '$89,450.00',
		icon: <DollarSign className='size-4' />,
	},
};

/** Multiple cards side by side (dashboard preview). */
export const DashboardRow: Story = {
	render: () => (
		<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[900px]'>
			<MetricCard
				title='Total Revenue'
				value='$12,340.00'
				trend={12.5}
				trendLabel='vs last month'
				icon={<DollarSign className='size-4' />}
			/>
			<MetricCard title='Active Customers' value='1,234' trend={8.3} trendLabel='vs last month' icon={<Users className='size-4' />} />
			<MetricCard title='API Calls' value='2.3M' trend={-3.2} trendLabel='vs last week' icon={<Zap className='size-4' />} />
			<MetricCard title='Open Invoices' value='23' icon={<FileText className='size-4' />} />
		</div>
	),
};
