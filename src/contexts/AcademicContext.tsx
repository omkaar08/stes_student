"use client";

import React, { createContext, useContext, useMemo, useState } from 'react';

export type Semester = "Fall" | "Spring";

interface AcademicContextValue {
  academicYear: string;
  semester: Semester;
  setAcademicYear: (year: string) => void;
  setSemester: (semester: Semester) => void;
}

const AcademicContext = createContext<AcademicContextValue | null>(null);

export const AcademicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [academicYear, setAcademicYear] = useState<string>("2024-2025");
  const [semester, setSemester] = useState<Semester>("Fall");

  const value = useMemo(
    () => ({ academicYear, semester, setAcademicYear, setSemester }),
    [academicYear, semester]
  );

  return <AcademicContext.Provider value={value}>{children}</AcademicContext.Provider>;
};

export const useAcademicContext = () => {
  const context = useContext(AcademicContext);
  if (!context) {
    throw new Error("useAcademicContext must be used within an AcademicProvider");
  }
  return context;
};
