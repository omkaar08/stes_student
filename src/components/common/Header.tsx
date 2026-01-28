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

interface HeaderProps {
  user?: User;
  onToggleSidebar?: () => void;
}

const TopBar: React.FC<HeaderProps> = ({ user, onToggleSidebar }) => {
  return (
    <div className="fixed top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#026892' }}
          >
            <span className="text-white font-semibold text-sm">UR</span>
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-gray-900">STES UR</h1>
            <p className="text-xs text-gray-500">Lecturer Dashboard</p>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          {/* Year Selector */}
          <Select defaultValue="2025-2026">
            <SelectTrigger className="w-32 h-9 bg-white border-gray-200 text-sm font-medium">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value="2024-2025">2024-2025</SelectItem>
              <SelectItem value="2025-2026">2025-2026</SelectItem>
              <SelectItem value="2026-2027">2026-2027</SelectItem>
            </SelectContent>
          </Select>

          {/* Semester Selector */}
          <Select defaultValue="spring-2026">
            <SelectTrigger className="w-36 h-9 bg-white border-gray-200 text-sm font-medium">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-200 shadow-md z-50">
              <SelectItem value="fall-2025">Fall 2025</SelectItem>
              <SelectItem value="spring-2026">Spring 2026</SelectItem>
              <SelectItem value="fall-2026">Fall 2026</SelectItem>
            </SelectContent>
          </Select>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name || 'Kunal'}</p>
              <p className="text-xs text-gray-500">{user?.role || 'Lecturer'}</p>
            </div>
            <Avatar name={user?.name || 'Kunal'} size="md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;