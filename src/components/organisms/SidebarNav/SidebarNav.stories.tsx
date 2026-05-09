import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SidebarNav from './SidebarNav';
import { LayoutDashboard, Users, FileText, CreditCard, Zap, Settings, HelpCircle, Package, BarChart3, Wallet } from 'lucide-react';

const meta: Meta<typeof SidebarNav> = {
	title: 'Organisms/SidebarNav',
	component: SidebarNav,
	tags: ['autodocs'],
	argTypes: {
		collapsed: { control: 'boolean' },
		activeId: { control: 'text' },
	},
	args: {
		onItemClick: fn(),
	},
	decorators: [
		(Story) => (
			<div style={{ height: '600px' }}>
				<Story />
			</div>
		),
	],
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

const navItems = [
	{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className='size-4' /> },
	{ id: 'customers', label: 'Customers', icon: <Users className='size-4' />, badge: 12 },
	{
		id: 'billing',
		label: 'Billing',
		icon: <CreditCard className='size-4' />,
		children: [
			{ id: 'invoices', label: 'Invoices', icon: <FileText className='size-4' />, badge: 3 },
			{ id: 'subscriptions', label: 'Subscriptions', icon: <Package className='size-4' /> },
			{ id: 'wallets', label: 'Wallets', icon: <Wallet className='size-4' /> },
		],
	},
	{ id: 'meters', label: 'Meters', icon: <Zap className='size-4' /> },
	{ id: 'plans', label: 'Plans', icon: <BarChart3 className='size-4' /> },
	{ id: 'settings', label: 'Settings', icon: <Settings className='size-4' /> },
];

/** Default sidebar with navigation items. */
export const Default: Story = {
	args: {
		items: navItems,
		activeId: 'dashboard',
		header: (
			<div className='flex items-center gap-2'>
				<div className='w-7 h-7 rounded-md bg-[#092E44] flex items-center justify-center text-white text-xs font-bold'>FP</div>
				<span className='text-sm font-semibold'>FlexPrice</span>
			</div>
		),
	},
};

/** Collapsed sidebar — icon-only mode. */
export const Collapsed: Story = {
	args: {
		items: navItems,
		activeId: 'customers',
		collapsed: true,
		header: (
			<div className='flex justify-center'>
				<div className='w-7 h-7 rounded-md bg-[#092E44] flex items-center justify-center text-white text-xs font-bold'>FP</div>
			</div>
		),
	},
};

/** Active route on a nested item. */
export const NestedActive: Story = {
	args: {
		items: navItems,
		activeId: 'invoices',
		header: (
			<div className='flex items-center gap-2'>
				<div className='w-7 h-7 rounded-md bg-[#092E44] flex items-center justify-center text-white text-xs font-bold'>FP</div>
				<span className='text-sm font-semibold'>FlexPrice</span>
			</div>
		),
	},
};

/** With footer element. */
export const WithFooter: Story = {
	args: {
		items: navItems,
		activeId: 'dashboard',
		header: (
			<div className='flex items-center gap-2'>
				<div className='w-7 h-7 rounded-md bg-[#092E44] flex items-center justify-center text-white text-xs font-bold'>FP</div>
				<span className='text-sm font-semibold'>FlexPrice</span>
			</div>
		),
		footer: (
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<HelpCircle className='size-4' />
				<span>Help & Support</span>
			</div>
		),
	},
};
