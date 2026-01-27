import React from "react";
import { ArrowDownRight, ArrowUpRight, TriangleAlert } from "lucide-react";
import { StatCardProps } from "@/types";

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  const changeVariant = change?.variant;

  const changeText =
    change?.text ??
    (typeof change?.value === "number"
      ? `${change.value > 0 ? "+" : ""}${change.value}% from last week`
      : undefined);

  const resolvedVariant =
    changeVariant ??
    (typeof change?.isPositive === "boolean"
      ? change.isPositive
        ? "positive"
        : "negative"
      : undefined);

  const changeStyles =
    resolvedVariant === "positive"
      ? "text-emerald-600"
      : resolvedVariant === "negative"
        ? "text-rose-600"
        : resolvedVariant === "warning"
          ? "text-orange-600"
          : "text-gray-500";

  const ChangeIcon =
    resolvedVariant === "warning"
      ? TriangleAlert
      : resolvedVariant === "negative"
        ? ArrowDownRight
        : ArrowUpRight;

  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/0 to-slate-100/0 group-hover:from-primary-50/50 group-hover:to-slate-100/30 transition-all duration-300 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between gap-4">
        <p className="text-base font-semibold text-gray-900 leading-none">
          {title}
        </p>
        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300 text-primary-600 grid place-items-center">
          <span className="[&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        </div>
      </div>

      <p className="relative z-10 mt-3 text-3xl lg:text-4xl font-bold text-gray-900">
        {value}
      </p>

      {changeText ? (
        <div
          className={`relative z-10 mt-2 flex items-center gap-1.5 text-sm font-semibold ${changeStyles}`}
        >
          <ChangeIcon className="h-4 w-4" />
          <span className="truncate">{changeText}</span>
        </div>
      ) : null}
    </div>
  );
};

export default StatCard;
