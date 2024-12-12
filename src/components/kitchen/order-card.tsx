import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertCircle } from 'lucide-react';
import { GlassCard } from '../ui/glass-card';
import { KitchenOrder } from '../../types/kitchen';
import { formatDistanceToNow } from '../../lib/date-utils';

interface OrderCardProps {
  order: KitchenOrder;
  onStatusChange: (id: string, status: OrderStatus) => void;
}

export function OrderCard({ order, onStatusChange }: OrderCardProps) {
  const statusColors = {
    pending: 'bg-yellow-500',
    preparing: 'bg-blue-500',
    ready: 'bg-green-500',
    completed: 'bg-gray-500',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <GlassCard className="relative">
        {order.priority === 'high' && (
          <div className="absolute -top-2 -right-2">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
        )}
        
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold text-primary-900">
              Order #{order.id}
            </h3>
            {order.tableNumber && (
              <p className="text-sm text-primary-600">Table {order.tableNumber}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-600" />
            <span className="text-sm text-primary-600">
              {formatDistanceToNow(order.orderTime)}
            </span>
          </div>
        </div>

        <ul className="space-y-2 mb-4">
          {order.items.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span className="text-primary-800">{item.name}</span>
              <span className="font-medium text-primary-900">×{item.quantity}</span>
            </li>
          ))}
        </ul>

        {order.notes && (
          <p className="text-sm text-primary-600 mb-4">{order.notes}</p>
        )}

        <div className="flex gap-2">
          {Object.keys(statusColors).map((status) => (
            <button
              key={status}
              onClick={() => onStatusChange(order.id, status as OrderStatus)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors
                ${order.status === status 
                  ? statusColors[status as OrderStatus] + ' text-white'
                  : 'bg-white/50 text-primary-700 hover:bg-primary-100'
                }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}