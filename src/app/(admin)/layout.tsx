'use client';

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/layout/admin/Header";
import { AdminSidebar } from "@/components/layout/admin/Sidebar";
import { useAuthStore } from "@/lib/store/auth.store";
import { useSettingsStore } from "@/lib/store/settings.store";
import { useSidebarStore } from "@/lib/store/sidebar.store";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils/format";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, user } = useAuthStore();
    const { theme } = useSettingsStore();
    const { isCollapsed } = useSidebarStore();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (!isAuthenticated && isMounted) {
            router.push('/login');
        }
    }, [isAuthenticated, router, isMounted]);

    if (!isMounted) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <AdminSidebar />

            <div className={cn(
                "flex min-h-screen flex-col transition-all duration-300",
                isCollapsed ? "md:pl-20" : "md:pl-64"
            )}>
                <AdminHeader />

                <main className="flex-1 p-6 animate-in fade-in duration-500">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
