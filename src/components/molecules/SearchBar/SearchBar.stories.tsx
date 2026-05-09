import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, userEvent, within } from '@storybook/test';
import SearchBar from './SearchBar';

const meta: Meta<typeof SearchBar> = {
	title: 'Molecules/SearchBar',
	component: SearchBar,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text' },
		debounceMs: { control: { type: 'number', min: 0, max: 2000, step: 100 } },
		disabled: { control: 'boolean' },
	},
	args: {
		onSearch: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
	args: { placeholder: 'Search customers…' },
};

export const WithValue: Story = {
	args: { value: 'Acme Corp', placeholder: 'Search customers…' },
};

export const CustomDebounce: Story = {
	args: { placeholder: 'Search (500ms debounce)…', debounceMs: 500 },
};

export const Disabled: Story = {
	args: { placeholder: 'Search…', disabled: true },
};

export const Searching: Story = {
	args: { placeholder: 'Search invoices…' },
};

/** Interaction test: type and verify debounce fires. */
export const InteractionTest: Story = {
	args: {
		placeholder: 'Type here…',
		debounceMs: 100,
		onSearch: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const input = canvas.getByPlaceholderText('Type here…');

		await userEvent.type(input, 'test');

		// Wait for debounce
		await new Promise((r) => setTimeout(r, 200));
		expect(args.onSearch).toHaveBeenCalled();
	},
};
