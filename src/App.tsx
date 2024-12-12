import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { DashboardLayout } from './components/layout/dashboard-layout';
import { OrdersPage } from './pages/orders';
import { KitchenPage } from './pages/kitchen';
import { ProtectedRoute } from './components/auth/protected-route';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/orders" replace />} />
          <Route
            path="orders"
            element={
              <ProtectedRoute allowedRoles={['admin', 'cashier']}>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="kitchen"
            element={
              <ProtectedRoute allowedRoles={['admin', 'kitchen']}>
                <KitchenPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}