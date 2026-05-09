import React from 'react';
import { cn } from '@/lib/utils';

/**
 * ## UsageBar / MeterProgress
 *
 * A labelled progress bar showing used vs entitled units. Common on
 * customer detail pages and subscription views.
 *
 * @param label - Meter/feature name
 * @param used - Current usage amount
 * @param entitled - Total entitled amount
 * @param unit - Unit label (e.g. "API calls", "GB")
 * @param showPercentage - Whether to show the percentage text
 * @param className - Additional classes
 */
export interface UsageBarProps {
	label: string;
	used: number;
	entitled: number;
	unit?: string;
	showPercentage?: boolean;
	className?: string;
	loading?: boolean;
}

const UsageBar: React.FC<UsageBarProps> = ({
	label,
	used,
	entitled,
	unit = 'units',
	showPercentage = true,
	className,
	loading = false,
}) => {
	const percentage = entitled > 0 ? Math.min((used / entitled) * 100, 100) : 0;
	const isExceeded = used > entitled;
	const isNearLimit = percentage >= 80 && !isExceeded;

	const barColor = isExceeded ? 'bg-red-500' : isNearLimit ? 'bg-amber-500' : 'bg-[#092E44]';

	const textColor = isExceeded ? 'text-red-600' : isNearLimit ? 'text-amber-600' : 'text-muted-foreground';

	if (loading) {
		return (
			<div className={cn('space-y-2 w-full', className)}>
				<div className='h-4 w-32 bg-gray-200 rounded animate-pulse' />
				<div className='h-2.5 w-full bg-gray-200 rounded-full animate-pulse' />
				<div className='h-3 w-24 bg-gray-200 rounded animate-pulse' />
			</div>
		);
	}

	return (
		<div className={cn('space-y-2 w-full', className)}>
			<div className='flex items-center justify-between'>
				<span className='text-sm font-medium text-foreground'>{label}</span>
				{showPercentage && <span className={cn('text-xs font-medium', textColor)}>{percentage.toFixed(0)}%</span>}
			</div>

			<div className='relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden'>
				<div
					className={cn('h-full rounded-full transition-all duration-500 ease-out', barColor)}
					style={{ width: `${Math.min(percentage, 100)}%` }}
				/>
			</div>

			<div className='flex items-center justify-between'>
				<span className={cn('text-xs', textColor)}>
					{used.toLocaleString()} / {entitled.toLocaleString()} {unit}
				</span>
				{isExceeded && (
					<span className='text-xs font-medium text-red-600'>
						Exceeded by {(used - entitled).toLocaleString()} {unit}
					</span>
				)}
			</div>
		</div>
	);
};

export default UsageBar;
