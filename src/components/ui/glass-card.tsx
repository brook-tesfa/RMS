import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative backdrop-blur-md bg-white/30 rounded-xl border border-white/20 shadow-lg p-6',
        'hover:bg-white/40 transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}