import React from 'react';
import StatusBadge from './StatusBadge';

export default function PaymentStatusBadge({ status }: { status: string }) {
  return <StatusBadge value={status} />;
}
