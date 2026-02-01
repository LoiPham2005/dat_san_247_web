'use client';

import React from 'react';
import { Bot, Activity, BrainCircuit, MessageSquare, Zap, Settings, BarChart3, Users, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AIAdminSystemPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight flex items-center gap-3">
                        AI System Management <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2.5 py-0.5 rounded-lg text-xs font-black uppercase tracking-wider">Online</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Monitor, configure and train your system's AI agents.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <BarChart3 className="h-4 w-4" /> Export Report
                    </Button>
                    <Button className="gap-2 bg-primary-600 hover:bg-primary-700">
                        <PlusCircleIcon className="h-4 w-4" /> New Agent
                    </Button>
                </div>
            </div>

            {/* Global Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 flex items-center justify-center">
                            <MessageSquare className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Interactions</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">45,234</h3>
                            <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                                <Activity className="h-3 w-3" /> +12% this week
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 flex items-center justify-center">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Success Rate</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">82.4%</h3>
                            <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                                <Activity className="h-3 w-3" /> +1.5% improvement
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400 flex items-center justify-center">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Response Time</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">245ms</h3>
                            <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                                <Activity className="h-3 w-3" /> -15ms faster
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-gray-100 dark:border-gray-800 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400 flex items-center justify-center">
                            <BrainCircuit className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Cost (Monthly)</p>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white">$234.00</h3>
                            <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                                <Activity className="h-3 w-3" /> ROI 12.5x
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="agents" className="w-full">
                <TabsList className="bg-white dark:bg-gray-900 p-1 border border-gray-100 dark:border-gray-800 rounded-xl">
                    <TabsTrigger value="agents" className="rounded-lg data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700 dark:data-[state=active]:bg-primary-900/20 dark:data-[state=active]:text-primary-400 font-bold">Active Agents</TabsTrigger>
                    <TabsTrigger value="training" className="rounded-lg data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700 dark:data-[state=active]:bg-primary-900/20 dark:data-[state=active]:text-primary-400 font-bold">Training & Fine-tuning</TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded-lg data-[state=active]:bg-primary-50 data-[state=active]:text-primary-700 dark:data-[state=active]:bg-primary-900/20 dark:data-[state=active]:text-primary-400 font-bold">Advanced Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="agents" className="mt-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Agent Card 1 */}
                        <Card className="overflow-hidden border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-2 bg-green-500 w-full" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <Bot className="h-5 w-5 text-gray-500" /> Customer Support
                                </CardTitle>
                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">Active</Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Handles general inquiries, booking assistance, and FAQs.</p>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Conversations</span>
                                        <span className="font-bold">12,345</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Satisfaction</span>
                                        <span className="font-bold text-green-600">4.8/5.0</span>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <Button variant="outline" size="sm" className="w-full font-bold">Logs</Button>
                                        <Button size="sm" className="w-full font-bold bg-gray-900 dark:bg-white dark:text-gray-900">Configure</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Agent Card 2 */}
                        <Card className="overflow-hidden border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-2 bg-indigo-500 w-full" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <BrainCircuit className="h-5 w-5 text-gray-500" /> Business Advisor
                                </CardTitle>
                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">Active</Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Provides revenue insights and optimization tips for owners.</p>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Owners Using</span>
                                        <span className="font-bold">234 (47%)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Suggestions Applied</span>
                                        <span className="font-bold text-indigo-600">1,203</span>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <Button variant="outline" size="sm" className="w-full font-bold">Logs</Button>
                                        <Button size="sm" className="w-full font-bold bg-gray-900 dark:bg-white dark:text-gray-900">Configure</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Agent Card 3 */}
                        <Card className="overflow-hidden border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow group">
                            <div className="h-2 bg-orange-500 w-full" />
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-lg font-bold flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-gray-500" /> Fraud Guard
                                </CardTitle>
                                <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800">Active</Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4 mt-2">
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Detects spam bookings and suspicious user patterns.</p>

                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Scans/Day</span>
                                        <span className="font-bold">5,600+</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-500 font-medium">Threats Blocked</span>
                                        <span className="font-bold text-red-600">45</span>
                                    </div>

                                    <div className="pt-2 flex gap-2">
                                        <Button variant="outline" size="sm" className="w-full font-bold">Logs</Button>
                                        <Button size="sm" className="w-full font-bold bg-gray-900 dark:bg-white dark:text-gray-900">Configure</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="training">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 p-8 flex flex-col items-center justify-center text-center space-y-4">
                        <BrainCircuit className="h-16 w-16 text-gray-200 dark:text-gray-800" />
                        <h3 className="text-lg font-bold">Training Interface Component</h3>
                        <p className="text-gray-500 max-w-md">This section will allow admins to upload knowledge base documents and review conversation logs to fine-tune the AI models.</p>
                    </div>
                </TabsContent>
            </Tabs>
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
