'use client';

import React from 'react';
import { Bot, CheckCircle2, Clock, Calendar, AlertTriangle, CloudRain, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function VenueStaffAIHelper() {
    return (
        <div className="container max-w-lg py-6 mx-auto">
            <div className="mb-6 text-center">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 mb-4 shadow-sm animate-pulse">
                    <Bot className="h-8 w-8" />
                </div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">AI Helper - Sân ABC</h1>
                <p className="text-gray-500">What do you need help with today?</p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 space-y-6">
                {/* Weather Widget */}
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                    <div className="flex items-center gap-3">
                        <Sun className="h-8 w-8 text-yellow-500" />
                        <div>
                            <p className="font-bold text-gray-900 dark:text-white">Today's Forecast</p>
                            <p className="text-xs text-gray-500">Sunny • High 32°C</p>
                        </div>
                    </div>
                    <span className="text-xs font-bold bg-white dark:bg-blue-900/50 px-2 py-1 rounded-lg text-blue-600">Perfect for play</span>
                </div>

                {/* Daily Tasks */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Daily Checklist (Morning)</h3>
                    <div className="space-y-2">
                        {[
                            { task: 'Check field condition (Safety)', done: true, time: '6:00 AM' },
                            { task: 'Verify upcoming bookings', done: true, time: '6:30 AM' },
                            { task: 'Reply to pending messages (3)', done: true, time: '6:45 AM' },
                            { task: 'Brief morning staff', done: false, time: 'Pending' }
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${item.done ? 'bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30' : 'bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700'}`}>
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center border-2 ${item.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                                    {item.done && <CheckCircle2 className="h-3.5 w-3.5" />}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-sm font-medium ${item.done ? 'text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>{item.task}</p>
                                    <p className="text-[10px] text-gray-400">{item.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Urgent Alerts */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" /> Urgent Action Required
                    </h3>
                    <Card className="border-red-100 bg-red-50/50 dark:border-red-900/30 dark:bg-red-900/10">
                        <CardContent className="p-4 space-y-3">
                            <div className="flex gap-3">
                                <div className="h-2 w-2 rounded-full bg-red-500 mt-2 shrink-0" />
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Field 2: Light Malfunction</p>
                                    <p className="text-xs text-gray-500 mt-1">Reported by customer 10 mins ago. Fix before evening slot (6 PM).</p>
                                </div>
                            </div>
                            <div className="flex gap-2 pl-5">
                                <Button size="sm" variant="destructive" className="h-8 text-xs font-bold">Call Maintenance</Button>
                                <Button size="sm" variant="outline" className="h-8 text-xs bg-white dark:bg-transparent">Reschedule</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Chat Trigger */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                    <p className="text-center text-xs text-gray-500 mb-3">Need help with something else?</p>
                    <Button className="w-full h-12 rounded-2xl gap-2 font-bold text-lg shadow-lg shadow-primary-500/20">
                        <Bot className="h-5 w-5" /> Ask AI Assistant
                    </Button>
                </div>
            </div>
        </div>
    );
}
