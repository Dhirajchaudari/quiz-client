// Button.tsx
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean; // Add disabled prop
}

const Button: React.FC<ButtonProps> = ({ children, className, disabled, ...rest }) => {
  return (
    <button
      className={`py-2 px-4 rounded w-full mt-4 ${className} ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-800 text-white font-bold'}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
