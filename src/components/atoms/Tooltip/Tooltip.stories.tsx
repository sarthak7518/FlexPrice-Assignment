import type { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';
import { Info, HelpCircle } from 'lucide-react';

/**
 * ## Tooltip
 *
 * An informational popover that appears on hover/focus. Built on Radix
 * Tooltip primitives for accessible, keyboard-navigable behaviour.
 *
 * ### Props
 * - `content` — ReactNode displayed inside the tooltip
 * - `children` — The trigger element
 * - `side` — Placement: `top | right | bottom | left`
 * - `delayDuration` — Delay before showing (ms)
 * - `sideOffset` — Distance from trigger (px)
 */
const meta: Meta<typeof Tooltip> = {
	title: 'Atoms/Tooltip',
	component: Tooltip,
	tags: ['autodocs'],
	argTypes: {
		side: {
			control: 'select',
			options: ['top', 'right', 'bottom', 'left'],
		},
		align: {
			control: 'select',
			options: ['start', 'center', 'end'],
		},
		delayDuration: { control: 'number' },
		sideOffset: { control: 'number' },
	},
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/** Default tooltip (top). */
export const Default: Story = {
	args: {
		content: 'This is a helpful tooltip',
		children: (
			<Button variant='outline' size='sm'>
				Hover me
			</Button>
		),
	},
};

/** Tooltip with a longer delay (500ms). */
export const WithDelay: Story = {
	args: {
		content: 'Appears after 500ms',
		delayDuration: 500,
		children: (
			<Button variant='outline' size='sm'>
				Slow tooltip
			</Button>
		),
	},
};

/** Tooltip on the right side. */
export const RightSide: Story = {
	args: {
		content: 'Right-side tooltip',
		side: 'right',
		children: (
			<Button variant='outline' size='sm'>
				Right
			</Button>
		),
	},
};

/** Tooltip on the bottom. */
export const BottomSide: Story = {
	args: {
		content: 'Bottom tooltip',
		side: 'bottom',
		children: (
			<Button variant='outline' size='sm'>
				Bottom
			</Button>
		),
	},
};

/** Tooltip on the left. */
export const LeftSide: Story = {
	args: {
		content: 'Left-side tooltip',
		side: 'left',
		children: (
			<Button variant='outline' size='sm'>
				Left
			</Button>
		),
	},
};

/** Tooltip on an icon — common for info hints. */
export const OnIcon: Story = {
	args: {
		content: 'Usage is calculated at the end of each billing period',
		children: (
			<span className='inline-flex cursor-help'>
				<Info className='size-4 text-muted-foreground' />
			</span>
		),
	},
};

/** All placements preview. */
export const AllPlacements: Story = {
	render: () => (
		<div className='flex flex-wrap gap-6 p-12'>
			{(['top', 'right', 'bottom', 'left'] as const).map((side) => (
				<Tooltip key={side} content={`Tooltip on ${side}`} side={side}>
					<Button variant='outline' size='sm'>
						{side}
					</Button>
				</Tooltip>
			))}
		</div>
	),
};

/** Help icon with rich tooltip content. */
export const RichContent: Story = {
	args: {
		content: (
			<div className='max-w-[200px]'>
				<p className='font-medium mb-1'>Graduated Pricing</p>
				<p className='text-xs text-muted-foreground'>
					Each tier is priced independently. Units in tier 1 are always charged at the tier 1 rate.
				</p>
			</div>
		),
		children: (
			<span className='inline-flex cursor-help'>
				<HelpCircle className='size-4 text-muted-foreground' />
			</span>
		),
	},
};
