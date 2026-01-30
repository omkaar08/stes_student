"use client";

import MainLayout from "@/layouts/MainLayout";

export default function LibraryPage() {
  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-slate-50 pt-16 px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Library</h1>
        <p className="mt-2 text-gray-600">
          Search resources, view loans, and manage reservations.
        </p>
      </div>
    </MainLayout>
  );
}
