"use client";

import { Bell, Menu } from "lucide-react";
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
import Image from "next/image";

interface HeaderProps {
  user?: User;
  onToggleSidebar?: () => void;
}

const TopBar: React.FC<HeaderProps> = ({ user, onToggleSidebar }) => {
  const { academicYear, semester, setAcademicYear, setSemester } =
    useAcademicContext();

  const semesterLabel = semester === "Fall" ? "semester one" : "semester two";
  const username = (user?.email || "john.doe").split("@")[0];

  return (
    <header className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex h-16">
        {/* LEFT: Sidebar-aligned logo column */}
        <div className="hidden lg:flex w-64 items-center justify-center border-r border-gray-100">
          <Image
            src="/images/ur-logo.jpeg"
            alt="UR Logo"
            width={48}
            height={48}
            className="rounded-full"
            priority
          />
        </div>

        {/* RIGHT: Main header area */}
        <div className="flex flex-1 items-center justify-between px-4 sm:px-6 min-w-0">
          {/* Brand + mobile menu */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>

            <div className="lg:hidden">
              <Image
                src="/images/ur-logo.jpeg"
                alt="UR Logo"
                width={36}
                height={36}
                className="rounded-full"
                priority
              />
            </div>

            <h1 className="text-[18px] sm:text-[20px] font-medium tracking-normal text-[#026892] truncate">
              SAMPS UR
            </h1>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            {/* Mobile: Academic Year + Semester (editable) */}
            <div className="md:hidden flex items-center gap-2">
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger className="h-8 w-[116px] border-gray-200 text-xs font-medium whitespace-nowrap">
                  <SelectValue placeholder="2024-2025" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={semesterLabel}
                onValueChange={(value) =>
                  setSemester(value === "semester one" ? "Fall" : "Spring")
                }
              >
                <SelectTrigger className="h-8 w-[78px] border-gray-200 text-xs font-medium">
                  <SelectValue placeholder="Sem 1" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semester one">Sem 1</SelectItem>
                  <SelectItem value="semester two">Sem 2</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-md hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                3
              </span>
            </button>

            {/* Academic Year */}
            <div className="hidden md:block">
              <Select value={academicYear} onValueChange={setAcademicYear}>
                <SelectTrigger className="h-9 w-[120px] lg:w-[130px] border-gray-200 text-sm font-medium">
                  <SelectValue placeholder="2024-2025" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-2025">2024-2025</SelectItem>
                  <SelectItem value="2025-2026">2025-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Semester */}
            <div className="hidden md:block">
              <Select
                value={semesterLabel}
                onValueChange={(value) =>
                  setSemester(value === "semester one" ? "Fall" : "Spring")
                }
              >
                <SelectTrigger className="h-9 w-[130px] lg:w-[150px] border-gray-200 text-sm font-medium capitalize">
                  <SelectValue placeholder="semester one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semester one">semester one</SelectItem>
                  <SelectItem value="semester two">semester two</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* User */}
            <Select value={username} onValueChange={() => {}}>
              <SelectTrigger className="h-9 border-gray-200 text-sm font-medium px-2 sm:px-3 max-w-[180px]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="hidden sm:block truncate">
                    <SelectValue placeholder="john.doe" />
                  </span>
                  <Avatar name={user?.name || "John"} size="sm" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={username}>{username}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
