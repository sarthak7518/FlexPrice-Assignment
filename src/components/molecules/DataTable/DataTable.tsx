import React, { useState, useMemo, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useVirtualizer } from '@tanstack/react-virtual';
import { ArrowUp, ArrowDown, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Spinner from '@/components/atoms/Spinner/Spinner';

/**
 * ## DataTable
 *
 * A feature-rich data table for FlexPrice list views. Supports:
 * - **Sortable columns** with ascending/descending toggles
 * - **Pagination** with configurable page size
 * - **Loading skeletons** while data is being fetched
 * - **Empty state** when no data matches
 * - **Virtualised rows** (Challenge B) using `@tanstack/react-virtual`
 *   for smooth rendering of 10,000+ rows
 *
 * @module DataTable
 */

export interface Column<T> {
	/** Unique key for the column */
	key: string;
	/** Display header text */
	header: string;
	/** Render the cell content */
	render: (row: T, index: number) => React.ReactNode;
	/** Whether this column is sortable */
	sortable?: boolean;
	/** Column width (CSS value) */
	width?: string;
}

export interface DataTableProps<T> {
	/** Column definitions */
	columns: Column<T>[];
	/** Row data */
	data: T[];
	/** Loading state */
	loading?: boolean;
	/** Number of skeleton rows to show while loading */
	loadingRows?: number;
	/** Enable virtualization for large datasets */
	virtualized?: boolean;
	/** Height of the virtualized container (px) */
	virtualHeight?: number;
	/** Estimated row height for virtualization (px) */
	estimateSize?: number;
	/** Overscan buffer for virtualization */
	overscan?: number;
	/** Enable pagination */
	paginated?: boolean;
	/** Page size for pagination */
	pageSize?: number;
	/** Row click handler */
	onRowClick?: (row: T, index: number) => void;
	/** Custom empty state message */
	emptyMessage?: string;
	/** Custom empty state icon */
	emptyIcon?: React.ReactNode;
	/** Additional className */
	className?: string;
	/** Unique key extractor for each row */
	getRowId?: (row: T, index: number) => string;
}

type SortDirection = 'asc' | 'desc' | null;

interface SortState {
	key: string;
	direction: SortDirection;
}

function DataTable<T>({
	columns,
	data,
	loading = false,
	loadingRows = 5,
	virtualized = false,
	virtualHeight = 400,
	estimateSize = 48,
	overscan = 5,
	paginated = false,
	pageSize = 10,
	onRowClick,
	emptyMessage = 'No data found',
	emptyIcon,
	className,
	getRowId,
}: DataTableProps<T>) {
	const [sort, setSort] = useState<SortState>({ key: '', direction: null });
	const [currentPage, setCurrentPage] = useState(0);

	const parentRef = useRef<HTMLDivElement>(null);

	// Sort data
	const sortedData = useMemo(() => {
		if (!sort.key || !sort.direction) return data;

		const col = columns.find((c) => c.key === sort.key);
		if (!col) return data;

		return [...data].sort((a, b) => {
			const aVal = (a as Record<string, unknown>)[sort.key];
			const bVal = (b as Record<string, unknown>)[sort.key];

			if (aVal == null) return 1;
			if (bVal == null) return -1;

			let comparison = 0;
			if (typeof aVal === 'number' && typeof bVal === 'number') {
				comparison = aVal - bVal;
			} else {
				comparison = String(aVal).localeCompare(String(bVal));
			}

			return sort.direction === 'desc' ? -comparison : comparison;
		});
	}, [data, sort, columns]);

	// Paginate
	const paginatedData = useMemo(() => {
		if (!paginated) return sortedData;
		const start = currentPage * pageSize;
		return sortedData.slice(start, start + pageSize);
	}, [sortedData, paginated, currentPage, pageSize]);

	const totalPages = paginated ? Math.ceil(sortedData.length / pageSize) : 1;

	const displayData = paginated ? paginatedData : sortedData;

	// Virtualizer
	const virtualizer = useVirtualizer({
		count: displayData.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => estimateSize,
		overscan,
	});

	const handleSort = useCallback((key: string) => {
		setSort((prev) => {
			if (prev.key !== key) return { key, direction: 'asc' };
			if (prev.direction === 'asc') return { key, direction: 'desc' };
			return { key: '', direction: null };
		});
	}, []);

	const SortIcon = ({ columnKey }: { columnKey: string }) => {
		if (sort.key !== columnKey) return <ArrowUpDown className='size-3.5 text-muted-foreground' />;
		if (sort.direction === 'asc') return <ArrowUp className='size-3.5' />;
		return <ArrowDown className='size-3.5' />;
	};

	// Loading skeleton
	if (loading) {
		return (
			<div className={cn('rounded-lg border overflow-hidden', className)}>
				<table className='w-full'>
					<thead className='bg-gray-50/80'>
						<tr>
							{columns.map((col) => (
								<th key={col.key} className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
									{col.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{[...Array(loadingRows)].map((_, i) => (
							<tr key={i} className='border-t'>
								{columns.map((col) => (
									<td key={col.key} className='px-4 py-3'>
										<div className='h-4 bg-gray-200 rounded animate-pulse' style={{ width: `${60 + Math.random() * 30}%` }} />
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}

	// Empty state
	if (displayData.length === 0) {
		return (
			<div className={cn('rounded-lg border', className)}>
				<table className='w-full'>
					<thead className='bg-gray-50/80'>
						<tr>
							{columns.map((col) => (
								<th key={col.key} className='px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider'>
									{col.header}
								</th>
							))}
						</tr>
					</thead>
				</table>
				<div className='flex flex-col items-center justify-center py-12 text-muted-foreground'>
					{emptyIcon}
					<p className='text-sm mt-2'>{emptyMessage}</p>
				</div>
			</div>
		);
	}

	// Virtualized rendering
	if (virtualized) {
		return (
			<div className={cn('rounded-lg border overflow-hidden', className)}>
				{/* Header */}
				<div className='bg-gray-50/80 border-b'>
					<div className='flex'>
						{columns.map((col) => (
							<div
								key={col.key}
								className={cn(
									'px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider',
									col.sortable && 'cursor-pointer select-none hover:text-foreground',
								)}
								style={{ width: col.width || `${100 / columns.length}%`, flexShrink: 0 }}
								onClick={col.sortable ? () => handleSort(col.key) : undefined}>
								<div className='flex items-center gap-1'>
									{col.header}
									{col.sortable && <SortIcon columnKey={col.key} />}
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Virtualised body */}
				<div ref={parentRef} style={{ height: virtualHeight, overflow: 'auto' }}>
					<div style={{ height: `${virtualizer.getTotalSize()}px`, width: '100%', position: 'relative' }}>
						{virtualizer.getVirtualItems().map((virtualRow) => {
							const row = displayData[virtualRow.index];
							return (
								<div
									key={getRowId ? getRowId(row, virtualRow.index) : virtualRow.index}
									className={cn(
										'flex border-b last:border-b-0 bg-white',
										onRowClick && 'cursor-pointer hover:bg-gray-50 transition-colors',
									)}
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										width: '100%',
										height: `${virtualRow.size}px`,
										transform: `translateY(${virtualRow.start}px)`,
									}}
									onClick={onRowClick ? () => onRowClick(row, virtualRow.index) : undefined}>
									{columns.map((col) => (
										<div
											key={col.key}
											className='px-4 py-3 text-sm flex items-center'
											style={{ width: col.width || `${100 / columns.length}%`, flexShrink: 0 }}>
											{col.render(row, virtualRow.index)}
										</div>
									))}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	// Standard table rendering
	return (
		<div className={cn('rounded-lg border overflow-hidden', className)}>
			<table className='w-full'>
				<thead className='bg-gray-50/80'>
					<tr>
						{columns.map((col) => (
							<th
								key={col.key}
								className={cn(
									'px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider',
									col.sortable && 'cursor-pointer select-none hover:text-foreground',
								)}
								style={{ width: col.width }}
								onClick={col.sortable ? () => handleSort(col.key) : undefined}>
								<div className='flex items-center gap-1'>
									{col.header}
									{col.sortable && <SortIcon columnKey={col.key} />}
								</div>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{displayData.map((row, i) => (
						<tr
							key={getRowId ? getRowId(row, i) : i}
							className={cn('border-t bg-white', onRowClick && 'cursor-pointer hover:bg-gray-50 transition-colors')}
							onClick={onRowClick ? () => onRowClick(row, i) : undefined}>
							{columns.map((col) => (
								<td key={col.key} className='px-4 py-3 text-sm'>
									{col.render(row, i)}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			{paginated && totalPages > 1 && (
				<div className='flex items-center justify-between px-4 py-3 border-t bg-gray-50/50'>
					<span className='text-sm text-muted-foreground'>
						Showing {currentPage * pageSize + 1}–{Math.min((currentPage + 1) * pageSize, sortedData.length)} of {sortedData.length}
					</span>
					<div className='flex items-center gap-1'>
						<button
							type='button'
							className='p-1 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={currentPage === 0}
							onClick={() => setCurrentPage((p) => p - 1)}>
							<ChevronLeft className='size-4' />
						</button>
						<span className='text-sm px-2'>
							{currentPage + 1} / {totalPages}
						</span>
						<button
							type='button'
							className='p-1 rounded hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed'
							disabled={currentPage >= totalPages - 1}
							onClick={() => setCurrentPage((p) => p + 1)}>
							<ChevronRight className='size-4' />
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default DataTable;
