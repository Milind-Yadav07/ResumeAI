import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  className = '', 
  icon: Icon,
  type = 'button',
  disabled = false,
  ...props 
}) => {
  const variants = {
    primary: 'bg-[#2563eb] text-white shadow-[0_4px_15px_rgba(37,99,235,0.3)]',
    secondary: 'bg-white border border-[#e2e8f0] text-[#0f172a] hover:bg-slate-50',
    outline: 'bg-transparent border-2 border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb]/5',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100'
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center gap-[10px] px-6 py-3 rounded-xl font-heading font-semibold text-base cursor-pointer transition-all duration-300 border border-transparent outline-none disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;
