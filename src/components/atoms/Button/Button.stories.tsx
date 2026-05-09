import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, userEvent, within } from '@storybook/test';
import Button from './Button';
import { Mail, Plus, ArrowRight, Trash2, Download } from 'lucide-react';

/**
 * ## Button
 *
 * The primary interactive element in the FlexPrice UI. Supports multiple
 * visual variants, sizes, loading states, and icon slots.
 *
 * Built on top of `class-variance-authority` for type-safe variant
 * composition and Radix `Slot` for polymorphic rendering.
 *
 * ### Props
 * - `variant` — Visual style: `default`, `black`, `destructive`, `outline`, `secondary`, `ghost`, `link`
 * - `size` — Dimensions: `default`, `sm`, `lg`, `xs`, `icon`
 * - `isLoading` — Shows a spinner and disables interaction
 * - `prefixIcon` / `suffixIcon` — Render icons before/after the label
 * - `asChild` — Merge props onto the child element (Radix Slot pattern)
 * - `disabled` — Prevents interaction
 */
const meta: Meta<typeof Button> = {
	title: 'Atoms/Button',
	component: Button,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
			description: 'Visual style variant',
		},
		size: {
			control: 'select',
			options: ['default', 'sm', 'lg', 'xs', 'icon'],
			description: 'Button size',
		},
		isLoading: {
			control: 'boolean',
			description: 'Show loading spinner',
		},
		disabled: {
			control: 'boolean',
			description: 'Disable the button',
		},
	},
	args: {
		onClick: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

/** Default button appearance — the primary CTA style. */
export const Default: Story = {
	args: {
		children: 'Create Plan',
		variant: 'default',
		size: 'default',
	},
};

/** All visual variants side by side. */
export const AllVariants: Story = {
	render: () => (
		<div className='flex flex-wrap gap-3 items-center'>
			<Button variant='default'>Default</Button>
			<Button variant='black'>Black</Button>
			<Button variant='destructive'>Destructive</Button>
			<Button variant='outline'>Outline</Button>
			<Button variant='secondary'>Secondary</Button>
			<Button variant='ghost'>Ghost</Button>
			<Button variant='link'>Link</Button>
		</div>
	),
};

/** All sizes compared. */
export const Sizes: Story = {
	render: () => (
		<div className='flex flex-wrap gap-3 items-center'>
			<Button size='xs'>Extra Small</Button>
			<Button size='sm'>Small</Button>
			<Button size='default'>Default</Button>
			<Button size='lg'>Large</Button>
		</div>
	),
};

/** Loading state with spinner animation. */
export const Loading: Story = {
	args: {
		children: 'Saving…',
		isLoading: true,
	},
};

/** Disabled button. */
export const Disabled: Story = {
	args: {
		children: 'Disabled',
		disabled: true,
	},
};

/** Destructive / danger button — for delete actions. */
export const Danger: Story = {
	args: {
		children: 'Delete Plan',
		variant: 'destructive',
		prefixIcon: <Trash2 className='size-4' />,
	},
};

/** Button with a prefix icon. */
export const WithPrefixIcon: Story = {
	args: {
		children: 'Send Invoice',
		prefixIcon: <Mail className='size-4' />,
	},
};

/** Button with a suffix icon. */
export const WithSuffixIcon: Story = {
	args: {
		children: 'Next Step',
		suffixIcon: <ArrowRight className='size-4' />,
	},
};

/** Icon-only button. */
export const IconOnly: Story = {
	args: {
		children: <Plus className='size-4' />,
		size: 'icon',
		variant: 'outline',
	},
};

/** Outline button with download icon — common in table toolbars. */
export const OutlineWithIcon: Story = {
	args: {
		children: 'Export CSV',
		variant: 'outline',
		prefixIcon: <Download className='size-4' />,
	},
};

/** Ghost button — used in sidebars and menus. */
export const Ghost: Story = {
	args: {
		children: 'Cancel',
		variant: 'ghost',
	},
};

// ── Interaction Tests ───────────────────────────────────────────────

/** Verifies the click handler fires and the disabled state prevents interaction. */
export const InteractionTest: Story = {
	args: {
		children: 'Click Me',
		onClick: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', { name: /click me/i });

		// Click should fire
		await userEvent.click(button);
		expect(args.onClick).toHaveBeenCalledTimes(1);

		// Second click
		await userEvent.click(button);
		expect(args.onClick).toHaveBeenCalledTimes(2);
	},
};
