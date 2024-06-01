// TogglePasswordVisibilityButton.tsx
import React from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

interface TogglePasswordVisibilityButtonProps {
  onClick: () => void;
  confirmPasswordShown: boolean;
}

const TogglePasswordVisibilityButton: React.FC<TogglePasswordVisibilityButtonProps> = ({ onClick, confirmPasswordShown }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 top-1/2 transform -translate-y-1/2"
    >
      {confirmPasswordShown ? (
        <EyeIcon className="h-5 w-5 text-gray-500" />
      ) : (
        <EyeSlashIcon className="h-5 w-5 text-gray-500" />
      )}
    </button>
  );
};

export default TogglePasswordVisibilityButton;
