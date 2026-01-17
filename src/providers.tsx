'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';

/**
 * Providers component wraps the entire application with necessary context providers.
 * 
 * 1. SessionProvider (NextAuth): Manages authentication state and provides useSession.
 * 2. QueryClientProvider (TanStack Query): Manages server state, caching, and data fetching.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
    // We use a state to ensure QueryClient is only created once on the client
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minute
                retry: 1,
            },
        },
    }));

    return (
        <SessionProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </SessionProvider>
    );
}
