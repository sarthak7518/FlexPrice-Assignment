import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ## DateRangePicker
 *
 * Calendar-based date range selector for analytics filtering.
 * Supports preset ranges (Last 7 days, 30 days, etc.) and
 * manual date selection.
 */
export interface DateRange {
	from: Date | null;
	to: Date | null;
}

export interface DateRangePickerProps {
	value?: DateRange;
	onChange?: (range: DateRange) => void;
	className?: string;
	presets?: { label: string; range: DateRange }[];
}

const DEFAULT_PRESETS: { label: string; getDates: () => DateRange }[] = [
	{ label: 'Last 7 days', getDates: () => ({ from: daysAgo(7), to: new Date() }) },
	{ label: 'Last 30 days', getDates: () => ({ from: daysAgo(30), to: new Date() }) },
	{ label: 'Last 90 days', getDates: () => ({ from: daysAgo(90), to: new Date() }) },
	{ label: 'This month', getDates: () => ({ from: startOfMonth(new Date()), to: new Date() }) },
];

function daysAgo(n: number): Date {
	const d = new Date();
	d.setDate(d.getDate() - n);
	return d;
}

function startOfMonth(d: Date): Date {
	return new Date(d.getFullYear(), d.getMonth(), 1);
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDaysInMonth(year: number, month: number): number {
	return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
	return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isInRange(date: Date, from: Date | null, to: Date | null): boolean {
	if (!from || !to) return false;
	return date >= from && date <= to;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ value, onChange, className }) => {
	const [displayMonth, setDisplayMonth] = useState(() => {
		const now = value?.from ?? new Date();
		return { year: now.getFullYear(), month: now.getMonth() };
	});

	const [selecting, setSelecting] = useState<'from' | 'to'>('from');
	const [range, setRange] = useState<DateRange>(value ?? { from: null, to: null });

	const { year, month } = displayMonth;
	const daysInMonth = getDaysInMonth(year, month);
	const firstDay = getFirstDayOfMonth(year, month);

	const handleDayClick = (day: number) => {
		const clicked = new Date(year, month, day);

		if (selecting === 'from') {
			const newRange = { from: clicked, to: null };
			setRange(newRange);
			setSelecting('to');
		} else {
			const from = range.from!;
			const newRange = clicked >= from ? { from, to: clicked } : { from: clicked, to: from };
			setRange(newRange);
			setSelecting('from');
			onChange?.(newRange);
		}
	};

	const handlePreset = (getDates: () => DateRange) => {
		const newRange = getDates();
		setRange(newRange);
		setSelecting('from');
		onChange?.(newRange);
	};

	const prevMonth = () => {
		setDisplayMonth((prev) => (prev.month === 0 ? { year: prev.year - 1, month: 11 } : { ...prev, month: prev.month - 1 }));
	};

	const nextMonth = () => {
		setDisplayMonth((prev) => (prev.month === 11 ? { year: prev.year + 1, month: 0 } : { ...prev, month: prev.month + 1 }));
	};

	const formatDate = (d: Date | null) => (d ? `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}` : '—');

	return (
		<div className={cn('border rounded-lg bg-white shadow-sm p-4 w-[320px]', className)}>
			{/* Selected range display */}
			<div className='flex items-center gap-2 mb-3 px-1'>
				<Calendar className='size-4 text-muted-foreground' />
				<span className='text-sm'>
					{formatDate(range.from)} → {formatDate(range.to)}
				</span>
			</div>

			{/* Presets */}
			<div className='flex flex-wrap gap-1 mb-3'>
				{DEFAULT_PRESETS.map((p) => (
					<button
						key={p.label}
						type='button'
						onClick={() => handlePreset(p.getDates)}
						className='px-2 py-1 text-xs rounded-md border hover:bg-accent transition-colors'>
						{p.label}
					</button>
				))}
			</div>

			{/* Calendar header */}
			<div className='flex items-center justify-between mb-2 px-1'>
				<button type='button' onClick={prevMonth} className='p-1 rounded hover:bg-accent'>
					<ChevronLeft className='size-4' />
				</button>
				<span className='text-sm font-medium'>
					{MONTHS[month]} {year}
				</span>
				<button type='button' onClick={nextMonth} className='p-1 rounded hover:bg-accent'>
					<ChevronRight className='size-4' />
				</button>
			</div>

			{/* Day-of-week headers */}
			<div className='grid grid-cols-7 mb-1'>
				{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
					<div key={d} className='text-center text-xs text-muted-foreground py-1'>
						{d}
					</div>
				))}
			</div>

			{/* Calendar grid */}
			<div className='grid grid-cols-7'>
				{/* Empty cells for days before the 1st */}
				{[...Array(firstDay)].map((_, i) => (
					<div key={`empty-${i}`} />
				))}

				{/* Day cells */}
				{[...Array(daysInMonth)].map((_, i) => {
					const day = i + 1;
					const date = new Date(year, month, day);
					const isFrom = range.from && isSameDay(date, range.from);
					const isTo = range.to && isSameDay(date, range.to);
					const inRange = isInRange(date, range.from, range.to);

					return (
						<button
							key={day}
							type='button'
							onClick={() => handleDayClick(day)}
							className={cn(
								'h-8 text-xs rounded-md transition-colors',
								isFrom || isTo ? 'bg-[#092E44] text-white font-medium' : inRange ? 'bg-[#092E44]/10' : 'hover:bg-accent',
							)}>
							{day}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default DateRangePicker;
