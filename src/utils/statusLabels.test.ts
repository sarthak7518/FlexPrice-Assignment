import { describe, it, expect } from 'vitest';
import {
	getInvoiceStatusLabel,
	getInvoiceStatusColor,
	getSubscriptionStatusLabel,
	getPlanStatusLabel,
	getStatusVariant,
} from './statusLabels';

describe('getInvoiceStatusLabel', () => {
	it('returns "Paid" for paid status', () => {
		expect(getInvoiceStatusLabel('paid')).toBe('Paid');
	});

	it('returns "Draft" for draft status', () => {
		expect(getInvoiceStatusLabel('draft')).toBe('Draft');
	});

	it('returns "Void" for void status', () => {
		expect(getInvoiceStatusLabel('void')).toBe('Void');
	});

	it('returns "Overdue" for overdue status', () => {
		expect(getInvoiceStatusLabel('overdue')).toBe('Overdue');
	});

	it('returns "Finalized" for finalized status', () => {
		expect(getInvoiceStatusLabel('finalized')).toBe('Finalized');
	});

	it('returns raw string for unknown status', () => {
		expect(getInvoiceStatusLabel('unknown_status')).toBe('unknown_status');
	});
});

describe('getInvoiceStatusColor', () => {
	it('returns green scheme for paid', () => {
		const colors = getInvoiceStatusColor('paid');
		expect(colors.bg).toBe('#ECFBE4');
		expect(colors.text).toBe('#377E6A');
	});

	it('returns red scheme for overdue', () => {
		const colors = getInvoiceStatusColor('overdue');
		expect(colors.bg).toBe('#FEE2E2');
		expect(colors.text).toBe('#DC2626');
	});

	it('returns grey (draft) for unknown status', () => {
		const colors = getInvoiceStatusColor('foobar');
		expect(colors).toEqual(getInvoiceStatusColor('draft'));
	});
});

describe('getSubscriptionStatusLabel', () => {
	it('returns "Active" for active', () => {
		expect(getSubscriptionStatusLabel('active')).toBe('Active');
	});

	it('returns "Cancelled" for cancelled', () => {
		expect(getSubscriptionStatusLabel('cancelled')).toBe('Cancelled');
	});

	it('returns raw string for unknown', () => {
		expect(getSubscriptionStatusLabel('test')).toBe('test');
	});
});

describe('getPlanStatusLabel', () => {
	it('returns "Active" for active', () => {
		expect(getPlanStatusLabel('active')).toBe('Active');
	});

	it('returns "Archived" for archived', () => {
		expect(getPlanStatusLabel('archived')).toBe('Archived');
	});
});

describe('getStatusVariant', () => {
	it('returns success for "active"', () => {
		expect(getStatusVariant('active')).toBe('success');
	});

	it('returns success for "paid"', () => {
		expect(getStatusVariant('paid')).toBe('success');
	});

	it('returns failed for "cancelled"', () => {
		expect(getStatusVariant('cancelled')).toBe('failed');
	});

	it('returns warning for "draft"', () => {
		expect(getStatusVariant('draft')).toBe('warning');
	});

	it('returns info for "finalized"', () => {
		expect(getStatusVariant('finalized')).toBe('info');
	});

	it('returns default for unknown status', () => {
		expect(getStatusVariant('random')).toBe('default');
	});

	it('is case-insensitive', () => {
		expect(getStatusVariant('ACTIVE')).toBe('success');
	});
});
