"use client";

import React from "react";
import Link from "next/link";
import { CheckSquare, Calendar, Users, Bell } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: "attendance",
      label: "Mark Attendance",
      description: "Record class attendance",
      icon: <CheckSquare size={20} />,
      href: "/students/mark-attendance",
    },
    {
      id: "timetable",
      label: "View Timetable",
      description: "Check your class schedule",
      icon: <Calendar size={20} />,
      href: "/teaching/timetable",
    },
    {
      id: "classes",
      label: "Class Lists",
      description: "Manage student rosters",
      icon: <Users size={20} />,
      href: "/students/class-lists",
    },
    {
      id: "notify",
      label: "Notify Students",
      description: "Send notifications",
      icon: <Bell size={20} />,
      href: "/teaching/notify",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm h-[320px] flex flex-col">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
      </div>

      <div className="space-y-2 flex flex-col">
        {actions.map((action, index) => {
          const isBlueAction = index < 2;
          const bgColor = isBlueAction ? 'bg-blue-50' : 'bg-orange-50';
          const iconColor = isBlueAction ? 'text-blue-600' : 'text-orange-600';

          return (
            <Link key={action.id} href={action.href} className="block">
              <div
                role="button"
                tabIndex={0}
                className={`flex items-center gap-3 px-4 py-4 rounded-lg ${bgColor} border border-gray-200 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#026892]/20`}
              >
                <div className={`flex-shrink-0 ${iconColor}`}>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">{action.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm text-gray-900">
                    {action.label}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;


