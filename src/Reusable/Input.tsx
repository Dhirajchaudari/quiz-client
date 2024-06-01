import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ id, type, name, placeholder, className, ...rest }) => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...rest}
    />
  );
};

export default Input;
