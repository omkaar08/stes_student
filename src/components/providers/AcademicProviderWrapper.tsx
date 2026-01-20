"use client";

import React from 'react';
import { AcademicProvider } from '@/contexts/AcademicContext';

const AcademicProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AcademicProvider>{children}</AcademicProvider>;
};

export default AcademicProviderWrapper;
