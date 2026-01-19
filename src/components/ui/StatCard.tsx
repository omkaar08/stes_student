import React from 'react';
import { StatCardProps } from '@/types';

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-blue-200 transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-gray-600 text-xs mb-2">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="text-blue-600 flex-shrink-0">
          {icon}
        </div>
      </div>
      {change && (
        <div className="flex items-center gap-2">
          <span className={`
            px-2 py-1 rounded text-xs font-semibold
            ${change.isPositive
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
            }
          `}>
            {change.isPositive ? '+' : ''}{change.value}%
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
