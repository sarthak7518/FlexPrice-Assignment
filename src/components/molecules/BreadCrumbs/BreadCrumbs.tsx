import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

/**
 * ## BreadCrumbs
 *
 * Navigation breadcrumbs showing the current page hierarchy.
 * The last item is rendered as active (non-clickable).
 */
export interface BreadCrumbItem {
	label: string;
	href?: string;
	onClick?: () => void;
}

export interface BreadCrumbsProps {
	items?: BreadCrumbItem[];
	separator?: React.ReactNode;
	className?: string;
}

const BreadCrumbs: React.FC<BreadCrumbsProps> = ({
	items = [],
	separator = <ChevronRight className='size-3.5 text-muted-foreground mx-1' />,
	className,
}) => {
	return (
		<nav aria-label='Breadcrumb' className={cn('flex items-center', className)}>
			<ol className='flex items-center gap-0'>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					return (
						<li key={index} className='flex items-center'>
							{index > 0 && separator}
							{isLast ? (
								<span className='text-sm font-medium text-foreground'>{item.label}</span>
							) : (
								<button
									type='button'
									onClick={item.onClick}
									className='text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer'>
									{item.label}
								</button>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default BreadCrumbs;
