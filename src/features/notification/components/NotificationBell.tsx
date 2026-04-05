'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, CheckCheck, Inbox } from 'lucide-react';
import { useNotification } from '@/components/providers/NotificationProvider';
import { useNotificationsList } from '../hooks/useNotificationsList';
import { NotificationItem } from './NotificationItem';
import { Badge } from '@/components/common/Badge';
import { cn } from '@/lib/utils/cn';
import Link from 'next/link';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { unreadCount } = useNotification();
  const { notifications, isLoading, markAsRead, markAllAsRead } = useNotificationsList();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "relative p-2 rounded-full transition-all duration-200 focus:outline-none",
          isOpen ? "bg-primary-50 text-primary-600 scale-110" : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        )}
        aria-label="Xem thông báo"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <div className="absolute top-1 right-1">
            <Badge variant="destructive" className="px-1.5 py-0.5 min-w-[20px] flex items-center justify-center animate-pulse-slow">
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden transform origin-top-right transition-all duration-200 animate-in fade-in slide-in-from-top-2">
          <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/30">
            <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2 text-base">
              <Inbox className="w-5 h-5 text-primary-500" />
              Thông báo
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs font-medium text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1 transition-all"
              >
                <CheckCheck className="w-4 h-4" />
                Đánh dấu tất cả là đã đọc
              </button>
            )}
          </div>

          <div className="max-h-[420px] overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="p-10 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500 font-medium">Đang hóng tin...</p>
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onClick={markAsRead}
                />
              ))
            ) : (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-300">
                   <Bell className="w-8 h-8" />
                </div>
                <p className="text-gray-900 dark:text-white font-semibold text-base mb-1">Hết sạch tin rùi!</p>
                <p className="text-sm text-gray-400">Dạo này bác thảnh thơi quá, chưa có tin nhắn nào mới đâu ạ! 😂</p>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
            <Link 
              href="/notifications" 
              onClick={() => setIsOpen(false)}
              className="w-full inline-block text-center py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm hover:shadow-md"
            >
              Xem tất cả thông báo
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
