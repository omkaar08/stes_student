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
  const totalCredits = items.reduce((sum, module) => sum + module.credits, 0);

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm h-auto sm:h-[460px] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-[19px] font-bold text-gray-900">
            Current Enrolled Modules
          </h2>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Your enrolled courses for this semester
          </p>
        </div>
        {/* Removed credits badge as per user request */}
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="overflow-y-auto h-full">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[520px]">
              <thead className="sticky top-0 bg-white">
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-600"
                  >
                    Course Code
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-600"
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-right text-xs font-semibold text-gray-600"
                  >
                    Credits
                  </th>
                </tr>
              </thead>

              <tbody>
                {items.map((module) => (
                  <tr
                    key={module.code}
                    className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-3 py-3 font-semibold text-gray-900 whitespace-nowrap">
                      {module.code}
                    </td>
                    <td className="px-3 py-3 text-gray-800">{module.name}</td>
                    <td className="px-3 py-3 text-right text-gray-900 font-medium">
                      {module.credits}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          Total modules:{" "}
          <span className="font-semibold text-[#026892]">{items.length}</span> •
          Total credits:{" "}
          <span className="font-semibold text-[#026892]">{totalCredits}</span>
        </p>
      </div>
    </div>
  );
};

export default EnrolledModulesTable;
