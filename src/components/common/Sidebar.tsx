'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProps, NavItem } from '@/types';
import { navigationItems } from '@/data/navigationData';

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Accordion: only one main module expanded at a time
  const toggleExpand = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? [] : [itemId]));
  };

  // Helpers for active state
  const hasActiveChild = (item: NavItem): boolean =>
    !!item.children?.some((child) => child.href === pathname);

  const isMainActive = (item: NavItem): boolean =>
    !item.children ? item.href === pathname : pathname === item.href || hasActiveChild(item);

  const isSubActive = (item: NavItem): boolean => item.href === pathname;

  // Auto-expand parent when a child route is active
  useEffect(() => {
    navigationItems.forEach((item) => {
      if (item.children && hasActiveChild(item)) {
        setExpandedItems([item.id]);
      }
    });
  }, [pathname]);

  const renderNavItem = (item: NavItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const mainActive = isMainActive(item) && level === 0;
    const subActive = isSubActive(item) && level > 0;

    return (
      <div key={item.id} className="mb-1">
        {hasChildren ? (
          <div>
            <button
              onClick={() => toggleExpand(item.id)}
              className={`
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-lg
                text-sm
                font-semibold
                transition-all
                duration-200
                ${mainActive ? 'bg-[#0A6E8A] text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'}
              `}
            >
              <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
              <span className="flex-1 text-left">{item.label}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-90' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {isExpanded && (
              <div className="mt-1 ml-3 pl-3 border-l border-gray-200 space-y-1">
                {item.children?.map((child) => renderNavItem(child, level + 1))}
              </div>
            )}
          </div>
        ) : (
          <Link
            href={item.href || '#'}
            className={`
              flex
              items-center
              gap-3
              px-4
              rounded-lg
              font-medium
              transition-all
              duration-200
              ${
                level > 0
                  ? `py-2.5 text-xs ${subActive ? 'bg-teal-50 text-[#0A6E8A] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`
                  : `py-3 text-sm ${mainActive ? 'bg-[#0A6E8A] text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'}`
              }
            `}
          >
            <div className={level > 0 ? 'w-4 h-4 flex items-center justify-center' : 'w-5 h-5 flex items-center justify-center'}>
              {item.icon}
            </div>
            <span>{item.label}</span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <aside className={`
      w-64
      bg-white
      h-[calc(100vh-64px)]
      fixed
      left-0
      top-[64px]
      overflow-y-auto
      [&::-webkit-scrollbar]:hidden
      [-ms-overflow-style:none]
      [scrollbar-width:none]
      px-4
      py-6
      border-r
      border-gray-100
      ${className}
    `}>
      <nav className="space-y-2">
        {navigationItems.map((item) => renderNavItem(item))}
      </nav>
    </aside>
  );
};

export default Sidebar;
