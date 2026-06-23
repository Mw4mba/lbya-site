import React from 'react';
import { notFound } from 'next/navigation';
import AdminLayout from '@/app/components/admin/AdminLayout';
import SubscriberDetailCard from '@/app/components/admin/SubscriberDetailCard';
import { subscribers } from '@/app/components/admin/mockData';

export default async function AdminSubscriberDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const subscriber = subscribers.find((item, index) => {
    const numericId = String(index + 1);
    return item.id === id || numericId === id;
  });

  if (!subscriber) {
    notFound();
  }

  return (
    <AdminLayout
      activePath="/admin/subscribers"
      title={`Subscriber: ${subscriber.companyName}`}
      subtitle="Customer profile, billing history, and operational controls"
    >
      <SubscriberDetailCard subscriber={subscriber} />
    </AdminLayout>
  );
}
