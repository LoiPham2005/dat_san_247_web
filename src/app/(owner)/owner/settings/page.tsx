'use client';

import { useState } from 'react';
import {
    Building2,
    CreditCard,
    Bell,
    Clock,
    Shield,
    Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/format";

export default function OwnerSettingsPage() {
    const [activeSection, setActiveSection] = useState('company');

    const sections = [
        { id: 'company', label: 'Company Profile', icon: Building2 },
        { id: 'banking', label: 'Bank & Payouts', icon: CreditCard },
        { id: 'booking', label: 'Booking Rules', icon: Clock },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Settings
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage your business profile, checkout preferences, and security.
                    </p>
                </div>
                <Button>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-4">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-1">
                    {sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all",
                                activeSection === section.id
                                    ? "bg-primary-50 text-primary-700 shadow-sm dark:bg-primary-900/20 dark:text-primary-400"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
                            )}
                        >
                            <section.icon className="h-4 w-4" />
                            {section.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-6">
                    {activeSection === 'company' && (
                        <div className="p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm animate-fade-in">
                            <h3 className="text-lg font-bold mb-6">Company Information</h3>
                            <div className="grid gap-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Business Name</label>
                                        <input className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue="DatSan247 Corp" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Tax ID (MST)</label>
                                        <input className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue="0312345678" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Headquarters Address</label>
                                    <input className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue="123 Vo Van Tan, District 3, HCMC" />
                                </div>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Business Email</label>
                                        <input className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue="contact@datsan247.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone Number</label>
                                        <input className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue="0909123456" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'booking' && (
                        <div className="p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm animate-fade-in">
                            <h3 className="text-lg font-bold mb-6">Booking Configuration</h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Minimum Lead Time</h4>
                                        <p className="text-xs text-gray-500">How long before playtime can a user book?</p>
                                    </div>
                                    <select className="h-9 rounded border border-gray-200 text-sm w-32">
                                        <option>30 Minutes</option>
                                        <option>1 Hour</option>
                                        <option>2 Hours</option>
                                    </select>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-medium">Free Cancellation</h4>
                                        <p className="text-xs text-gray-500">Allow users to cancel for free within a window.</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <select className="h-9 rounded border border-gray-200 text-sm w-32">
                                            <option>Up to 1h before</option>
                                            <option>Up to 24h before</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeSection === 'banking' && (
                        <div className="p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm animate-fade-in flex flex-col items-center text-center py-16">
                            <CreditCard className="h-16 w-16 text-gray-200 mb-4" />
                            <h3 className="font-bold text-gray-900">No Bank Account Linked</h3>
                            <p className="text-sm text-gray-500 max-w-sm mt-2 mb-6">
                                Link your bank account to receive automatic daily payouts from your bookings.
                            </p>
                            <Button>Add Bank Account</Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
