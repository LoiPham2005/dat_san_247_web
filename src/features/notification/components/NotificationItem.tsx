'use client';

import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils/cn';
import { Bell, MessageSquare, CreditCard, Calendar, Info, X } from 'lucide-react';

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    is_read: boolean;
    created_at: string;
  };
  onClick: (id: string) => void;
}

const getIcon = (type: string) => {
  switch (type) {
    case 'BOOKING_CONFIRMED':
    case 'BOOKING_REMINDER':
      return <Calendar className="w-4 h-4 text-secondary-500" />;
    case 'PAYMENT_SUCCESS':
      return <CreditCard className="w-4 h-4 text-green-500" />;
    case 'PAYMENT_FAILED':
    case 'BOOKING_CANCELLED':
      return <X className="w-4 h-4 text-red-500" />;
    case 'REVIEW_RECEIVED':
      return <MessageSquare className="w-4 h-4 text-orange-500" />;
    default:
      return <Info className="w-4 h-4 text-primary-500" />;
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({ 
  notification, 
  onClick 
}) => {
  return (
    <div 
      className={cn(
        "p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200",
        !notification.is_read && "bg-blue-50/10 border-l-4 border-l-primary-500"
      )}
      onClick={() => onClick(notification.id)}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center",
            notification.is_read ? "bg-gray-100" : "bg-primary-50"
          )}>
            {getIcon(notification.type)}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <h5 className={cn(
              "text-sm font-medium text-gray-900 truncate",
              !notification.is_read && "font-semibold"
            )}>
              {notification.title}
            </h5>
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: vi })}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>
        </div>
      </div>
    </div>
  );
};
