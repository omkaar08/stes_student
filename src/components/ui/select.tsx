'use client';

import React, { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectContextType {
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SelectContext = React.createContext<SelectContextType | undefined>(undefined);

const useSelect = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error('useSelect must be used within a Select component');
  }
  return context;
};

interface SelectProps {
  children: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

const Select = ({ children, value: controlledValue, onValueChange, defaultValue }: SelectProps) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || '');
  const [isOpen, setIsOpen] = React.useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const handleChange = (newValue: string) => {
    setInternalValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, onChange: handleChange, isOpen, setIsOpen }}>
      <div className="relative inline-block">{children}</div>
    </SelectContext.Provider>
  );
};

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
}

const SelectTrigger = ({ children, className = '' }: SelectTriggerProps) => {
  const { isOpen, setIsOpen, value } = useSelect();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors ${className}`}
    >
      {children}
      <ChevronDown className="w-4 h-4 ml-1" />
    </button>
  );
};

interface SelectValueProps {
  placeholder?: string;
}

const SelectValue = ({ placeholder = '' }: SelectValueProps) => {
  const { value } = useSelect();
  return <span>{value || placeholder}</span>;
};

interface SelectContentProps {
  children: ReactNode;
  className?: string;
}

const SelectContent = ({ children, className = '' }: SelectContentProps) => {
  const { isOpen } = useSelect();

  if (!isOpen) return null;

  return (
    <div className={`absolute top-full left-0 mt-1 min-w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${className}`}>
      {children}
    </div>
  );
};

interface SelectItemProps {
  value: string;
  children: ReactNode;
}

const SelectItem = ({ value, children }: SelectItemProps) => {
  const { onChange, value: selectedValue } = useSelect();

  return (
    <button
      onClick={() => onChange(value)}
      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
        selectedValue === value
          ? 'bg-blue-100 text-blue-900 font-semibold'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  );
};

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
