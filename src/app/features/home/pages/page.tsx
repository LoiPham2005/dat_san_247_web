"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "../../auth/store/userStore";
import MainLayout from "@/app/shared/components/MainLayout";

export default function HomePage() {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold">Xin chào 👋</h1>
      <p>Đây là trang Home với Sidebar + Header + Content.</p>
    </MainLayout>
  );
}
