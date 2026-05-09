import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
	it('renders the search input with placeholder', () => {
		render(<SearchBar placeholder='Search…' />);
		expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
	});

	it('displays controlled value', () => {
		render(<SearchBar value='test' />);
		expect(screen.getByDisplayValue('test')).toBeInTheDocument();
	});

	it('calls onSearch after debounce', async () => {
		vi.useFakeTimers();
		const onSearch = vi.fn();

		render(<SearchBar onSearch={onSearch} debounceMs={200} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, { target: { value: 'hello' } });

		// Should not be called immediately
		expect(onSearch).not.toHaveBeenCalled();

		// Advance time past debounce
		act(() => {
			vi.advanceTimersByTime(250);
		});

		expect(onSearch).toHaveBeenCalledWith('hello');
		vi.useRealTimers();
	});

	it('shows clear button when value is present', () => {
		render(<SearchBar value='test' />);
		expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
	});

	it('does not show clear button when empty', () => {
		render(<SearchBar value='' />);
		expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
	});

	it('clears input on clear button click', () => {
		const onSearch = vi.fn();
		render(<SearchBar value='test' onSearch={onSearch} />);

		fireEvent.click(screen.getByLabelText('Clear search'));
		expect(onSearch).toHaveBeenCalledWith('');
	});

	it('is disabled when disabled prop is true', () => {
		render(<SearchBar disabled placeholder='Disabled' />);
		expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
	});
});
