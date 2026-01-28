import { useState } from "react";
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Wallet,
  BookOpen,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";

const BRAND_BLUE = "#026892";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  active?: boolean;
  children?: { id: string; label: string }[];
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, active: true },
  {
    id: "academics",
    label: "Academics",
    icon: GraduationCap,
    children: [
      { id: "courses", label: "Courses" },
      { id: "attendance", label: "Attendance" },
      { id: "timetable", label: "Timetable" },
      { id: "performance", label: "Performance" },
    ],
  },
  {
    id: "exams",
    label: "Exams",
    icon: FileText,
    children: [
      { id: "schedule", label: "Schedule" },
      { id: "results", label: "Results" },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: Wallet,
    children: [
      { id: "fees", label: "Fee Structure" },
      { id: "payments", label: "Payments" },
    ],
  },
  { id: "library", label: "Library", icon: BookOpen },
  { id: "support", label: "Support", icon: HelpCircle },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["academics"]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* ===== Navigation ===== */}
        <nav className="p-3 space-y-1 mt-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isExpanded = expandedItems.includes(item.id);
            const hasChildren = item.children?.length;

            return (
              <div key={item.id}>
                <button
                  onClick={() => hasChildren && toggleExpanded(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    item.active
                      ? "text-white"
                      : "text-gray-600 hover:bg-blue-50"
                  )}
                  style={
                    item.active
                      ? { backgroundColor: BRAND_BLUE }
                      : { color: undefined }
                  }
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {hasChildren &&
                    (isExpanded ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    ))}
                </button>

                {/* Sub-items */}
                {hasChildren && isExpanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children!.map((child) => (
                      <button
                        key={child.id}
                        className="w-full text-left px-3 py-2 text-sm text-gray-600 rounded-md hover:bg-blue-50 hover:text-[#026892] transition-colors"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-30 p-2 bg-white rounded-lg shadow border border-gray-200 lg:hidden"
      >
        <Menu className="w-5 h-5 text-gray-900" />
      </button>
    </>
  );
};

export default Sidebar;
