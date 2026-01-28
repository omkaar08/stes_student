import React from "react";
import { StatCardProps } from "@/types";

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, iconColor = 'blue' }) => {
  const getVariantStyles = (variant?: string) => {
    switch (variant) {
      case 'positive':
        return 'text-emerald-600';
      case 'negative':
        return 'text-red-600';
      case 'warning':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  const getIconBgColor = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
      green: { bg: 'bg-emerald-100', text: 'text-emerald-600' },
      red: { bg: 'bg-red-100', text: 'text-red-600' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
    };
    return colorMap[color] || colorMap['blue'];
  };

  const iconStyle = getIconBgColor(iconColor);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 overflow-hidden">
      {/* Header with title and icon aligned on same line */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-sm font-bold text-gray-900 tracking-tight">
          {title}
        </h3>
        <div className={`flex-shrink-0 h-9 w-9 rounded-lg ${iconStyle.bg} ${iconStyle.text} grid place-items-center`}>
          <span className="[&>svg]:h-4 [&>svg]:w-4">{icon}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-2xl font-normal text-gray-900 mb-1">
          {value}
        </p>
        {change?.text && (
          <p className={`text-xs font-semibold ${getVariantStyles(change.variant)}`}>
            {change.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;


