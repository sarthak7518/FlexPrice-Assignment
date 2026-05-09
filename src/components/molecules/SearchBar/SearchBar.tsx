import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Search, X } from 'lucide-react';

/**
 * ## SearchBar
 *
 * A debounced search input with clear button. Used in list pages
 * (customers, invoices, plans) for filtering.
 *
 * @param value - Controlled value
 * @param onSearch - Fired after debounce with the search term
 * @param placeholder - Input placeholder text
 * @param debounceMs - Debounce delay in milliseconds (default 300)
 * @param className - Additional classes
 */
export interface SearchBarProps {
	value?: string;
	onSearch?: (value: string) => void;
	placeholder?: string;
	debounceMs?: number;
	className?: string;
	disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
	value: controlledValue,
	onSearch,
	placeholder = 'Search…',
	debounceMs = 300,
	className,
	disabled = false,
}) => {
	const [internalValue, setInternalValue] = useState(controlledValue ?? '');
	const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

	useEffect(() => {
		if (controlledValue !== undefined) {
			setInternalValue(controlledValue);
		}
	}, [controlledValue]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setInternalValue(newValue);

			if (debounceTimer.current) clearTimeout(debounceTimer.current);

			debounceTimer.current = setTimeout(() => {
				onSearch?.(newValue);
			}, debounceMs);
		},
		[debounceMs, onSearch],
	);

	const handleClear = useCallback(() => {
		setInternalValue('');
		onSearch?.('');
		if (debounceTimer.current) clearTimeout(debounceTimer.current);
	}, [onSearch]);

	useEffect(() => {
		return () => {
			if (debounceTimer.current) clearTimeout(debounceTimer.current);
		};
	}, []);

	return (
		<div
			className={cn(
				'flex items-center gap-2 px-3 h-9 rounded-lg border bg-background text-sm transition-colors',
				'focus-within:ring-1 focus-within:ring-ring focus-within:border-black',
				disabled && 'opacity-50 cursor-not-allowed',
				className,
			)}>
			<Search className='size-4 text-muted-foreground shrink-0' />
			<input
				type='text'
				value={internalValue}
				onChange={handleChange}
				placeholder={placeholder}
				disabled={disabled}
				className='flex-1 bg-transparent outline-none placeholder:text-muted-foreground min-w-0'
			/>
			{internalValue && !disabled && (
				<button
					type='button'
					onClick={handleClear}
					className='shrink-0 rounded-sm p-0.5 hover:bg-accent transition-colors'
					aria-label='Clear search'>
					<X className='size-3.5 text-muted-foreground' />
				</button>
			)}
		</div>
	);
};

export default SearchBar;
