"use client";

import React, { useState } from "react";
import Header from "@/components/common/Header";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { currentUser } from "@/data/studentUser";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Topbar: fixed, full width, always at the top */}
      <Header user={currentUser} onToggleSidebar={toggleSidebar} />
      {/* Sidebar below header, not beside */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="lg:w-64 w-full flex-shrink-0">
          <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
        </div>
        <main className="flex-1 min-h-screen flex flex-col overflow-y-auto scrollbar-hide scroll-smooth px-4 sm:px-6 pb-6 pt-20">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
