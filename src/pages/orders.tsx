import React from 'react';
import { MenuGrid } from '../components/orders/menu-grid';
import { OrderSummary } from '../components/orders/order-summary';
import { useAuth } from '../hooks/use-auth';
import { useOrders } from '../hooks/use-orders';
import { AccessDenied } from '../components/shared/access-denied';

export function OrdersPage() {
  const { user } = useAuth();
  const {
    orderItems,
    isSubmitting,
    addItem,
    updateQuantity,
    removeItem,
    submitOrder,
  } = useOrders();

  if (!user || !['admin', 'cashier'].includes(user.role)) {
    return <AccessDenied />;
  }

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold text-primary-900 mb-6">Menu</h1>
        <MenuGrid items={SAMPLE_MENU_ITEMS} onItemSelect={addItem} />
      </div>
      <div>
        <OrderSummary
          items={orderItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onSubmitOrder={submitOrder}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}