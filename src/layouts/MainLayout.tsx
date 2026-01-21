import React from 'react';
import Header from '@/components/common/Header';
import Sidebar from '@/components/common/Sidebar';
import Footer from '@/components/common/Footer';
import { currentUser } from '@/data/dummyData';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header user={currentUser} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-[calc(100vh-64px)] flex flex-col overflow-x-hidden">
          <div className="flex-1 overflow-y-auto">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
