"use client";

import React from "react";
import { EyeOff, CreditCard } from "lucide-react";

type FinancialStatusProps = {
  semesterFeesMasked: string;
  paidMasked: string;
  remainingMasked: string;
  paidProgress: number; // 0..1
  nextPaymentDue: string;
};

const BRAND_BLUE = "#026892";
const BRAND_ORANGE = "#f97316";

const FinancialStatus: React.FC<FinancialStatusProps> = ({
  semesterFeesMasked,
  paidMasked,
  remainingMasked,
  paidProgress,
  nextPaymentDue,
}) => {
  const clampedProgress = Math.max(0, Math.min(1, paidProgress));
  const remainingProgress = Math.max(0, Math.min(1, 1 - clampedProgress));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 h-[320px] flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">Financial Status</h2>
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Hide amounts"
        >
          <EyeOff className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-800 font-semibold">Semester Fees</span>
          <span className="text-gray-900 font-semibold">
            {semesterFeesMasked}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-800 font-semibold">Paid</span>
          <span className="text-[#026892] font-semibold">{paidMasked}</span>
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

        <div className="flex items-center justify-between text-sm pt-1">
          <span className="text-gray-800 font-semibold">Remaining</span>
          <span className="text-orange-600 font-semibold">
            {remainingMasked}
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${remainingProgress * 100}%`,
              backgroundColor: BRAND_ORANGE,
            }}
          />
        </div>

        <div className="text-sm text-gray-500 pt-1">
          Next payment due:{" "}
          <span className="text-gray-700 font-semibold">{nextPaymentDue}</span>
        </div>
      </div>

      <button
        type="button"
        className="mt-4 w-full h-11 rounded-lg text-white font-semibold flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition"
        style={{ backgroundColor: BRAND_BLUE }}
      >
        <CreditCard className="w-5 h-5" />
        Make Payment
      </button>
    </div>
  );
};

export default FinancialStatus;
