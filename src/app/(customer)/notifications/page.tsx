'use client';

import { Bell, Tag, Clock, Info, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch'; // Assuming standard Shadcn Switch

const NOTIFICATIONS = [
    {
        id: 1,
        title: "Booking Confirmed",
        message: "Your booking at City Sports Complex for Mar 25 is confirmed. Don't forget to check in!",
        time: "2 hours ago",
        type: "booking",
        read: false
    },
    {
        id: 2,
        title: "Flash Sale: 50% Off",
        message: "Get 50% off all tennis courts this weekend! Use code TENNIS50.",
        time: "1 day ago",
        type: "promo",
        read: true
    },
    {
        id: 3,
        title: "System Maintenance",
        message: "We will be performing a scheduled maintenance on Mar 30 from 2AM to 4AM.",
        time: "2 days ago",
        type: "system",
        read: true
    }
];

export default function NotificationsPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
                <Button variant="outline" size="sm">Mark all as read</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* List */}
                <div className="lg:col-span-2 space-y-4">
                    {NOTIFICATIONS.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-4 rounded-xl border transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${notif.read ? 'bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800' : 'bg-blue-50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/20'}`}
                        >
                            <div className="flex gap-4">
                                <div className={`mt-1 h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${notif.type === 'booking' ? 'bg-green-100 text-green-600' :
                                        notif.type === 'promo' ? 'bg-purple-100 text-purple-600' :
                                            'bg-gray-100 text-gray-600'
                                    }`}>
                                    {notif.type === 'booking' && <Clock className="h-5 w-5" />}
                                    {notif.type === 'promo' && <Tag className="h-5 w-5" />}
                                    {notif.type === 'system' && <Info className="h-5 w-5" />}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className={`font-bold text-sm ${!notif.read && 'text-primary-700'}`}>{notif.title}</h3>
                                        <span className="text-xs text-gray-400">{notif.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                                        {notif.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="text-center pt-4">
                        <Button variant="ghost">Load More</Button>
                    </div>
                </div>

                {/* Settings Sidebar */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-6">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Settings className="h-5 w-5" /> Settings
                        </h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Email Notifications</label>
                                    <p className="text-xs text-gray-500">Receive booking updates via email</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium">SMS Notifications</label>
                                    <p className="text-xs text-gray-500">Get text alerts for urgent updates</p>
                                </div>
                                <Switch />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <label className="text-sm font-medium">Promotional Offers</label>
                                    <p className="text-xs text-gray-500">Be the first to know about deals</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
