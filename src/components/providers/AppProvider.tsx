"use client";

import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { NotificationProvider } from './NotificationProvider';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = React.useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000,
            },
        },
    }));

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                <NotificationProvider>
                    {children}
                    <Toaster position="top-right" richColors closeButton />
                </NotificationProvider>
            </QueryClientProvider>
        </SessionProvider>
    );
};
