import React from "react";
import { CustomerHeader } from "@/components/layout/customer/CustomerHeader";

import { FloatingContact } from "@/components/common/FloatingContact";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 relative">
            <CustomerHeader />
            <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
                {children}
            </main>
            <FloatingContact />
        </div>
    );
}
