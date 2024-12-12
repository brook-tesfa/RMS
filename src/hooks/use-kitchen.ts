import { useEffect, useCallback } from 'react';
import { useKitchenStore } from '../store/kitchen.store';
import { socketService } from '../lib/socket';
import { orders as ordersApi } from '../lib/api';
import { OrderStatus } from '../types/kitchen';

export function useKitchen() {
  const { orders, filter, setFilter } = useKitchenStore();

  useEffect(() => {
    const unsubscribe = socketService.subscribeToKitchenUpdates((order) => {
      useKitchenStore.setState((state) => ({
        orders: state.orders.map((o) => (o.id === order.id ? order : o)),
      }));
    });

    // Load initial orders
    ordersApi.getAll().then((orders) => {
      useKitchenStore.setState({ orders });
    });

    return unsubscribe;
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    try {
      await ordersApi.updateStatus(id, status);
      socketService.updateOrderStatus(id, status);
      
      useKitchenStore.setState((state) => ({
        orders: state.orders.map((order) =>
          order.id === id ? { ...order, status } : order
        ),
      }));
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  }, []);

  const filteredOrders = orders.filter(
    (order) => filter === 'all' || order.status === filter
  );

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  };

  return {
    orders: filteredOrders,
    filter,
    counts,
    setFilter,
    updateOrderStatus,
  };
}