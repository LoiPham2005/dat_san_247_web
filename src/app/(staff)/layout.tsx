import React from "react";
import { StaffSidebar } from "@/components/layout/staff/StaffSidebar";
import { StaffHeader } from "@/components/layout/staff/StaffHeader";

import { SidebarProvider } from "@/components/providers/SidebarProvider";

export default function StaffLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
                <StaffSidebar />
                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <StaffHeader />
                    <main className="flex-1 overflow-y-auto pb-10">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
