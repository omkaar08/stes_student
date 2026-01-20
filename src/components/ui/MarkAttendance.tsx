"use client";

import React, { useMemo, useState } from "react";
import { MarkAttendanceProps, AttendanceStatus } from "@/types";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Search,
  UserCheck,
  X,
} from "lucide-react";

const MarkAttendance: React.FC<MarkAttendanceProps> = ({ data }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(
    data.classes[0]?.id ?? "",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedClass = useMemo(
    () => data.classes.find((c) => c.id === selectedClassId) ?? data.classes[0],
    [data.classes, selectedClassId],
  );

  const [attendance, setAttendance] = useState<
    Record<string, AttendanceStatus | null>
  >(() => {
    const init: Record<string, AttendanceStatus | null> = {};
    for (const cls of data.classes) {
      for (const student of cls.students) {
        init[`${cls.id}:${student.id}`] = null;
      }
    }
    return init;
  });

  const students = selectedClass?.students ?? [];

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter((s) => {
      const nameMatch = s.name.toLowerCase().includes(q);
      const rollMatch = s.rollNumber.toLowerCase().includes(q);
      return nameMatch || rollMatch;
    });
  }, [students, query]);

  const total = students.length;
  const present = students.filter(
    (s) => attendance[`${selectedClass?.id}:${s.id}`] === "present",
  ).length;
  const absent = students.filter(
    (s) => attendance[`${selectedClass?.id}:${s.id}`] === "absent",
  ).length;
  const marked = present + absent;
  const rate = total === 0 ? 0 : Math.round((present / total) * 100);

  const setStudentStatus = (studentId: string, status: AttendanceStatus) => {
    if (!selectedClass) return;
    setAttendance((prev) => ({
      ...prev,
      [`${selectedClass.id}:${studentId}`]: status,
    }));
  };

  const markAllPresent = () => {
    if (!selectedClass) return;
    setAttendance((prev) => {
      const next = { ...prev };
      for (const student of selectedClass.students) {
        next[`${selectedClass.id}:${student.id}`] = "present";
      }
      return next;
    });
  };

  const reset = () => {
    if (!selectedClass) return;
    setAttendance((prev) => {
      const next = { ...prev };
      for (const student of selectedClass.students) {
        next[`${selectedClass.id}:${student.id}`] = null;
      }
      return next;
    });
    setQuery("");
    setIsOpen(false);
  };

  const submitAttendance = () => {
    if (!selectedClass) return;
    if (marked < total) {
      window.alert(
        "Please mark attendance for all students before submitting.",
      );
      return;
    }

    const payload = students.map((s) => ({
      studentId: s.id,
      status: attendance[`${selectedClass.id}:${s.id}`] as AttendanceStatus,
    }));

    console.log("Submitting attendance:", {
      classId: selectedClass.id,
      classLabel: selectedClass.label,
      attendance: payload,
    });

    window.alert("Attendance submitted successfully.");
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="heading-lg">Mark Attendance</h2>
          <p className="body-text">
            Select class and mark student attendance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={markAllPresent}
            className="hover:opacity-90 text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 transition-all"
            style={{ backgroundColor: '#0A6E8A' }}
          >
            <UserCheck size={18} />
            Mark All Present
          </button>
          <button
            onClick={reset}
            className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Class Selector */}
      <div className="relative mb-6">
        <div className="rounded-xl p-4 border-2" style={{ borderColor: '#0A6E8A' }}>
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="w-full flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 text-white" style={{ backgroundColor: '#0A6E8A' }}>
                <svg
                  className="w-7 h-7"
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
                </svg>
              </div>

              <div className="text-left min-w-0">
                <p className="text-xs font-semibold text-gray-700">
                  Selected Class
                </p>
                <p className="text-lg font-bold text-gray-900 truncate">
                  {selectedClass?.label}
                </p>
                <p className="text-sm text-gray-600 truncate">
                  {selectedClass?.meta}
                </p>
              </div>
            </div>

            <ChevronDown
              size={18}
              style={{ color: '#0A6E8A' }}
              className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {isOpen && (
          <div className="absolute left-0 right-0 mt-3 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-20">
            {data.classes.map((cls, index) => {
              const isSelected = cls.id === selectedClassId;

              return (
                <button
                  key={cls.id}
                  onClick={() => {
                    setSelectedClassId(cls.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-5 py-4 transition-colors hover:bg-gray-50 ${
                    index === 0 ? "" : "border-t border-gray-200"
                  } ${isSelected ? "bg-gray-50" : "bg-white"}`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isSelected
                            ? "text-white"
                            : "bg-white border border-gray-200 text-gray-900"
                        }`}
                        style={isSelected ? { backgroundColor: '#0A6E8A' } : {}}
                      >
                        <svg
                          className={`w-6 h-6 ${isSelected ? "text-white" : "text-gray-900"}`}
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
                        </svg>
                      </div>

                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 truncate">
                          {cls.label}
                        </div>
                        <div className="text-sm text-gray-600 truncate mt-0.5">
                          {cls.meta}
                        </div>
                      </div>
                    </div>

                    {isSelected ? (
                      <Check
                        size={20}
                        style={{ color: '#0A6E8A' }}
                      />
                    ) : (
                      <span className="w-5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#0A6E8A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Total Students
          </div>
          <div className="text-3xl font-extrabold text-gray-900">{total}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <UserCheck size={18} className="text-[#0A6E8A]" />
            Present
          </div>
          <div className="text-3xl font-extrabold text-[#0A6E8A]">
            {present}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <X size={18} className="text-red-600" />
            Absent
          </div>
          <div className="text-3xl font-extrabold text-red-600">{absent}</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5">
          <div className="text-xs text-gray-600 font-semibold mb-2 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-[#0A6E8A]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6m-8 0h8"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 12l5-5 5 5"
              />
            </svg>
            Attendance Rate
          </div>
          <div className="text-3xl font-extrabold text-gray-900">{rate}%</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3 mb-6">
        <Search size={18} className="text-gray-500" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or roll number..."
          className="w-full outline-none text-sm text-gray-900 placeholder:text-gray-500"
        />
      </div>

      {/* Students */}
      <div className="grid grid-cols-2 gap-6">
        {filteredStudents.map((student) => {
          const key = `${selectedClass?.id}:${student.id}`;
          const current = attendance[key];

          const cardBorder =
            current === "present"
              ? "border-[#0A6E8A]"
              : current === "absent"
                ? "border-red-500"
                : "border-gray-200";

          const avatarBg =
            current === "present"
              ? "bg-[#0A6E8A]"
              : current === "absent"
                ? "bg-red-500"
                : "bg-[#0A6E8A]";

          return (
            <div
              key={student.id}
              className={`relative bg-white border-2 ${cardBorder} rounded-2xl p-4 flex items-center justify-between gap-4`}
            >
              {/* Corner status indicator */}
              {current && (
                <div
                    className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center border-4 border-white ${
                    current === "present" ? "bg-[#0A6E8A]" : "bg-red-500"
                  }`}
                >
                  {current === "present" ? (
                    <Check size={16} className="text-white" />
                  ) : (
                    <X size={16} className="text-white" />
                  )}
                </div>
              )}

              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-14 h-14 rounded-2xl ${avatarBg} text-white font-extrabold flex items-center justify-center flex-shrink-0`}
                >
                  {student.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate text-base">
                    {student.name}
                  </div>
                  <div className="text-xs text-gray-700 font-semibold">
                    {student.rollNumber}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStudentStatus(student.id, "present")}
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors ${
                    current === "present"
                      ? "bg-[#0A6E8A] border-[#0A6E8A] text-white"
                      : "bg-white border-gray-200 text-[#0A6E8A] hover:bg-gray-50"
                  }`}
                  aria-label="Mark present"
                >
                  <Check size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setStudentStatus(student.id, "absent")}
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-colors ${
                    current === "absent"
                      ? "bg-red-500 border-red-500 text-white"
                      : "bg-white border-gray-200 text-red-600 hover:bg-gray-50"
                  }`}
                  aria-label="Mark absent"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={submitAttendance}
        disabled={total === 0 || marked < total}
        className={`mt-6 w-full rounded-2xl py-4 px-6 font-bold text-white flex items-center justify-center gap-3 transition-colors ${
          marked === total && total > 0
            ? "bg-[#0A6E8A] hover:bg-[#085a70]"
            : "bg-[#0A6E8A]/40 cursor-not-allowed"
        }`}
      >
        <BadgeCheck size={18} />
        Submit Attendance ({marked}/{total} marked)
      </button>
    </div>
  );
};

export default MarkAttendance;
