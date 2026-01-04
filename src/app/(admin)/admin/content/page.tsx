'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Image,
    FileText,
    Mail,
    Bell,
    Plus,
    Search,
    MoreHorizontal,
    Upload,
    ExternalLink,
    Clock,
    CheckCircle2
} from "lucide-react";
import { cn } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";

export default function ContentPage() {
    const [activeTab, setActiveTab] = useState('banners');

    const tabs = [
        { id: 'banners', label: 'Banners', icon: Image },
        { id: 'blog', label: 'Blog Posts', icon: FileText },
        { id: 'email', label: 'Email Templates', icon: Mail },
        { id: 'push', label: 'Push Notifications', icon: Bell },
    ];

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Content Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage media, articles, and automated communications.
                    </p>
                </div>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New {activeTab === 'banners' ? 'Banner' : activeTab === 'blog' ? 'Post' : activeTab === 'email' ? 'Template' : 'Notification'}
                </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 border-b border-gray-100 dark:border-gray-800 p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                            activeTab === tab.id
                                ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        )}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Rendering */}
            <div className="min-h-[400px]">
                {activeTab === 'banners' && <BannerSection />}
                {activeTab === 'blog' && <BlogSection />}
                {activeTab === 'email' && <EmailSection />}
                {activeTab === 'push' && <PushSection />}
            </div>
        </div>
    );
}

function BannerSection() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
                <div key={i} className="group relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                        <img
                            src={`https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?w=800&auto=format&fit=crop&q=60&index=${i}`}
                            alt="Banner"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="outline" className="text-white border-white bg-transparent hover:bg-white hover:text-black">Edit</Button>
                            <Button size="sm" variant="outline" className="text-white border-white bg-transparent hover:bg-white hover:text-black">Preview</Button>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-sm">Homepage Hero {i}</h4>
                            <Badge variant={i === 1 ? 'success' : 'outline'}>{i === 1 ? 'Live' : 'Draft'}</Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 truncate">Link: /promotions/summer-sale-2024</p>
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                            <span>Order: {i}</span>
                            <span>Updated 2 days ago</span>
                        </div>
                    </div>
                </div>
            ))}
            <div className="border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center min-h-[200px] hover:border-primary-500 transition-colors dark:border-gray-800">
                <Upload className="h-8 w-8 text-gray-300 mb-2" />
                <p className="text-sm font-medium text-gray-500">Add New Banner</p>
            </div>
        </div>
    )
}

function BlogSection() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary-500 transition-all dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                    <div className="h-20 w-32 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img src={`https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop&q=60&index=${i}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="info">Sport</Badge>
                            <span className="text-[11px] text-gray-400">Published 5 hours ago</span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Top 10 Soccer Fields in Ho Chi Minh City 2024</h4>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><ExternalLink className="h-3 w-3" /> 1,240 views</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Actions</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function EmailSection() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {['Welcome Email', 'Booking Confirmation', 'Password Reset', 'Marketing Monthly'].map((name, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm group">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-4 dark:bg-primary-900/20">
                        <Mail className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">{name}</h4>
                    <p className="text-xs text-gray-500 mb-4">Last update: Mar 20, 2024</p>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">Edit Template</Button>
                        <Button variant="ghost" size="sm" className="w-full text-[10px] text-gray-400">Send Test</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function PushSection() {
    return (
        <div className="max-w-3xl space-y-6">
            <div className="bg-primary-50/50 p-6 rounded-2xl border border-primary-100 dark:bg-primary-900/10 dark:border-primary-900/20">
                <h4 className="font-bold flex items-center gap-2 mb-4">
                    <Bell className="h-4 w-4" />
                    New Push Notification
                </h4>
                <div className="space-y-4">
                    <input
                        placeholder="Notification Title"
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <textarea
                        placeholder="Notification Message..."
                        rows={3}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <div className="flex gap-4">
                        <select className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm">
                            <option>All Users</option>
                            <option>Owners Only</option>
                            <option>VIP Customers</option>
                        </select>
                        <Button className="px-8">Send Now</Button>
                    </div>
                </div>
            </div>

            <h4 className="font-bold text-gray-900 dark:text-white">Recent Log</h4>
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                        <div>
                            <h5 className="text-sm font-semibold">Weekend Promo Alert</h5>
                            <p className="text-xs text-gray-500">Sent to 4,500 users • 2 hours ago</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <span className="text-green-600">65% Open</span>
                            <span className="text-blue-600">12% Click</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
