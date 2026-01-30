import React from "react";
import { StatCardProps } from "@/types";

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  iconColor = "blue",
}) => {
  const getVariantStyles = (variant?: string) => {
    switch (variant) {
      case "positive":
        return "text-emerald-600";
      case "negative":
        return "text-red-600";
      case "warning":
        return "text-orange-600";
      default:
        return "text-gray-500";
    }
  };

  const getIconBgColor = (color: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      blue: { bg: "bg-blue-100", text: "text-blue-600" },
      green: { bg: "bg-emerald-100", text: "text-emerald-600" },
      red: { bg: "bg-red-100", text: "text-red-600" },
      orange: { bg: "bg-orange-100", text: "text-orange-600" },
      purple: { bg: "bg-purple-100", text: "text-purple-600" },
    };
    return colorMap[color] || colorMap["blue"];
  };

  const iconStyle = getIconBgColor(iconColor);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-gray-800 tracking-tight truncate">
            {title}
          </h3>
        </div>

        <div
          className={`flex-shrink-0 h-11 w-11 rounded-xl ${iconStyle.bg} ${iconStyle.text} grid place-items-center`}
        >
          <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-3xl font-bold text-gray-900 leading-none">{value}</p>

        {change?.text && (
          <div
            className={`mt-3 flex items-center gap-2 text-sm font-medium ${getVariantStyles(change.variant)}`}
          >
            {change.icon ? (
              <span className="[&>svg]:h-4 [&>svg]:w-4">{change.icon}</span>
            ) : null}
            <span>{change.text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
