'use client';

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/layout/admin/Header";
import { AdminSidebar } from "@/components/layout/admin/Sidebar";
import { useAuthStore } from "@/lib/store/auth.store";
import { useSettingsStore } from "@/lib/store/settings.store";
import { useRouter } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { isAuthenticated, user } = useAuthStore();
    const { theme } = useSettingsStore();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Basic protection: if not authenticated or no user, redirect to login
        // This is client-side only; middleware should handle server-side protection
        // But since we are using 'simulated' login, middleware might not know about the 'fake-jwt' unless we set cookies.
        // For this demo, client-side check is sufficient but let's be aware.
        if (!isAuthenticated && isMounted) {
            router.push('/login');
        }
    }, [isAuthenticated, router, isMounted]);

    // Simple Theme effect injection for the body helper if needed, 
    // though settings.store handles document class. 
    // We might want to pass theme to a provider if components need it, 
    // but they can subscribe to the store directly.

    if (!isMounted) return null; // Prevent hydration mismatch

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
