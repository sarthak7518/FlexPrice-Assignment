import React from 'react';
import Chip from '@/components/atoms/Chip/Chip';
import { getInvoiceStatusLabel, getInvoiceStatusColor, type InvoiceStatus } from '@/utils/statusLabels';
import { CheckCircle, Clock, XCircle, AlertTriangle, FileText, Ban } from 'lucide-react';

/**
 * ## InvoiceStatusBadge
 *
 * Maps invoice status strings to coloured chips with semantic icons.
 * A thin wrapper around the Chip atom that encodes FlexPrice-specific
 * invoice status logic.
 *
 * @param status - The invoice status from the API
 * @param className - Optional additional classes
 */
export interface InvoiceStatusBadgeProps {
	status: InvoiceStatus | string;
	className?: string;
}

const STATUS_ICONS: Record<string, React.ReactNode> = {
	paid: <CheckCircle className='size-3.5' />,
	draft: <Clock className='size-3.5' />,
	void: <Ban className='size-3.5' />,
	overdue: <AlertTriangle className='size-3.5' />,
	finalized: <FileText className='size-3.5' />,
	uncollectible: <XCircle className='size-3.5' />,
};

const InvoiceStatusBadge: React.FC<InvoiceStatusBadgeProps> = ({ status, className }) => {
	const colors = getInvoiceStatusColor(status);
	const label = getInvoiceStatusLabel(status);
	const icon = STATUS_ICONS[status.toLowerCase()] ?? null;

	return <Chip label={label} icon={icon} bgColor={colors.bg} textColor={colors.text} borderColor={colors.border} className={className} />;
};

export default InvoiceStatusBadge;
