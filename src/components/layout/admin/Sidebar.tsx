'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/format';
import { useAuthStore } from '@/lib/store/auth.store';
import { useSidebarStore } from '@/lib/store/sidebar.store';
import { ROLE_MENUS } from '@/lib/constants/menus';
import { UserRole } from '@/types/auth.types';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

export const AdminSidebar = () => {
    const pathname = usePathname();
    const { user } = useAuthStore();
    const { logout } = useAuth();
    const { isCollapsed, isMobileOpen, toggleCollapse, setMobileOpen } = useSidebarStore();

    const menus = user && user.role in ROLE_MENUS ? ROLE_MENUS[user.role as keyof typeof ROLE_MENUS] : [];

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity md:hidden",
                    isMobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={() => setMobileOpen(false)}
            />

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 transform bg-white/95 backdrop-blur-xl border-r border-gray-200 transition-all duration-300 ease-in-out dark:bg-gray-900/95 dark:border-gray-800",
                // Desktop: show based on collapsed state
                "md:translate-x-0",
                isCollapsed ? "md:w-20" : "md:w-64",
                // Mobile: show/hide based on isMobileOpen
                isMobileOpen ? "translate-x-0 w-64" : "-translate-x-full"
            )}>

                {/* Logo Header */}
                <div className={cn(
                    "flex h-16 items-center border-b border-gray-200 dark:border-gray-800 transition-all",
                    isCollapsed ? "justify-center px-2" : "justify-between px-4"
                )}>
                    <Link href="/" className={cn(
                        "flex items-center gap-2 font-bold text-xl text-primary-600",
                        isCollapsed && "justify-center"
                    )}>
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-primary-500/30">
                            DS
                        </div>
                        {!isCollapsed && <span className="hidden md:inline">DatSan247</span>}
                    </Link>

                    {/* Collapse Toggle Button - Desktop only */}
                    <button
                        onClick={toggleCollapse}
                        className={cn(
                            "hidden md:flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700",
                            isCollapsed && "absolute -right-3 top-6 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700"
                        )}
                        title={isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </button>
                </div>

                <div className="flex flex-col h-[calc(100vh-4rem)]">
                    <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
                        {menus.map((item: any) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={cn(
                                        'group relative flex items-center rounded-xl text-sm font-medium transition-all duration-200',
                                        isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3',
                                        isActive
                                            ? 'bg-primary-50 text-primary-600 shadow-sm dark:bg-primary-900/20 dark:text-primary-400'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50'
                                    )}
                                    title={isCollapsed ? item.label : undefined}
                                >
                                    <Icon className={cn(
                                        "h-5 w-5 flex-shrink-0",
                                        isActive ? "text-primary-600 dark:text-primary-400" : "text-gray-400"
                                    )} />

                                    {/* Label - hidden when collapsed on desktop */}
                                    <span className={cn(
                                        "transition-opacity duration-200",
                                        isCollapsed ? "md:hidden" : ""
                                    )}>
                                        {item.label}
                                    </span>

                                    {/* Tooltip for collapsed state */}
                                    {isCollapsed && (
                                        <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 dark:bg-gray-100 dark:text-gray-900 hidden md:block">
                                            {item.label}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                        <button
                            onClick={() => logout()}
                            className={cn(
                                'group relative flex w-full items-center rounded-xl text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20',
                                isCollapsed ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                            )}
                            title={isCollapsed ? "Đăng xuất" : undefined}
                        >
                            <LogOut className="h-5 w-5 flex-shrink-0" />
                            <span className={cn(isCollapsed ? "md:hidden" : "")}>
                                Đăng xuất
                            </span>

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 dark:bg-gray-100 dark:text-gray-900 hidden md:block">
                                    Đăng xuất
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};
