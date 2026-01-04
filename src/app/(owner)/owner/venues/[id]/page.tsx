'use client';

import { useState } from 'react';
import {
    MapPin,
    Star,
    Clock,
    Image as ImageIcon,
    Settings,
    Calendar as CalendarIcon,
    MessageSquare,
    BarChart3,
    Edit,
    Save,
    Trash,
    Plus,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/format";
import { MOCK_OWNER_VENUE_DETAILS } from "@/lib/constants/mock-owner-venue";
import { MOCK_REVIEWS } from "@/lib/constants/mock-data";

export default function VenueDetailsPage({ params }: { params: { id: string } }) {
    const [activeTab, setActiveTab] = useState('info');
    const venue = MOCK_OWNER_VENUE_DETAILS;

    const tabs = [
        { id: 'info', label: 'General Info', icon: Settings },
        { id: 'schedule', label: 'Availability & Price', icon: CalendarIcon },
        { id: 'bookings', label: 'Bookings', icon: Clock },
        { id: 'reviews', label: 'Reviews', icon: MessageSquare },
        { id: 'stats', label: 'Statistics', icon: BarChart3 },
    ];

    return (
        <div className="space-y-8 pb-8">
            {/* Header Section */}
            <div className="relative rounded-3xl bg-white dark:bg-gray-900 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="h-48 w-full bg-gray-100 relative">
                    <img src={venue.images[0]} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-6 left-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-green-500 hover:bg-green-600 border-none">ACTIVE</Badge>
                            <span className="flex items-center text-sm font-medium bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" /> 4.8 (124 reviews)
                            </span>
                        </div>
                        <h1 className="text-3xl font-bold">{venue.name}</h1>
                        <p className="flex items-center text-gray-200 mt-1">
                            <MapPin className="h-4 w-4 mr-1" /> {venue.address}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-8 border-b border-gray-100 dark:border-gray-800 flex items-center gap-6 overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                                activeTab === tab.id
                                    ? "border-primary-600 text-primary-600"
                                    : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                            )}
                        >
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {activeTab === 'info' && <InfoTab venue={venue} />}
                {activeTab === 'schedule' && <ScheduleTab venue={venue} />}
                {activeTab === 'bookings' && <BookingsTab />}
                {activeTab === 'reviews' && <ReviewsTab />}
                {activeTab === 'stats' && <StatsTab />}
            </div>
        </div>
    );
}

function InfoTab({ venue }: any) {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">Venue Details</h3>
                        <Button size="sm" variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Venue Name</label>
                            <input className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue={venue.name} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea className="w-full h-32 border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 resize-none" defaultValue={venue.description} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                                <input className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue={venue.address} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sport Type</label>
                                <select className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <option>Soccer</option>
                                    <option>Tennis</option>
                                    <option>Badminton</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Amenities</h3>
                    <div className="flex flex-wrap gap-3">
                        {venue.amenities.map((item: string) => (
                            <span key={item} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium dark:bg-primary-900/20 dark:text-primary-400 flex items-center gap-2">
                                {item}
                                <button className="hover:text-red-500"><X className="h-3 w-3" /></button>
                            </span>
                        ))}
                        <button className="px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:border-primary-500 hover:text-primary-600 flex items-center gap-1">
                            <Plus className="h-3 w-3" /> Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Photo Gallery */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">Gallery</h3>
                        <Button size="sm" variant="ghost"><Plus className="h-4 w-4" /></Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {venue.images.map((img: string, i: number) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative group">
                                <img src={img} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="text-white hover:text-red-500"><Trash className="h-4 w-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rules */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold mb-4">Venue Rules</h3>
                    <ul className="space-y-3">
                        {venue.rules.map((rule: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                {rule}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function ScheduleTab({ venue }: any) {
    return (
        <div className="grid gap-8 lg:grid-cols-2">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-lg mb-6">Standard Pricing</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <div>
                            <p className="font-semibold text-sm">Weekdays (Mon - Fri)</p>
                            <p className="text-xs text-gray-500">06:00 - 17:00</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="w-24 h-9 rounded-lg border border-gray-200 text-center text-sm font-bold" defaultValue={venue.pricing.default} />
                            <span className="text-xs text-gray-500">vnđ/h</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <div>
                            <p className="font-semibold text-sm">Peak Hours</p>
                            <p className="text-xs text-gray-500">17:00 - 22:00</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="w-24 h-9 rounded-lg border border-gray-200 text-center text-sm font-bold text-primary-600" defaultValue={venue.pricing.peak} />
                            <span className="text-xs text-gray-500">vnđ/h</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <div>
                            <p className="font-semibold text-sm">Weekends (Sat - Sun)</p>
                            <p className="text-xs text-gray-500">All Day</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <input className="w-24 h-9 rounded-lg border border-gray-200 text-center text-sm font-bold text-orange-600" defaultValue={venue.pricing.weekend} />
                            <span className="text-xs text-gray-500">vnđ/h</span>
                        </div>
                    </div>
                </div>
                <Button className="w-full mt-6">Save Pricing</Button>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg">Operating Hours</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" /> Open 24/7?
                        <input type="checkbox" className="ml-2" />
                    </div>
                </div>
                <div className="space-y-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                        <div key={day} className="flex items-center justify-between text-sm">
                            <span className="w-24 font-medium">{day}</span>
                            <div className="flex items-center gap-2">
                                <select className="h-8 rounded border border-gray-200 bg-white text-xs px-2"><option>06:00</option></select>
                                <span>to</span>
                                <select className="h-8 rounded border border-gray-200 bg-white text-xs px-2"><option>23:00</option></select>
                            </div>
                            <button className="text-xs text-red-500 hover:underline">Closed</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function BookingsTab() {
    return (
        <div className="p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center py-20">
            <CalendarIcon className="h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Calendar Integration</h3>
            <p className="text-gray-500 text-center max-w-md mt-2">
                Your Google Calendar style booking view is loading... <br />
                Integrate FullCalendar here for drag-and-drop management.
            </p>
            <Button className="mt-8">View Booking List</Button>
        </div>
    )
}

function ReviewsTab() {
    return (
        <div className="max-w-3xl space-y-6">
            {MOCK_REVIEWS.map((review: any) => (
                <div key={review.id} className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                {review.customer[0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{review.customer}</h4>
                                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-0.5">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{review.comment}"</p>
                    <div className="mt-4 flex gap-3">
                        <Button size="sm" variant="outline" className="text-xs">Reply</Button>
                        <Button size="sm" variant="ghost" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50">Report</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function StatsTab() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold mb-4">Revenue Breakdown</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <span className="text-xs text-gray-400">Bar Chart Placeholder</span>
                </div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold mb-4">Booking Hours Heatmap</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <span className="text-xs text-gray-400">Heatmap Placeholder</span>
                </div>
            </div>
        </div>
    )
}
