import React from 'react';
import { PublicHeader } from '@/components/layout/public/PublicHeader';
import { PublicFooter } from '@/components/layout/public/PublicFooter';

import { FloatingContact } from "@/components/common/FloatingContact";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col relative">
            <PublicHeader />
            <div className="flex-1">{children}</div>
            <PublicFooter />
            <FloatingContact />
        </div>
    );
}
