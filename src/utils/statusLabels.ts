/**
 * Status label and color mapping utilities for the FlexPrice UI.
 *
 * The app displays entity statuses (invoices, subscriptions, plans) as
 * coloured badges.  These helpers centralise the mapping from API enum
 * strings to human-readable labels and design-token colours.
 */

// ── Invoice statuses ────────────────────────────────────────────────

export type InvoiceStatus = 'draft' | 'finalized' | 'paid' | 'void' | 'overdue' | 'uncollectible';

const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
	draft: 'Draft',
	finalized: 'Finalized',
	paid: 'Paid',
	void: 'Void',
	overdue: 'Overdue',
	uncollectible: 'Uncollectible',
};

const INVOICE_STATUS_COLORS: Record<InvoiceStatus, { bg: string; text: string; border: string }> = {
	draft: { bg: '#F0F2F5', text: '#57646E', border: '#F0F2F5' },
	finalized: { bg: '#EFF8FF', text: '#2F6FE2', border: '#EFF8FF' },
	paid: { bg: '#ECFBE4', text: '#377E6A', border: '#d1e9ca' },
	void: { bg: '#F0F2F5', text: '#57646E', border: '#F0F2F5' },
	overdue: { bg: '#FEE2E2', text: '#DC2626', border: '#FEE2E2' },
	uncollectible: { bg: '#FFF7ED', text: '#C2410C', border: '#FFF7ED' },
};

/**
 * Get a human-readable display label for an invoice status.
 *
 * @param status - The raw status string from the API
 * @returns Display label (e.g. "Paid", "Draft")
 */
export function getInvoiceStatusLabel(status: string): string {
	return INVOICE_STATUS_LABELS[status as InvoiceStatus] ?? status;
}

/**
 * Get the colour scheme for an invoice status badge.
 *
 * @param status - The raw status string
 * @returns Object with `bg`, `text`, and `border` colour values
 */
export function getInvoiceStatusColor(status: string): { bg: string; text: string; border: string } {
	return INVOICE_STATUS_COLORS[status as InvoiceStatus] ?? INVOICE_STATUS_COLORS.draft;
}

// ── Subscription statuses ───────────────────────────────────────────

export type SubscriptionStatus = 'active' | 'cancelled' | 'paused' | 'trialing' | 'expired' | 'pending';

const SUBSCRIPTION_STATUS_LABELS: Record<SubscriptionStatus, string> = {
	active: 'Active',
	cancelled: 'Cancelled',
	paused: 'Paused',
	trialing: 'Trialing',
	expired: 'Expired',
	pending: 'Pending',
};

const SUBSCRIPTION_STATUS_COLORS: Record<SubscriptionStatus, { bg: string; text: string; border: string }> = {
	active: { bg: '#ECFBE4', text: '#377E6A', border: '#d1e9ca' },
	cancelled: { bg: '#FEE2E2', text: '#DC2626', border: '#FEE2E2' },
	paused: { bg: '#FFF7ED', text: '#C2410C', border: '#FFF7ED' },
	trialing: { bg: '#EFF8FF', text: '#2F6FE2', border: '#EFF8FF' },
	expired: { bg: '#F0F2F5', text: '#57646E', border: '#F0F2F5' },
	pending: { bg: '#FFF7ED', text: '#C2410C', border: '#FFF7ED' },
};

export function getSubscriptionStatusLabel(status: string): string {
	return SUBSCRIPTION_STATUS_LABELS[status as SubscriptionStatus] ?? status;
}

export function getSubscriptionStatusColor(status: string): { bg: string; text: string; border: string } {
	return SUBSCRIPTION_STATUS_COLORS[status as SubscriptionStatus] ?? SUBSCRIPTION_STATUS_COLORS.pending;
}

// ── Plan statuses ───────────────────────────────────────────────────

export type PlanStatus = 'active' | 'archived' | 'draft';

const PLAN_STATUS_LABELS: Record<PlanStatus, string> = {
	active: 'Active',
	archived: 'Archived',
	draft: 'Draft',
};

const PLAN_STATUS_COLORS: Record<PlanStatus, { bg: string; text: string; border: string }> = {
	active: { bg: '#ECFBE4', text: '#377E6A', border: '#d1e9ca' },
	archived: { bg: '#F0F2F5', text: '#57646E', border: '#F0F2F5' },
	draft: { bg: '#FFF7ED', text: '#C2410C', border: '#FFF7ED' },
};

export function getPlanStatusLabel(status: string): string {
	return PLAN_STATUS_LABELS[status as PlanStatus] ?? status;
}

export function getPlanStatusColor(status: string): { bg: string; text: string; border: string } {
	return PLAN_STATUS_COLORS[status as PlanStatus] ?? PLAN_STATUS_COLORS.draft;
}

// ── Generic helper ──────────────────────────────────────────────────

/**
 * Generic status-to-Chip-variant mapper.
 * Returns a variant string compatible with the Chip component.
 */
export function getStatusVariant(status: string): 'success' | 'failed' | 'warning' | 'info' | 'default' {
	const lc = status.toLowerCase();
	if (['active', 'paid'].includes(lc)) return 'success';
	if (['cancelled', 'void', 'overdue', 'uncollectible'].includes(lc)) return 'failed';
	if (['paused', 'pending', 'draft', 'expired'].includes(lc)) return 'warning';
	if (['finalized', 'trialing'].includes(lc)) return 'info';
	return 'default';
}
