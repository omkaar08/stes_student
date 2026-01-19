import React from 'react';
import { IconButtonProps } from '@/types';

const IconButton: React.FC<IconButtonProps> = ({ 
  icon, 
  onClick, 
  badge,
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative
        p-2
        rounded-lg
        text-gray-600
        hover:bg-gray-100
        hover:text-gray-900
        transition-all
        duration-200
        ease-in-out
        active:scale-95
        ${className}
      `}
    >
      {icon}
      {badge !== undefined && badge > 0 && (
        <span className="
          absolute
          -top-1
          -right-1
          bg-red-500
          text-white
          text-xs
          font-bold
          rounded-full
          w-5
          h-5
          flex
          items-center
          justify-center
          animate-pulse
        ">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </button>
  );
};

export default IconButton;
