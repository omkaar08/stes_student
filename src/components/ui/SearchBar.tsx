'use client';

import React, { useState } from 'react';
import { SearchBarProps } from '@/types';

const SearchBar: React.FC<SearchBarProps> = ({ 
  placeholder = 'Search...', 
  onSearch 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className="relative w-full max-w-2xl"
    >
      <div className={`
        flex
        items-center
        bg-white
        border
        rounded-lg
        px-4
        py-2.5
        transition-all
        duration-200
        ${isFocused ? 'border-primary-500 shadow-md ring-2 ring-primary-100' : 'border-gray-200'}
      `}>
        <svg
          className="w-5 h-5 text-gray-400 mr-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            flex-1
            outline-none
            bg-transparent
            text-gray-700
            placeholder-gray-400
            text-sm
          "
        />
        <kbd className="
          hidden
          sm:inline-flex
          items-center
          gap-1
          px-2
          py-1
          text-xs
          font-semibold
          text-gray-500
          bg-gray-100
          border
          border-gray-200
          rounded
        ">
          ⌘K
        </kbd>
      </div>
    </form>
  );
};

export default SearchBar;
