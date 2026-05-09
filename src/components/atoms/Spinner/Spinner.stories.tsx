import type { Meta, StoryObj } from '@storybook/react';
import Spinner from './Spinner';

/**
 * ## Spinner / LoadingState
 *
 * An animated loading indicator used throughout the FlexPrice UI.
 * Available in multiple sizes for inline (button), section-level,
 * and full-page loading states.
 *
 * ### Props
 * - `size` — Pixel dimension (default 24)
 * - `className` — Additional CSS classes (e.g. for colour)
 */
const meta: Meta<typeof Spinner> = {
	title: 'Atoms/Spinner',
	component: Spinner,
	tags: ['autodocs'],
	argTypes: {
		size: { control: { type: 'number', min: 12, max: 80, step: 4 } },
		className: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/** Default 24px spinner. */
export const Default: Story = {
	args: { size: 24 },
};

/** Small spinner (16px) — for inline use in buttons. */
export const Small: Story = {
	args: { size: 16, className: 'text-gray-500' },
};

/** Large spinner (48px) — for section-level loading. */
export const Large: Story = {
	args: { size: 48 },
};

/** All sizes compared. */
export const Sizes: Story = {
	render: () => (
		<div className='flex items-center gap-6'>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={16} />
				<span className='text-xs text-muted-foreground'>16px</span>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={24} />
				<span className='text-xs text-muted-foreground'>24px</span>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={32} />
				<span className='text-xs text-muted-foreground'>32px</span>
			</div>
			<div className='flex flex-col items-center gap-2'>
				<Spinner size={48} />
				<span className='text-xs text-muted-foreground'>48px</span>
			</div>
		</div>
	),
};

/** Coloured spinner — using Tailwind text colour classes. */
export const Colored: Story = {
	render: () => (
		<div className='flex items-center gap-6'>
			<Spinner size={32} className='text-blue-600' />
			<Spinner size={32} className='text-green-600' />
			<Spinner size={32} className='text-red-500' />
			<Spinner size={32} className='text-purple-600' />
		</div>
	),
};

/** Full-page loading state — centered with a message. */
export const FullPageLoading: Story = {
	render: () => (
		<div className='flex flex-col items-center justify-center gap-4 h-[300px] w-[400px] border rounded-lg bg-background'>
			<Spinner size={40} className='text-[#092E44]' />
			<p className='text-sm text-muted-foreground'>Loading invoices…</p>
		</div>
	),
};

/** Inline loading state — inside a card. */
export const InlineLoading: Story = {
	render: () => (
		<div className='flex items-center gap-3 px-4 py-3 border rounded-lg'>
			<Spinner size={16} className='text-[#092E44]' />
			<span className='text-sm'>Calculating usage…</span>
		</div>
	),
};

/** Loading skeleton placeholder — common table loading state. */
export const Skeleton: Story = {
	render: () => (
		<div className='space-y-3 w-[400px]'>
			{[...Array(5)].map((_, i) => (
				<div key={i} className='flex items-center gap-3'>
					<div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
					<div className='h-4 flex-1 bg-gray-200 rounded animate-pulse' />
					<div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
				</div>
			))}
		</div>
	),
};
