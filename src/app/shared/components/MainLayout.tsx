"use client";

import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed");
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className={`flex min-h-screen ${isSidebarCollapsed ? "pl-20" : "pl-64"}`}>
      {/* Sidebar */}
      <Sidebar />  {/* ❌ Không truyền isCollapsed nữa */}

      {/* Nội dung */}
      <div className="flex-1 flex flex-col">
        <Header onToggleSidebar={handleToggleSidebar} />
        <main className="flex-1 p-4 bg-gray-50 dark:bg-gray-900">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
