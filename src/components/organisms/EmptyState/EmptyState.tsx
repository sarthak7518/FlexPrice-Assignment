import React from 'react';
import { cn } from '@/lib/utils';
import Button from '@/components/atoms/Button/Button';

/**
 * ## EmptyState
 *
 * A full-page/section empty state with icon, headline, description,
 * and a call-to-action button. Used when a list page has no data
 * (no customers, invoices, etc.).
 */
export interface EmptyStateProps {
	icon?: React.ReactNode;
	title: string;
	description?: string;
	actionLabel?: string;
	onAction?: () => void;
	actionIcon?: React.ReactNode;
	className?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, actionLabel, onAction, actionIcon, className }) => {
	return (
		<div className={cn('flex flex-col items-center justify-center py-16 px-6 text-center', className)}>
			{icon && (
				<div className='mb-4 p-4 rounded-full bg-gray-50'>
					<span className='text-gray-400'>{icon}</span>
				</div>
			)}

			<h3 className='text-lg font-semibold text-foreground mb-1'>{title}</h3>

			{description && <p className='text-sm text-muted-foreground max-w-[360px] mb-6'>{description}</p>}

			{actionLabel && onAction && (
				<Button onClick={onAction} prefixIcon={actionIcon}>
					{actionLabel}
				</Button>
			)}
		</div>
	);
};

export default EmptyState;
