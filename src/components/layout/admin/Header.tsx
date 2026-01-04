'use client';

import { useSettingsStore } from '@/lib/store/settings.store';
import { useAuthStore } from '@/lib/store/auth.store';
import {
    Bell,
    Search,
    Moon,
    Sun,
    Leaf,
    Globe,
    ChevronDown,
    Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils/format';

export const AdminHeader = ({ onMenuClick }: { onMenuClick?: () => void }) => {
    const { theme, setTheme, language, setLanguage } = useSettingsStore();
    const { user } = useAuthStore();

    // Simple Dropdown State
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [isThemeOpen, setIsThemeOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // Close on click outside (simplified)
    // In a real app I'd use a hook like useOnClickOutside

    return (
        <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 bg-white/80 px-6 backdrop-blur-xl dark:border-gray-800 dark:bg-gray-900/80">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="mr-2 md:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-md"
                >
                    <Menu className="h-5 w-5" />
                </button>

                <div className="relative hidden sm:block">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="h-10 w-64 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                {/* Language Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setIsLangOpen(!isLangOpen)}
                        className="flex items-center gap-2 rounded-lg p-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    >
                        <Globe className="h-5 w-5" />
                        <span className="hidden sm:inline-block uppercase">{language}</span>
                    </button>
                    {isLangOpen && (
                        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-lg border border-gray-200 bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-gray-700 dark:bg-gray-800">
                            <button onClick={() => { setLanguage('en'); setIsLangOpen(false); }} className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">English</button>
                            <button onClick={() => { setLanguage('vi'); setIsLangOpen(false); }} className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">Tiếng Việt</button>
                            <button onClick={() => { setLanguage('ja'); setIsLangOpen(false); }} className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">日本語</button>
                        </div>
                    )}
                </div>

                {/* Theme Switcher */}
                <div className="flex items-center bg-gray-100 rounded-full p-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <button
                        onClick={() => setTheme('light')}
                        className={cn("rounded-full p-1.5 transition-all text-gray-500", theme === 'light' && "bg-white text-yellow-500 shadow-sm dark:bg-gray-700")}
                    >
                        <Sun className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={cn("rounded-full p-1.5 transition-all text-gray-500", theme === 'dark' && "bg-gray-700 text-blue-400 shadow-sm")}
                    >
                        <Moon className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => setTheme('green')}
                        className={cn("rounded-full p-1.5 transition-all text-gray-500", theme === 'green' && "bg-primary-100 text-primary-600 shadow-sm")}
                    >
                        <Leaf className="h-4 w-4" />
                    </button>
                </div>

                {/* Notifications (Mock) */}
                <button className="relative rounded-full p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900" />
                </button>

                {/* User Profile */}
                <div className="flex items-center gap-3 border-l border-gray-200 pl-4 dark:border-gray-700 max-w-[200px]">
                    <div className="hidden text-right sm:block truncate">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role || 'Guest'}</p>
                    </div>
                    <div className="h-9 w-9 overflow-hidden rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200 dark:border-gray-800 dark:ring-gray-700">
                        <img
                            src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`}
                            alt="User"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};
