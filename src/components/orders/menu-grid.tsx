import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/glass-card';
import type { MenuItem } from '../../types/order';

interface MenuGridProps {
  items: MenuItem[];
  onItemSelect: (item: MenuItem) => void;
}

export function MenuGrid({ items, onItemSelect }: MenuGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <motion.div
          key={item.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <GlassCard
            className="cursor-pointer h-full"
            onClick={() => onItemSelect(item)}
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-lg font-semibold text-primary-900">{item.name}</h3>
            <p className="text-sm text-primary-600 mb-2">{item.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-primary-700">
                ${item.price.toFixed(2)}
              </span>
              <button
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                onClick={() => onItemSelect(item)}
              >
                Add
              </button>
            </div>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}