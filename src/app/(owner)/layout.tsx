import { useState, useEffect } from 'react';
import { AdminSidebar } from '@/components/layout/admin/Sidebar';
import { AdminHeader } from '@/components/layout/admin/Header';
import { useAuthStore } from '@/lib/store/auth.store';
import { useSidebarStore } from '@/lib/store/sidebar.store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/format';

export default function OwnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuthStore();
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <AdminSidebar />

            <div className={cn(
                "flex min-h-screen flex-col transition-all duration-300",
                isCollapsed ? "md:pl-20" : "md:pl-64"
            )}>
                <AdminHeader />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
