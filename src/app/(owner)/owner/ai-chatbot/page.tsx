'use client';

import React from 'react';
import { Bot, MessageSquare, Zap, Settings, BarChart3, Users, Clock, ShieldCheck, CheckCircle2, ChevronRight, Book, Activity, PlayCircle, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";

export default function OwnerAIChatbotPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        AI Customer Chatbot <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider">Active</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Manage how AI handles your customer interactions, FAQs, and bookings.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <MessageSquare className="h-4 w-4" /> Test Chat
                    </Button>
                    <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
                        <Settings className="h-4 w-4" /> Settings
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Status & Configuration */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-green-400 to-green-600" />
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg font-bold">Bot Status & Mode</CardTitle>
                                    <CardDescription>Control how the bot interacts with customers.</CardDescription>
                                </div>
                                <Switch checked={true} />
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800">
                                <div className="h-10 w-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                                    <Zap className="h-5 w-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-gray-900 dark:text-white">Auto-Reply Mode</p>
                                    <p className="text-xs text-gray-500">Bot handles all inquiries. Complex issues are flagged.</p>
                                </div>
                                <Badge>Enabled</Badge>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Auto-Reply Configuration</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {['Price Inquiries', 'Availability Check', 'Booking Confirmation', 'Venue Information'].map((item) => (
                                        <div key={item} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                                            <Switch checked={true} className="scale-75" />
                                        </div>
                                    ))}
                                    <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors opacity-60">
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Customer Complaints</span>
                                        <Switch checked={false} className="scale-75" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Handoff Rules</h4>
                                <div className="p-4 rounded-xl border border-amber-100 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-900/10 space-y-3">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Transfer to human when AI confidence is below <span className="font-bold text-gray-900 dark:text-white">70%</span>.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Transfer when keywords detected: <span className="font-bold text-gray-900 dark:text-white">"complaint", "manager", "angry", "refund"</span>.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Knowledge Base</CardTitle>
                            <CardDescription>Review what your bot knows about your venue.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {['FAQs (20 items)', 'Venue Info (15 items)', 'Policies (10 items)'].map((kb, i) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 group cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Book className="h-4 w-4 text-primary-600" />
                                            <span className="text-sm font-semibold">{kb}</span>
                                        </div>
                                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                ))}
                                <Button variant="outline" className="w-full mt-2 font-bold dashed border-2">
                                    <PlusCircleIcon className="h-4 w-4 mr-2" /> Add Knowledge Source
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Performance & Analytics */}
                <div className="space-y-6">
                    <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold">Performance (7d)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Messages Handled</span>
                                    <span className="font-bold text-gray-900 dark:text-white">234</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Success Rate</span>
                                    <span className="font-bold text-green-600">85%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Handoff Rate</span>
                                    <span className="font-bold text-orange-600">15%</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Avg Response</span>
                                    <span className="font-bold text-indigo-600">1.2s</span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">Customer Satisfaction</span>
                                    <span className="text-sm font-bold text-yellow-500">4.6/5.0</span>
                                </div>
                                <Progress value={92} className="h-2 bg-gray-100 dark:bg-gray-800" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-gray-100 dark:border-gray-800 shadow-sm bg-primary-600 text-white">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h4 className="font-black text-xl mb-1">Pro Tip</h4>
                                    <p className="text-primary-100 text-sm leading-relaxed">
                                        Update your "Greeting Message" to include current holiday promotions to increase conversion by ~15%.
                                    </p>
                                </div>
                                <Zap className="h-6 w-6 text-yellow-300 fill-yellow-300 animate-pulse" />
                            </div>
                            <Button variant="secondary" className="w-full mt-4 font-bold text-primary-700">Update Greeting</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function PlusCircleIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
        </svg>
    )
}
