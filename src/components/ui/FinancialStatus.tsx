"use client";

import React, { useState } from "react";
import { EyeOff, Eye, CreditCard } from "lucide-react";

type FinancialStatusProps = {
  semesterFees: string;
  paid: string;
  remaining: string;
  paidProgress: number; // 0..1
  nextPaymentDue: string;
};

const BRAND_BLUE = "#026892";

const FinancialStatus: React.FC<FinancialStatusProps> = ({
  semesterFees,
  paid,
  remaining,
  paidProgress,
  nextPaymentDue,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const clampedProgress = Math.max(0, Math.min(1, paidProgress));

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 h-[280px] flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Financial Status</h2>
        <button
          type="button"
          onClick={toggleVisibility}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label={isVisible ? "Hide amounts" : "Show amounts"}
        >
          {isVisible ? (
            <EyeOff className="w-5 h-5 text-gray-500" />
          ) : (
            <Eye className="w-5 h-5 text-gray-500" />
          )}
        </button>
      </div>

      <div className="space-y-3 flex-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">Semester Fees</span>
          <span className="text-gray-900 font-semibold">
            {isVisible ? semesterFees : "RWF ******"}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">Paid</span>
          <span className="text-[#026892] font-semibold">
            {isVisible ? paid : "RWF ******"}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${clampedProgress * 100}%`,
              backgroundColor: BRAND_BLUE,
            }}
          />
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-700 font-medium">Remaining</span>
          <span className="text-orange-600 font-semibold">
            {isVisible ? remaining : "RWF ******"}
          </span>
        </div>

        <div className="text-xs text-gray-500 pt-2">
          Next payment due:{" "}
          <span className="text-gray-700 font-medium">{nextPaymentDue}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-3 w-full h-10 rounded-lg text-white font-medium flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition text-sm"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        <CreditCard className="w-4 h-4" />
        Make Payment
      </button>
    </div>
  );
};

export default FinancialStatus;