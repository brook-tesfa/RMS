import React from 'react';
import { motion } from 'framer-motion';
import { OrderStatus } from '../../types/kitchen';

interface StatusFilterProps {
  currentFilter: OrderStatus | 'all';
  onFilterChange: (filter: OrderStatus | 'all') => void;
  counts: Record<OrderStatus | 'all', number>;
}

export function StatusFilter({ currentFilter, onFilterChange, counts }: StatusFilterProps) {
  const filters: (OrderStatus | 'all')[] = ['all', 'pending', 'preparing', 'ready', 'completed'];

  return (
    <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
      {filters.map((filter) => (
        <motion.button
          key={filter}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors
            ${currentFilter === filter
              ? 'bg-primary-600 text-white'
              : 'bg-white/30 text-primary-700 hover:bg-white/50'
            }`}
        >
          <span className="capitalize">{filter}</span>
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
            {counts[filter]}
          </span>
        </motion.button>
      ))}
    </div>
  );
}