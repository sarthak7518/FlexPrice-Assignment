import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DateRangePicker from './DateRangePicker';

const meta: Meta<typeof DateRangePicker> = {
	title: 'Molecules/DateRangePicker',
	component: DateRangePicker,
	tags: ['autodocs'],
	args: {
		onChange: fn(),
	},
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

/** Default date range picker with presets. */
export const Default: Story = {};

/** Pre-selected date range. */
export const WithSelectedRange: Story = {
	args: {
		value: {
			from: new Date(2025, 3, 1),
			to: new Date(2025, 3, 15),
		},
	},
};

/** Picker starting from a specific month. */
export const SpecificMonth: Story = {
	args: {
		value: {
			from: new Date(2025, 0, 10),
			to: new Date(2025, 0, 25),
		},
	},
};
