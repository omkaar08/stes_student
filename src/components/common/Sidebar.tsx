'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarProps } from '@/types';
import { navigationItems } from '@/data/navigationData';

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const pathname = usePathname();

  return (
    <aside className={`
      w-64
      bg-white
      h-[calc(100vh-64px)]
      fixed
      left-0
      top-[64px]
      overflow-y-auto
      scrollbar-thin
      px-4
      py-6
      ${className}
    `}>
      <nav className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-2xl
                text-sm
                font-medium
                transition-all
                duration-200
                ${isActive 
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
                }
              `}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
