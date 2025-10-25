import { motion } from 'motion/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
}

export function AnimatedButton({ 
  children, 
  variant = 'primary', 
  icon,
  className = '',
  ...props 
}: AnimatedButtonProps) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 justify-center';
  
  const variantClasses = {
    primary: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    secondary: 'bg-zinc-800 hover:bg-zinc-700 text-white',
    ghost: 'bg-transparent hover:bg-zinc-800/50 text-zinc-300'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {icon && (
        <motion.span
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </motion.button>
  );
}
