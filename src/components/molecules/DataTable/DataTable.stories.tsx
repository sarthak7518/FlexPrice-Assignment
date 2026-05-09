import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DataTable, { type Column } from './DataTable';
import InvoiceStatusBadge from '../InvoiceStatusBadge/InvoiceStatusBadge';
import { FileText } from 'lucide-react';

// ── Mock data types ─────────────────────────────────────────────────

interface Invoice {
	id: string;
	customer: string;
	amount: number;
	status: string;
	date: string;
}

interface VirtualRow {
	id: number;
	name: string;
	email: string;
	usage: number;
	plan: string;
}

// ── Mock data ───────────────────────────────────────────────────────

const invoices: Invoice[] = [
	{ id: 'INV-001', customer: 'Acme Corp', amount: 1250.0, status: 'paid', date: '2025-04-01' },
	{ id: 'INV-002', customer: 'Globex Inc', amount: 3400.5, status: 'overdue', date: '2025-03-15' },
	{ id: 'INV-003', customer: 'Initech LLC', amount: 890.0, status: 'draft', date: '2025-04-10' },
	{ id: 'INV-004', customer: 'Umbrella Corp', amount: 2100.0, status: 'finalized', date: '2025-04-05' },
	{ id: 'INV-005', customer: 'Stark Industries', amount: 15000.0, status: 'paid', date: '2025-03-28' },
	{ id: 'INV-006', customer: 'Wayne Enterprises', amount: 7800.0, status: 'void', date: '2025-02-14' },
	{ id: 'INV-007', customer: 'Cyberdyne Systems', amount: 4500.0, status: 'paid', date: '2025-04-12' },
	{ id: 'INV-008', customer: 'Soylent Corp', amount: 620.0, status: 'draft', date: '2025-04-15' },
];

const invoiceColumns: Column<Invoice>[] = [
	{ key: 'id', header: 'Invoice', render: (row) => <span className='font-medium'>{row.id}</span>, sortable: true, width: '15%' },
	{ key: 'customer', header: 'Customer', render: (row) => row.customer, sortable: true, width: '30%' },
	{
		key: 'amount',
		header: 'Amount',
		render: (row) => `$${row.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
		sortable: true,
		width: '20%',
	},
	{ key: 'status', header: 'Status', render: (row) => <InvoiceStatusBadge status={row.status} />, width: '20%' },
	{ key: 'date', header: 'Date', render: (row) => row.date, sortable: true, width: '15%' },
];

// Generate 10K rows for virtualization demo
const generate10KRows = (): VirtualRow[] => {
	const plans = ['Free', 'Starter', 'Pro', 'Enterprise'];
	return Array.from({ length: 10000 }, (_, i) => ({
		id: i + 1,
		name: `Customer ${(i + 1).toLocaleString()}`,
		email: `customer${i + 1}@example.com`,
		usage: Math.floor(Math.random() * 100000),
		plan: plans[Math.floor(Math.random() * plans.length)],
	}));
};

const virtualColumns: Column<VirtualRow>[] = [
	{
		key: 'id',
		header: '#',
		render: (row) => <span className='font-mono text-muted-foreground'>{row.id}</span>,
		width: '8%',
		sortable: true,
	},
	{ key: 'name', header: 'Name', render: (row) => <span className='font-medium'>{row.name}</span>, width: '25%', sortable: true },
	{ key: 'email', header: 'Email', render: (row) => <span className='text-muted-foreground'>{row.email}</span>, width: '30%' },
	{
		key: 'usage',
		header: 'Usage',
		render: (row) => `${row.usage.toLocaleString()} calls`,
		width: '20%',
		sortable: true,
	},
	{ key: 'plan', header: 'Plan', render: (row) => row.plan, width: '17%', sortable: true },
];

// ── Stories ──────────────────────────────────────────────────────────

/**
 * ## DataTable
 *
 * A full-featured data table for FlexPrice list views. Supports column
 * sorting, pagination, loading skeletons, empty state, and **virtualized
 * rendering** for datasets of 10,000+ rows using `@tanstack/react-virtual`.
 */
const meta: Meta<typeof DataTable> = {
	title: 'Molecules/DataTable',
	component: DataTable,
	tags: ['autodocs'],
	argTypes: {
		loading: { control: 'boolean' },
		virtualized: { control: 'boolean' },
		paginated: { control: 'boolean' },
		pageSize: { control: { type: 'number', min: 5, max: 50, step: 5 } },
		emptyMessage: { control: 'text' },
	},
	decorators: [
		(Story) => (
			<div style={{ width: '800px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof DataTable>;

/** Default invoice table with sortable columns. */
export const Default: Story = {
	args: {
		columns: invoiceColumns as Column<unknown>[],
		data: invoices,
		onRowClick: fn(),
	},
};

/** Sortable columns — click headers to sort. */
export const Sortable: Story = {
	args: {
		columns: invoiceColumns as Column<unknown>[],
		data: invoices,
	},
};

/** Loading skeleton while data is being fetched. */
export const Loading: Story = {
	args: {
		columns: invoiceColumns as Column<unknown>[],
		data: [],
		loading: true,
		loadingRows: 5,
	},
};

/** Empty state when no data matches the filter. */
export const Empty: Story = {
	args: {
		columns: invoiceColumns as Column<unknown>[],
		data: [],
		emptyMessage: 'No invoices found. Try adjusting your filters.',
		emptyIcon: <FileText className='size-8 mb-2 text-gray-300' />,
	},
};

/** Paginated table with 3 items per page. */
export const Paginated: Story = {
	args: {
		columns: invoiceColumns as Column<unknown>[],
		data: invoices,
		paginated: true,
		pageSize: 3,
	},
};

/**
 * ### Virtualised — 10,000 Rows (Challenge B)
 *
 * Demonstrates smooth scrolling of 10,000 rows using `@tanstack/react-virtual`.
 * The virtualizer only renders the visible rows plus an overscan buffer,
 * keeping DOM node count low and scroll performance high.
 *
 * - **Estimated row height**: 48px
 * - **Overscan**: 10 rows
 * - **Container height**: 500px
 */
export const Virtualised10K: Story = {
	render: () => {
		const data = generate10KRows();
		return (
			<div>
				<p className='text-sm text-muted-foreground mb-3'>
					Rendering <strong>10,000 rows</strong> with virtualization. Only ~15 DOM nodes exist at any time.
				</p>
				<DataTable
					columns={virtualColumns}
					data={data}
					virtualized
					virtualHeight={500}
					estimateSize={48}
					overscan={10}
					getRowId={(row) => String(row.id)}
				/>
			</div>
		);
	},
};

/** Clickable rows with hover effect. */
export const ClickableRows: Story = {
	args: {
		columns: invoiceColumns as Column<unknown>[],
		data: invoices,
		onRowClick: fn(),
	},
};
