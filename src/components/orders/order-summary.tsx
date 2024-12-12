import React from 'react';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import type { OrderItem } from '../../types/order';

interface OrderSummaryProps {
  items: OrderItem[];
  onUpdateQuantity: (itemId: string, change: number) => void;
  onRemoveItem: (itemId: string) => void;
  onSubmitOrder: () => void;
  isSubmitting?: boolean;
}

export function OrderSummary({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
  isSubmitting = false,
}: OrderSummaryProps) {
  const total = items.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  );

  return (
    <GlassCard className="h-full">
      <h2 className="text-xl font-bold text-primary-900 mb-4">Current Order</h2>
      
      <div className="space-y-4 mb-4 max-h-[calc(100vh-300px)] overflow-y-auto">
        {items.length === 0 ? (
          <p className="text-center text-primary-600 py-4">
            No items in the order yet
          </p>
        ) : (
          items.map((item) => (
            <motion.div
              key={item.menuItem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-2 rounded-lg bg-white/20"
            >
              <div className="flex-1">
                <h3 className="font-medium text-primary-900">{item.menuItem.name}</h3>
                <p className="text-sm text-primary-600">
                  ${(item.menuItem.price * item.quantity).toFixed(2)}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.menuItem.id, -1)}
                  className="p-1 rounded-full hover:bg-primary-200"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.menuItem.id, 1)}
                  className="p-1 rounded-full hover:bg-primary-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onRemoveItem(item.menuItem.id)}
                  className="p-1 rounded-full hover:bg-red-100 text-red-500"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <div className="border-t border-primary-200 pt-4">
        <div className="flex justify-between text-lg font-bold text-primary-900 mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onSubmitOrder}
          disabled={items.length === 0 || isSubmitting}
          className="w-full py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Order'}
        </motion.button>
      </div>
    </GlassCard>
  );
}