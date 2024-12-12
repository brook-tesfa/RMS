import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { OrderCard } from './order-card';
import { KitchenOrder, OrderStatus } from '../../types/kitchen';

interface OrderListProps {
  orders: KitchenOrder[];
  onStatusChange: (id: string, status: OrderStatus) => void;
}

export function OrderList({ orders, onStatusChange }: OrderListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence>
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusChange={onStatusChange}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}