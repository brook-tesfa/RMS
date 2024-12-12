import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './sidebar';

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-100 to-primary-300">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 p-8"
      >
        <Outlet />
      </motion.main>
    </div>
  );
}