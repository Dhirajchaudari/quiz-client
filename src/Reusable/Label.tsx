// Label.tsx
import React, { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor: string;
}

const Label: React.FC<LabelProps> = ({ htmlFor, children, className, ...rest }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-medium text-gray-900 mb-1 ${className}`}
      {...rest}
    >
      {children}
    </label>
  );
};

export default Label;
