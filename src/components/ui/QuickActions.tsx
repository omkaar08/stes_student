"use client";

import React from "react";
import Link from "next/link";
import { Calendar, BookOpen, CheckCircle2, FileText } from "lucide-react";

interface QuickAction {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  variant: "blue" | "green" | "orange";
}

const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      id: "timetable",
      label: "View Timetable",
      description: "",
      icon: <Calendar size={20} />,
      href: "/academic",
      variant: "blue",
    },
    {
      id: "grades",
      label: "View Grades",
      description: "",
      icon: <BookOpen size={20} />,
      href: "/academic",
      variant: "blue",
    },
    {
      id: "check-attendance",
      label: "Check Attendance",
      description: "",
      icon: <CheckCircle2 size={20} />,
      href: "/academic",
      variant: "green",
    },
    {
      id: "request-document",
      label: "Request Document",
      description: "",
      icon: <FileText size={20} />,
      href: "/documents",
      variant: "orange",
    },
  ];

  const getItemStyles = (variant: QuickAction["variant"]) => {
    switch (variant) {
      case "green":
        return {
          bg: "bg-[#E6F4FF]",
          icon: "text-emerald-600",
          text: "text-emerald-700",
        };
      case "orange":
        return {
          bg: "bg-orange-50",
          icon: "text-orange-600",
          text: "text-orange-700",
        };
      default:
        return {
          bg: "bg-[#E6F4FF]",
          icon: "text-blue-600",
          text: "text-blue-700",
        };
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm h-[320px] flex flex-col">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>

      <div className="space-y-2 flex flex-col">
        {actions.map((action) => {
          const styles = getItemStyles(action.variant);

          return (
            <Link key={action.id} href={action.href} className="block">
              <div
                className={`flex items-center gap-3 px-5 py-4 rounded-xl ${styles.bg} hover:shadow-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#026892]/20`}
              >
                <div className={`flex-shrink-0 ${styles.icon}`}>
                  <span className="[&>svg]:h-5 [&>svg]:w-5">{action.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-semibold text-sm ${styles.text}`}>
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
