import React from "react";
import { OwnerSidebar } from "@/components/layout/owner/OwnerSidebar";
import { OwnerHeader } from "@/components/layout/owner/OwnerHeader";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
            <OwnerSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <OwnerHeader />
                <main className="flex-1 overflow-y-auto pb-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
