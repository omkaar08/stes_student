"use client";

import MainLayout from "@/layouts/MainLayout";

export default function AccommodationPage() {
  return (
    <MainLayout>
      <div className="w-full min-h-screen bg-slate-50 pt-16 px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900">Accommodation</h1>
        <p className="mt-2 text-gray-600">
          View accommodation status and manage your housing requests.
        </p>
      </div>
    </MainLayout>
  );
}
