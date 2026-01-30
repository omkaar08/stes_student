"use client";

import { Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Avatar from "@/components/ui/Avatar";
import { User } from "@/types";
import { useAcademicContext } from "@/contexts/AcademicContext";

interface HeaderProps {
  user?: User;
  onToggleSidebar?: () => void;
}

const TopBar: React.FC<HeaderProps> = ({ user }) => {
  const { academicYear, semester, setAcademicYear, setSemester } =
    useAcademicContext();

  const semesterLabel = semester === "Fall" ? "semester one" : "semester two";
  const username = (user?.email || "john.doe").split("@")[0];

  return (
    <div className="fixed top-0 z-50 w-full lg:w-[calc(100%-16rem)] lg:ml-64 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-[#026892] tracking-tight">
            SAMPS UR
          </h1>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <button
            className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* Year Selector */}
          <Select value={academicYear} onValueChange={setAcademicYear}>
            <SelectTrigger className="w-32 h-9 bg-white border-gray-200 text-sm font-medium">
              <SelectValue placeholder="2024-2025" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2025-2026">2025-2026</SelectItem>
            </SelectContent>
          </Select>

          {/* Semester Selector */}
          <Select
            value={semesterLabel}
            onValueChange={(value) =>
              setSemester(value === "semester one" ? "Fall" : "Spring")
            }
          >
            <SelectTrigger className="w-36 h-9 bg-white border-gray-200 text-sm font-medium capitalize">
              <SelectValue placeholder="semester one" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value="semester one">semester one</SelectItem>
              <SelectItem value="semester two">semester two</SelectItem>
            </SelectContent>
          </Select>

          {/* User Selector */}
          <Select value={username} onValueChange={() => {}}>
            <SelectTrigger className="w-32 h-9 bg-white border-gray-200 text-sm font-medium">
              <SelectValue placeholder="john.doe" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value={username}>{username}</SelectItem>
            </SelectContent>
          </Select>

          <Avatar name={user?.name || "John"} size="md" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
