import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

/**
 * ## MetricCard
 *
 * A KPI card used on the FlexPrice dashboard to display key metrics
 * such as revenue, customer count, or API usage. Shows a label, a
 * large value, and an optional trend indicator.
 *
 * @param title - Metric label (e.g. "Total Revenue")
 * @param value - Display value (e.g. "$12,340.00" or "1,234")
 * @param trend - Percentage change (positive = up, negative = down)
 * @param trendLabel - Label for the trend (e.g. "vs last month")
 * @param loading - Show loading skeleton
 * @param icon - Optional icon element
 * @param className - Additional CSS classes
 */
export interface MetricCardProps {
	title: string;
	value: string | number;
	trend?: number;
	trendLabel?: string;
	loading?: boolean;
	icon?: React.ReactNode;
	className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, trend, trendLabel, loading = false, icon, className }) => {
	const isPositive = trend !== undefined && trend >= 0;
	const trendColor = isPositive ? 'text-green-600' : 'text-red-500';

	if (loading) {
		return (
			<div className={cn('rounded-lg border bg-white p-5 min-w-[200px]', className)}>
				<div className='h-4 w-24 bg-gray-200 rounded animate-pulse mb-3' />
				<div className='h-8 w-32 bg-gray-200 rounded animate-pulse mb-2' />
				<div className='h-3 w-20 bg-gray-200 rounded animate-pulse' />
			</div>
		);
	}

	return (
		<div className={cn('rounded-lg border bg-white p-5 min-w-[200px] transition-shadow hover:shadow-sm', className)}>
			<div className='flex items-center justify-between mb-1'>
				<span className='text-sm font-medium text-muted-foreground'>{title}</span>
				{icon && <span className='text-muted-foreground'>{icon}</span>}
			</div>

			<div className='flex items-end gap-2'>
				<span className='text-2xl font-semibold tracking-tight text-foreground font-inter'>{value}</span>
			</div>

			{trend !== undefined && (
				<div className={cn('flex items-center gap-1 mt-2', trendColor)}>
					{isPositive ? <TrendingUp className='size-3.5' /> : <TrendingDown className='size-3.5' />}
					<span className='text-xs font-medium'>
						{isPositive ? '+' : ''}
						{trend.toFixed(1)}%
					</span>
					{trendLabel && <span className='text-xs text-muted-foreground ml-1'>{trendLabel}</span>}
				</div>
			)}
		</div>
	);
};

export default MetricCard;
