import { useState, useCallback } from 'react';
import { orders as ordersApi } from '../lib/api';
import { socketService } from '../lib/socket';
import { OrderItem } from '../types/order';

export function useOrders() {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = useCallback((menuItem: MenuItem) => {
    setOrderItems((current) => {
      const existingItem = current.find(
        (item) => item.menuItem.id === menuItem.id
      );

      if (existingItem) {
        return current.map((item) =>
          item.menuItem.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { menuItem, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, change: number) => {
    setOrderItems((current) =>
      current.map((item) =>
        item.menuItem.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setOrderItems((current) =>
      current.filter((item) => item.menuItem.id !== itemId)
    );
  }, []);

  const submitOrder = useCallback(async () => {
    if (orderItems.length === 0) return;

    setIsSubmitting(true);
    try {
      const total = orderItems.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0
      );

      const order = await ordersApi.create({
        items: orderItems,
        status: 'pending',
        total,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Notify kitchen through WebSocket
      socketService.emit('new_order', order);
      
      // Clear the order
      setOrderItems([]);
    } catch (error) {
      console.error('Failed to submit order:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [orderItems]);

  return {
    orderItems,
    isSubmitting,
    addItem,
    updateQuantity,
    removeItem,
    submitOrder,
  };
}