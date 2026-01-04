'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/format';
import { useAuthStore } from '@/lib/store/auth.store';
import { ROLE_MENUS } from '@/lib/constants/menus';
import { UserRole } from '@/types/auth.types';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

export const AdminSidebar = ({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) => {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const { logout } = useAuth();

    const menus = user ? ROLE_MENUS[user.role as UserRole] || [] : [];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity md:hidden",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 transform bg-white/80 backdrop-blur-xl border-r border-gray-200 transition-transform duration-300 ease-in-out md:translate-x-0 dark:bg-gray-900/80 dark:border-gray-800",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>

                <div className="flex h-16 items-center justify-center border-b border-gray-200 px-6 dark:border-gray-800">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary-600">
                        <div className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center text-white">
                            DS
                        </div>
                        <span>DatSan247</span>
                    </Link>
                </div>

                <div className="flex flex-col justify-between h-[calc(100vh-4rem)] p-4">
                    <nav className="space-y-1">
                        {menus.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200',
                                        isActive
                                            ? 'bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-900/20 dark:text-primary-400'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                                    )}
                                >
                                    <Icon className={cn("h-5 w-5", isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-400")} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
                        <button
                            onClick={() => logout()}
                            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <LogOut className="h-5 w-5" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
