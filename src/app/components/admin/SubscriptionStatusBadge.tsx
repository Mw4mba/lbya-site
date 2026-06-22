import React from 'react';
import StatusBadge from './StatusBadge';

export default function SubscriptionStatusBadge({ status }: { status: string }) {
  return <StatusBadge value={status} />;
}
