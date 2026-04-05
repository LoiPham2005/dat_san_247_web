"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

interface NotificationProviderProps {
  children: React.ReactNode;
}

interface NotificationContextType {
  socket: Socket | null;
  isConnected: boolean;
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
  refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType>({
  socket: null,
  isConnected: false,
  unreadCount: 0,
  setUnreadCount: () => {},
  refreshUnreadCount: async () => {},
});

export const useNotification = () => useContext(NotificationContext);

interface AppNotification {
  id: string;
  title: string;
  message: string;
  reference_id?: string;
  reference_type?: string;
  created_at: string;
}

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = async () => {
    if (status === 'authenticated' && (session as any)?.user?.accessToken) {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
        const response = await fetch(`${apiUrl}/notifications/unread-count`, {
          headers: {
            Authorization: `Bearer ${(session as any).user.accessToken}`,
          },
        });
        const data = await response.json();
        setUnreadCount(data.data?.count || 0);
      } catch (error) {
        console.error('Failed to fetch unread count:', error);
      }
    }
  };

  useEffect(() => {
    // Chỉ kết nối khi người dùng đã đăng nhập và có token
    if (status === 'authenticated' && (session as any)?.user?.accessToken) {
      const socketUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:3001';
      
      const socketInstance = io(`${socketUrl}/notifications`, {
        auth: {
          token: (session as any).user.accessToken,
        },
        transports: ['websocket'],
      });

      socketInstance.on('connect', () => {
        console.log('>>> [SOCKET] Connected');
        setIsConnected(true);
        refreshUnreadCount(); // Lấy số lượng ngay khi kết nối thành công
      });

      socketInstance.on('disconnect', () => {
        setIsConnected(false);
      });

      // Lắng nghe thông báo mới
      socketInstance.on('new_notification', (notification: AppNotification) => {
        toast.info(notification.title, {
          description: notification.message,
          duration: 5000,
        });
        
        // Tăng số lượng tin nhắn chưa đọc lên 1 đơn vị
        setUnreadCount(prev => prev + 1);
      });

      // Lắng nghe thông báo hệ thống
      socketInstance.on('system_notification', (notification: AppNotification) => {
        toast.warning(notification.title, {
          description: notification.message,
        });
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setUnreadCount(0); // Reset khi logout
      }
    }
  }, [status, session]);

  return (
    <NotificationContext.Provider value={{ socket, isConnected, unreadCount, setUnreadCount, refreshUnreadCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
