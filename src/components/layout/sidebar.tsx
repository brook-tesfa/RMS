import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChefHat, 
  ShoppingCart, 
  Utensils, 
  Settings,
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../hooks/use-auth';
import { cn } from '../../lib/utils';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

function NavItem({ to, icon: Icon, children }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'flex items-center gap-2 p-2 rounded-lg transition-colors',
        'hover:bg-white/20',
        isActive && 'bg-white/30 text-primary-900',
        !isActive && 'text-primary-700'
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </Link>
  );
}

export function Sidebar() {
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6"
    >
      <div className="flex items-center gap-2 mb-8">
        <ChefHat className="w-8 h-8 text-primary-600" />
        <span className="text-xl font-bold text-primary-900">RMS</span>
      </div>

      <nav className="space-y-2">
        <NavItem to="/orders" icon={ShoppingCart}>Orders</NavItem>
        <NavItem to="/kitchen" icon={Utensils}>Kitchen</NavItem>
        <NavItem to="/settings" icon={Settings}>Settings</NavItem>
      </nav>

      <div className="absolute bottom-6 left-6">
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </motion.aside>
  );
}