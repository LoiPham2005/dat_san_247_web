"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/features/auth/store/userStore";

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  const { logout } = useUserStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="header">
      <button onClick={onToggleSidebar} className="toggle-btn">
        ☰
      </button>
      <h1 className="header-title">Trang Quản Lý</h1>
      <button className="logout-btn" onClick={handleLogout}>
        Đăng xuất
      </button>
    </header>
  );
};

export default Header;
