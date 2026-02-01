'use client';

import React from 'react';
import { Bot, User, Bell, Mic, Globe, History, Trash2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AIASSettingsPage() {
    return (
        <div className="container max-w-3xl py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                    AI Assistant Settings
                </h1>
                <p className="text-gray-500 font-medium">Customize how the AI assistant interacts with you.</p>
            </div>

            <div className="space-y-6">
                {/* Personalization */}
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base font-bold">Personalization</CardTitle>
                            <CardDescription>Tailor the bot's identity.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">How should the bot call you?</label>
                            <Input placeholder="e.g. Anh Minh, Sarah, Captain" className="max-w-md" defaultValue="Anh Minh" />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Bot Personality (Tone)</label>
                            <div className="flex flex-wrap gap-2">
                                {['Friendly', 'Professional', 'Casual', 'Concise'].map((tone) => (
                                    <Button key={tone} variant={tone === 'Friendly' ? 'default' : 'outline'} size="sm" className="rounded-full">
                                        {tone}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center">
                            <Bell className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base font-bold">Smart Notifications</CardTitle>
                            <CardDescription>Control what the AI sends you proactively.</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { label: 'Booking Suggestions', desc: 'Get alerts for your favorite time slots.', active: true },
                            { label: 'Deals & Promotions', desc: 'Notify me about discounts at my favorite venues.', active: true },
                            { label: 'Weather Alerts', desc: 'Warn me if bad weather affects my booking.', active: true },
                            { label: 'Weekly Summary', desc: 'Summary of my activity and spending.', active: false },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{item.label}</p>
                                    <p className="text-xs text-gray-500">{item.desc}</p>
                                </div>
                                <Switch checked={item.active} />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Voice & Language */}
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                            <Mic className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base font-bold">Voice & Language</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Enable Voice Assistant</p>
                                <p className="text-xs text-gray-500">Wake word: "Hey SportBook"</p>
                            </div>
                            <Switch checked={true} />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Voice Type</label>
                            <Select
                                options={[
                                    { value: 'male', label: 'Male (Nam)' },
                                    { value: 'female', label: 'Female (Nữ)' }
                                ]}
                                defaultValue="male"
                            />
                        </div>

                        <div className="grid gap-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
                            <Select
                                options={[
                                    { value: 'vi', label: 'Tiếng Việt (Vietnamese)' },
                                    { value: 'en', label: 'English' },
                                    { value: 'kr', label: 'Korean' },
                                    { value: 'jp', label: 'Japanese' }
                                ]}
                                defaultValue="vi"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Data & Privacy */}
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm border-red-100 dark:border-red-900/20">
                    <CardHeader className="flex flex-row items-center gap-4 py-4">
                        <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <Trash2 className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                            <CardTitle className="text-base font-bold text-red-600">Data & Privacy</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">Learn from my history</p>
                                <p className="text-xs text-gray-500">Allow AI to improve suggestions based on your bookings.</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">Learned data: <span className="font-bold">7v7 Fields, Saturday Nights, Budget 500k</span></p>
                            <Button variant="destructive" size="sm" className="gap-2">
                                Clear Learned Data
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4 pt-4">
                    <Button variant="outline">Reset to Defaults</Button>
                    <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
                        <Save className="h-4 w-4" /> Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
