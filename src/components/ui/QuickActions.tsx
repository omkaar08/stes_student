"use client";

import React from "react";
import Link from "next/link";
import { CheckSquare, Calendar, Users, Bell } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: "attendance",
      label: "Mark Attendance",
      icon: <CheckSquare size={20} />,
      href: "/students/mark-attendance",
    },
    {
      id: "timetable",
      label: "Today's Timetable",
      icon: <Calendar size={20} />,
      href: "/teaching/timetable",
    },
    {
      id: "classes",
      label: "Class Lists",
      icon: <Users size={20} />,
      href: "/students/class-lists",
    },
    {
      id: "notify",
      label: "Notify Students",
      icon: <Bell size={20} />,
      href: "/teaching/notify",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm h-full flex flex-col">
      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
      </div>

      <div className="space-y-3 flex-1 flex flex-col">
        {actions.map((action) => {
          const variant = (() => {
            switch (action.id) {
              case "attendance":
                return {
                  bg: "bg-emerald-50",
                  hoverBg: "hover:bg-emerald-100/70",
                  text: "text-emerald-800",
                  icon: "text-emerald-700",
                  ring: "focus-visible:ring-emerald-200",
                };
              case "timetable":
                return {
                  bg: "bg-blue-50",
                  hoverBg: "hover:bg-blue-100/70",
                  text: "text-blue-800",
                  icon: "text-blue-700",
                  ring: "focus-visible:ring-blue-200",
                };
              case "classes":
                return {
                  bg: "bg-violet-50",
                  hoverBg: "hover:bg-violet-100/70",
                  text: "text-violet-800",
                  icon: "text-violet-700",
                  ring: "focus-visible:ring-violet-200",
                };
              case "notify":
                return {
                  bg: "bg-orange-50",
                  hoverBg: "hover:bg-orange-100/70",
                  text: "text-orange-800",
                  icon: "text-orange-700",
                  ring: "focus-visible:ring-orange-200",
                };
              default:
                return {
                  bg: "bg-slate-50",
                  hoverBg: "hover:bg-slate-100/70",
                  text: "text-slate-800",
                  icon: "text-slate-700",
                  ring: "focus-visible:ring-slate-200",
                };
            }
          })();

          return (
            <Link key={action.id} href={action.href} className="block">
              <div
                role="button"
                tabIndex={0}
                className={`
                  flex items-center gap-4
                  px-5 py-4
                  rounded-xl
                  border border-transparent
                  transition-colors duration-200
                  ${variant.bg} ${variant.hoverBg}
                  focus-visible:outline-none focus-visible:ring-4 ${variant.ring}
                `}
              >
                <div className={`flex-shrink-0 ${variant.icon}`}>
                  {action.icon}
                </div>
                <div className={`font-semibold text-base ${variant.text}`}>
                  {action.label}
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
