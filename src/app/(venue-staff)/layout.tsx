import React from "react";
import { VenueStaffSidebar } from "@/components/layout/venue-staff/VenueStaffSidebar";
import { VenueStaffHeader } from "@/components/layout/venue-staff/VenueStaffHeader";

export default function VenueStaffLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden">
            <VenueStaffSidebar />
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <VenueStaffHeader />
                <main className="flex-1 overflow-y-auto pb-10">
                    {children}
                </main>
            </div>
        </div>
    );
}
