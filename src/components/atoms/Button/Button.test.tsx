import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
	it('renders with children text', () => {
		render(<Button>Click Me</Button>);
		expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
	});

	it('calls onClick when clicked', () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click</Button>);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it('does not call onClick when disabled', () => {
		const handleClick = vi.fn();
		render(
			<Button onClick={handleClick} disabled>
				Click
			</Button>,
		);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('does not call onClick when loading', () => {
		const handleClick = vi.fn();
		render(
			<Button onClick={handleClick} isLoading>
				Click
			</Button>,
		);
		fireEvent.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('is disabled when isLoading is true', () => {
		render(<Button isLoading>Loading</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('applies the correct variant classes', () => {
		const { container } = render(<Button variant='destructive'>Delete</Button>);
		const button = container.querySelector('button');
		expect(button?.className).toContain('bg-destructive');
	});

	it('renders prefix and suffix icons', () => {
		render(
			<Button prefixIcon={<span data-testid='prefix'>P</span>} suffixIcon={<span data-testid='suffix'>S</span>}>
				With Icons
			</Button>,
		);
		expect(screen.getByTestId('prefix')).toBeInTheDocument();
		expect(screen.getByTestId('suffix')).toBeInTheDocument();
	});

	it('shows spinner when loading', () => {
		render(<Button isLoading>Loading</Button>);
		const svg = screen.getByRole('button').querySelector('svg');
		expect(svg).toBeInTheDocument();
		expect(svg?.classList.contains('animate-spin')).toBe(true);
	});
});
