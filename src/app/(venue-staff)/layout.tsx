'use client';

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/layout/admin/Header";
import { AdminSidebar } from "@/components/layout/admin/Sidebar";
import { useAuthStore } from "@/lib/store/auth.store";
import { useRouter } from "next/navigation";

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isAuthenticated } = useAuthStore();
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
            <AdminSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-h-screen flex-col md:pl-64 transition-all duration-300">
                <AdminHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 p-6 animate-in fade-in duration-500">
                    <div className="mx-auto max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
