"use client";

import React from "react";

export type EnrolledModule = {
  code: string;
  name: string;
  credits: number;
};

type EnrolledModulesTableProps = {
  items: EnrolledModule[];
};

const EnrolledModulesTable: React.FC<EnrolledModulesTableProps> = ({
  items,
}) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5">
      <h2 className="text-xl font-bold text-gray-900">
        Current Enrolled Modules
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        Modules for the current semester
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 pr-3 font-semibold">Module Code</th>
              <th className="py-2 pr-3 font-semibold">Module Name</th>
              <th className="py-2 text-right font-semibold">Credits</th>
            </tr>
          </thead>
          <tbody>
            {items.map((m) => (
              <tr key={m.code} className="border-t border-gray-100">
                <td className="py-2 pr-3 font-semibold text-gray-900 whitespace-nowrap">
                  {m.code}
                </td>
                <td className="py-2 pr-3 text-gray-700 min-w-[220px]">
                  {m.name}
                </td>
                <td className="py-2 text-right font-semibold text-gray-900">
                  {m.credits}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledModulesTable;
