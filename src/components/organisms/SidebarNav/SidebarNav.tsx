import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';

/**
 * ## SidebarNav
 *
 * Collapsible sidebar navigation used in the FlexPrice app shell.
 * Supports icon+label items, nested groups, active-route highlighting,
 * and collapsed mode.
 */
export interface NavItem {
	id: string;
	label: string;
	icon?: React.ReactNode;
	href?: string;
	onClick?: () => void;
	children?: NavItem[];
	badge?: string | number;
}

export interface SidebarNavProps {
	items: NavItem[];
	activeId?: string;
	collapsed?: boolean;
	onItemClick?: (item: NavItem) => void;
	className?: string;
	header?: React.ReactNode;
	footer?: React.ReactNode;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items, activeId, collapsed = false, onItemClick, className, header, footer }) => {
	const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

	const toggleGroup = (id: string) => {
		setExpandedGroups((prev) => {
			const next = new Set(prev);
			if (next.has(id)) {
				next.delete(id);
			} else {
				next.add(id);
			}
			return next;
		});
	};

	const renderItem = (item: NavItem, depth: number = 0) => {
		const isActive = item.id === activeId;
		const hasChildren = item.children && item.children.length > 0;
		const isExpanded = expandedGroups.has(item.id);

		return (
			<div key={item.id}>
				<button
					type='button'
					onClick={() => {
						if (hasChildren) {
							toggleGroup(item.id);
						}
						onItemClick?.(item);
						item.onClick?.();
					}}
					className={cn(
						'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
						depth > 0 && 'ml-4',
						isActive ? 'bg-[#092E44] text-white font-medium' : 'text-gray-700 hover:bg-gray-100',
						collapsed && 'justify-center px-2',
					)}
					title={collapsed ? item.label : undefined}>
					{item.icon && <span className={cn('shrink-0', isActive ? 'text-white' : 'text-gray-500')}>{item.icon}</span>}

					{!collapsed && (
						<>
							<span className='flex-1 text-left truncate'>{item.label}</span>
							{item.badge !== undefined && (
								<span
									className={cn('text-xs px-1.5 py-0.5 rounded-full', isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600')}>
									{item.badge}
								</span>
							)}
							{hasChildren && (
								<span className='shrink-0'>
									{isExpanded ? <ChevronDown className='size-3.5' /> : <ChevronRight className='size-3.5' />}
								</span>
							)}
						</>
					)}
				</button>

				{/* Nested children */}
				{hasChildren && isExpanded && !collapsed && (
					<div className='mt-0.5'>{item.children!.map((child) => renderItem(child, depth + 1))}</div>
				)}
			</div>
		);
	};

	return (
		<nav className={cn('flex flex-col h-full bg-white border-r', collapsed ? 'w-16' : 'w-56', 'transition-all duration-200', className)}>
			{/* Header */}
			{header && <div className={cn('p-4 border-b', collapsed && 'px-2')}>{header}</div>}

			{/* Navigation items */}
			<div className='flex-1 overflow-y-auto p-2 space-y-0.5'>{items.map((item) => renderItem(item))}</div>

			{/* Footer */}
			{footer && <div className={cn('p-4 border-t', collapsed && 'px-2')}>{footer}</div>}
		</nav>
	);
};

export default SidebarNav;
