'use client';

import React from 'react';
import { HeaderProps } from '@/types';
import SearchBar from '@/components/ui/SearchBar';
import IconButton from '@/components/ui/IconButton';
import Avatar from '@/components/ui/Avatar';

const Header: React.FC<HeaderProps> = ({ user }) => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // Search logic will be implemented later
  };

  const handleNotificationClick = () => {
    console.log('Notifications clicked');
    // Notification panel logic will be implemented later
  };

  const handleHelpClick = () => {
    console.log('Help clicked');
    // Help panel logic will be implemented later
  };

  return (
    <header className="
      bg-white
      border-b
      border-gray-200
      sticky
      top-0
      z-50
      shadow-sm
    ">
      <div className="
        flex
        items-center
        justify-between
        px-6
        py-3
        gap-6
      ">
        {/* Left Section - Logo */}
        <div className="flex items-center gap-3 min-w-fit">
          <div className="
            w-10
            h-10
            bg-primary-600
            rounded-lg
            flex
            items-center
            justify-center
            transition-transform
            hover:scale-105
          ">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold text-gray-900">Lecturer</h1>
            <p className="text-xs text-gray-500">Dashboard</p>
          </div>
        </div>

        {/* Center Section - Search Bar */}
        <div className="flex-1 max-w-2xl">
          <SearchBar 
            placeholder="Search resources, students, courses..."
            onSearch={handleSearch}
          />
        </div>

        {/* Right Section - Icons & User */}
        <div className="flex items-center gap-2">
          {/* Notification Icon */}
          <IconButton
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            }
            onClick={handleNotificationClick}
            badge={3}
          />

          {/* Help Icon */}
          <IconButton
            icon={
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
            onClick={handleHelpClick}
          />

          {/* User Profile Section */}
          <div className="
            flex
            items-center
            gap-3
            ml-2
            pl-3
            border-l
            border-gray-200
          ">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">
                {user?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role || 'Role'}
              </p>
            </div>
            <Avatar 
              name={user?.name || 'User'}
              src={user?.avatar}
              size="md"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
