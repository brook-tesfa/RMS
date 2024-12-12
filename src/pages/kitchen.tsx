import React from 'react';
import { OrderList } from '../components/kitchen/order-list';
import { StatusFilter } from '../components/kitchen/status-filter';
import { useAuth } from '../hooks/use-auth';
import { useKitchen } from '../hooks/use-kitchen';
import { AccessDenied } from '../components/shared/access-denied';

export function KitchenPage() {
  const { user } = useAuth();
  const { orders, filter, counts, setFilter, updateOrderStatus } = useKitchen();

  if (!user || !['admin', 'kitchen'].includes(user.role)) {
    return <AccessDenied />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-900 mb-6">Kitchen Display</h1>
      
      <StatusFilter
        currentFilter={filter}
        onFilterChange={setFilter}
        counts={counts}
      />
      
      <OrderList
        orders={orders}
        onStatusChange={updateOrderStatus}
      />
    </div>
  );
}