import React, { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useFilterStore, syncFingerprintToUrl } from './useFilterStore';
import Button from '@/components/atoms/Button/Button';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import Chip from '@/components/atoms/Chip/Chip';
import { RotateCcw } from 'lucide-react';

/**
 * ## useFilterStore (Challenge A)
 *
 * Demonstrates the Zustand-based filter persistence hook. Filters are:
 * - Stored in **sessionStorage** keyed by route
 * - Synced as a **shallow fingerprint** (count) in the URL
 * - Fully reactive — changes update the UI immediately
 *
 * Open DevTools → Application → Session Storage to see persisted values.
 * The URL `?fc=N` parameter updates as you toggle filters.
 */

const ROUTE_KEY = 'demo-invoices';

const FilterDemo: React.FC = () => {
	const { setFilter, resetFilters, getFilters, getFingerprint } = useFilterStore();
	const filters = getFilters(ROUTE_KEY);
	const fingerprint = getFingerprint(ROUTE_KEY);

	const [, forceUpdate] = useState(0);

	// Force re-render on store changes
	useEffect(() => {
		const unsub = useFilterStore.subscribe(() => forceUpdate((n) => n + 1));
		return unsub;
	}, []);

	useEffect(() => {
		syncFingerprintToUrl(ROUTE_KEY, fingerprint);
	}, [fingerprint]);

	const statuses = ['paid', 'draft', 'overdue', 'finalized', 'void'];

	const activeStatuses = (filters['status'] as string[]) ?? [];

	const toggleStatus = (s: string) => {
		const current = (filters['status'] as string[]) ?? [];
		if (current.includes(s)) {
			setFilter(
				ROUTE_KEY,
				'status',
				current.filter((v) => v !== s),
			);
		} else {
			setFilter(ROUTE_KEY, 'status', [...current, s]);
		}
	};

	return (
		<div className='space-y-6 w-[500px]'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<h3 className='text-lg font-semibold'>Invoice Filters</h3>
				<div className='flex items-center gap-2'>
					<span className='text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded'>URL: ?fc={fingerprint}</span>
					<Button variant='outline' size='sm' onClick={() => resetFilters(ROUTE_KEY)} prefixIcon={<RotateCcw className='size-3.5' />}>
						Reset
					</Button>
				</div>
			</div>

			{/* Search filter */}
			<div>
				<label className='text-sm font-medium mb-1 block'>Search</label>
				<SearchBar
					value={(filters['search'] as string) ?? ''}
					onSearch={(v) => setFilter(ROUTE_KEY, 'search', v)}
					placeholder='Search invoices…'
				/>
			</div>

			{/* Status filter */}
			<div>
				<label className='text-sm font-medium mb-2 block'>Status</label>
				<div className='flex flex-wrap gap-2'>
					{statuses.map((s) => (
						<Chip
							key={s}
							label={s.charAt(0).toUpperCase() + s.slice(1)}
							variant={activeStatuses.includes(s) ? 'info' : 'default'}
							onClick={() => toggleStatus(s)}
						/>
					))}
				</div>
			</div>

			{/* Active filter state */}
			<div className='border-t pt-4'>
				<h4 className='text-sm font-medium mb-2'>Current Filter State</h4>
				<pre className='text-xs bg-gray-50 border rounded p-3 overflow-auto font-mono'>{JSON.stringify(filters, null, 2)}</pre>
			</div>

			{/* Fingerprint */}
			<div className='text-xs text-muted-foreground'>
				Active filters: {fingerprint} | Persisted in sessionStorage as <code className='bg-gray-100 px-1'>filters:{ROUTE_KEY}</code>
			</div>
		</div>
	);
};

const meta: Meta = {
	title: 'Advanced/UseFilterStore',
	tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

/** Interactive filter demo showing sessionStorage persistence and URL sync. */
export const FilterPersistence: Story = {
	render: () => <FilterDemo />,
};
