import React from "react";
import { AdminSidebar } from "@/components/layout/admin/AdminSidebar";
import { AdminHeader } from "@/components/layout/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
            <AdminSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <AdminHeader />
                <main className="flex-1 overflow-y-auto pb-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
