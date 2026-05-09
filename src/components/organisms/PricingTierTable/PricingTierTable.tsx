import React from 'react';
import { cn } from '@/lib/utils';
import { formatTierRange, formatUnitPrice, type PricingTier } from '@/utils/tierPricing';

/**
 * ## PricingTierTable
 *
 * Displays a tiered/graduated pricing breakdown in a readable table
 * format. Used in plan detail views and pricing setup forms.
 */
export interface PricingTierTableProps {
	tiers: PricingTier[];
	model: 'graduated' | 'volume';
	currency?: string;
	className?: string;
}

const PricingTierTable: React.FC<PricingTierTableProps> = ({ tiers, model, currency = 'USD', className }) => {
	return (
		<div className={cn('rounded-lg border overflow-hidden', className)}>
			{/* Header */}
			<div className='bg-gray-50/80 px-4 py-3 border-b'>
				<div className='flex items-center justify-between'>
					<span className='text-sm font-medium text-foreground'>{model === 'graduated' ? 'Graduated Pricing' : 'Volume Pricing'}</span>
					<span className='text-xs text-muted-foreground uppercase tracking-wide'>{model}</span>
				</div>
				<p className='text-xs text-muted-foreground mt-1'>
					{model === 'graduated'
						? "Each tier is priced independently. Units in each tier are charged at that tier's rate."
						: 'All units are charged at the rate of the tier the total quantity falls into.'}
				</p>
			</div>

			{/* Table */}
			<table className='w-full'>
				<thead>
					<tr className='border-b bg-gray-50/40'>
						<th className='px-4 py-2 text-left text-xs font-medium text-muted-foreground'>Tier</th>
						<th className='px-4 py-2 text-left text-xs font-medium text-muted-foreground'>Range</th>
						<th className='px-4 py-2 text-right text-xs font-medium text-muted-foreground'>Per Unit</th>
						{tiers.some((t) => t.flatFee) && <th className='px-4 py-2 text-right text-xs font-medium text-muted-foreground'>Flat Fee</th>}
					</tr>
				</thead>
				<tbody>
					{tiers.map((tier, i) => (
						<tr key={i} className='border-b last:border-b-0 bg-white hover:bg-gray-50/50'>
							<td className='px-4 py-3 text-sm'>
								<span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-medium'>
									{i + 1}
								</span>
							</td>
							<td className='px-4 py-3 text-sm'>{formatTierRange(tier)}</td>
							<td className='px-4 py-3 text-sm text-right font-mono'>{formatUnitPrice(tier.unitPrice, currency)}</td>
							{tiers.some((t) => t.flatFee) && (
								<td className='px-4 py-3 text-sm text-right font-mono'>{tier.flatFee ? `$${tier.flatFee.toFixed(2)}` : '—'}</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default PricingTierTable;
