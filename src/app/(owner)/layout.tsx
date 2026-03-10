import React from 'react';
import { OwnerHeader } from '@/components/layout/owner/OwnerHeader';
import { OwnerSidebar } from '@/components/layout/owner/OwnerSidebar';

export default function OwnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <OwnerSidebar />
            <div className="flex-1 flex flex-col">
                <OwnerHeader />
                <main className="p-8 pb-12 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
