'use client';

import { useState } from 'react';
import {
    Settings,
    Calendar,
    CreditCard,
    Mail,
    Shield,
    Smartphone,
    Save,
    RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState('general');

    const sections = [
        { id: 'general', label: 'General', icon: Settings },
        { id: 'booking', label: 'Booking', icon: Calendar },
        { id: 'payment', label: 'Payment', icon: CreditCard },
        { id: 'comms', label: 'Comms', icon: Mail },
        { id: 'permissions', label: 'Permissions', icon: Shield },
    ];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        System Settings
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Configure global parameters and system behavior.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline">
                        <RotateCcw className="mr-2 h-4 w-4" /> Reset
                    </Button>
                    <Button>
                        <Save className="mr-2 h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Nav Sidebar */}
                <aside className="w-full lg:w-64 space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                                activeSection === section.id
                                    ? "bg-white shadow-sm border border-gray-100 text-primary-600 dark:bg-gray-900 dark:border-gray-800 dark:text-primary-400"
                                    : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                            )}
                        >
                            <section.icon className="h-4 w-4" />
                            {section.label}
                        </button>
                    ))}
                </aside>

                {/* Settings Panel */}
                <main className="flex-1 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm dark:bg-gray-900 dark:border-gray-800">
                    {activeSection === 'general' && <GeneralSettings />}
                    {activeSection === 'booking' && <BookingSettings />}
                    {activeSection === 'payment' && <PaymentSettings />}
                    {activeSection === 'comms' && <CommsSettings />}
                    {activeSection === 'permissions' && <PermissionSettings />}
                </main>
            </div>
        </div>
    );
}

function GeneralSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold mb-4">Company Profile</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Company Name</label>
                        <input className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:ring-1 focus:ring-primary-500 outline-none dark:bg-gray-800 dark:border-gray-700" defaultValue="DatSan247 JSC" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Support Email</label>
                        <input className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm focus:ring-1 focus:ring-primary-500 outline-none dark:bg-gray-800 dark:border-gray-700" defaultValue="support@datsan247.com" />
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">Site Appearance</h3>
                <div className="flex items-center gap-8">
                    <div className="h-20 w-20 rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-[10px] text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                        Logo
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-[10px] text-gray-400 dark:bg-gray-800 dark:border-gray-700">
                        Fav
                    </div>
                    <Button variant="outline" size="sm">Change Identity</Button>
                </div>
            </div>
        </div>
    )
}

function BookingSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold mb-4">Time Restrictions</h3>
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Min. lead time (hours)</label>
                        <input type="number" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm dark:bg-gray-800 dark:border-gray-700" defaultValue={2} />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Max. advance booking (days)</label>
                        <input type="number" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm dark:bg-gray-800 dark:border-gray-700" defaultValue={14} />
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">Cancellation Policy</h3>
                <div className="flex items-center gap-2 mb-4">
                    <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary-600" />
                    <span className="text-sm">Allow free cancellation</span>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Refund period (hours before)</label>
                    <input type="number" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm dark:bg-gray-800 dark:border-gray-700" defaultValue={24} />
                </div>
            </div>
        </div>
    )
}

function PaymentSettings() {
    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-lg font-bold mb-4">Fee Structure</h3>
                <div className="space-y-4 max-w-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Platform Commission (%)</span>
                        <input type="number" className="w-20 h-10 border border-gray-200 rounded-lg text-center font-bold text-primary-600 dark:bg-gray-800 dark:border-gray-700" defaultValue={15} />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Owner Payout Cycle (days)</span>
                        <input type="number" className="w-20 h-10 border border-gray-200 rounded-lg text-center dark:bg-gray-800 dark:border-gray-700" defaultValue={7} />
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-lg font-bold mb-4">Active Gateways</h3>
                <div className="grid gap-4">
                    {['MoMo', 'VNPAY', 'ZaloPay', 'Stripe'].map((g) => (
                        <div key={g} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl dark:border-gray-800">
                            <span className="font-semibold text-sm">{g}</span>
                            <div className="flex items-center gap-2">
                                <Badge variant={g === 'Stripe' ? 'outline' : 'success'}>{g === 'Stripe' ? 'Inactive' : 'Configured'}</Badge>
                                <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function CommsSettings() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold">Email & SMS Gateways</h3>
            <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 dark:bg-gray-800/50 dark:border-gray-800">
                <h4 className="text-sm font-bold mb-4">SMTP Configuration</h4>
                <div className="grid gap-4">
                    <input placeholder="Host (e.g. smtp.gmail.com)" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm dark:bg-gray-800 dark:border-gray-700" />
                    <input placeholder="Port (e.g. 587)" className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm dark:bg-gray-800 dark:border-gray-700" />
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="User" className="h-10 border border-gray-200 rounded-lg px-3 text-sm dark:bg-gray-800 dark:border-gray-700" />
                        <input placeholder="Password" type="password" className="h-10 border border-gray-200 rounded-lg px-3 text-sm dark:bg-gray-800 dark:border-gray-700" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function PermissionSettings() {
    return (
        <div className="space-y-6">
            <h3 className="text-lg font-bold">Feature Flags</h3>
            <div className="space-y-4">
                {[
                    { name: 'Allow AI Chat Support', enabled: true },
                    { name: 'Public Beta: Tournament Module', enabled: false },
                    { name: 'Enable Owner Withdrawals', enabled: true },
                    { name: 'Global Maintenance Mode', enabled: false },
                ].map((flag) => (
                    <div key={flag.name} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl dark:bg-gray-900 dark:border-gray-800">
                        <span className="text-sm font-medium">{flag.name}</span>
                        <button className={cn(
                            "w-12 h-6 rounded-full transition-colors relative",
                            flag.enabled ? "bg-primary-600" : "bg-gray-200"
                        )}>
                            <div className={cn(
                                "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                                flag.enabled ? "right-1" : "left-1"
                            )} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
