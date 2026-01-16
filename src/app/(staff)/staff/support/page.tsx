'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from "@/components/ui/stats-card";
import {
    MessageCircle,
    AlertCircle,
    CheckCircle2,
    Clock,
    Search,
    MoreHorizontal,
    Plus,
    Filter
} from 'lucide-react';

export default function CustomerSupportPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Customer Support
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Manage user inquiries, tickets, and professional assistance.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <Plus className="mr-2 h-4 w-4" />
                        New Ticket
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Open Tickets"
                    value="12"
                    trend="+2 since last hour"
                    trendUp={true}
                    icon={AlertCircle}
                    className="border-red-100 dark:border-red-900/30"
                />
                <StatsCard
                    title="Pending Response"
                    value="5"
                    description="Avg wait: 24m"
                    icon={Clock}
                    className="border-amber-100 dark:border-amber-900/30"
                />
                <StatsCard
                    title="Active Chats"
                    value="8"
                    description="3 agents online"
                    icon={MessageCircle}
                    className="border-blue-100 dark:border-blue-900/30"
                />
                <StatsCard
                    title="Resolved Today"
                    value="45"
                    trend="+12% from yesterday"
                    trendUp={true}
                    icon={CheckCircle2}
                    className="border-green-100 dark:border-green-900/30"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Information List */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Tickets</CardTitle>
                            <div className="flex items-center gap-2">
                                <div className="relative w-64">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input placeholder="Search tickets..." className="pl-10 h-9" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
                                    <TabsTrigger value="all">All</TabsTrigger>
                                    <TabsTrigger value="open">Open</TabsTrigger>
                                    <TabsTrigger value="pending">Pending</TabsTrigger>
                                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                                </TabsList>
                                <div className="mt-6 space-y-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group">
                                            <div className="flex items-center gap-4">
                                                <div className={`h-2.5 w-2.5 rounded-full ${i === 1 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-green-500'}`} />
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white">Booking Cancellation Request #TIC-{2024 + i}</p>
                                                    <p className="text-sm text-gray-500">From: Nguyen Van A • 2 hours ago</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={i === 1 ? 'destructive' : 'secondary'} className="px-2.5 py-0.5">
                                                    {i === 1 ? 'High Priority' : 'Normal'}
                                                </Badge>
                                                <Button variant="ghost" size="icon" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Agent Activity / Quick Actions */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Team Status</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {[
                                { name: 'John Doe', initials: 'JD', status: 'Online', color: 'bg-green-500' },
                                { name: 'Alice Smith', initials: 'AS', status: 'Away', color: 'bg-yellow-500' },
                                { name: 'Bob Wilson', initials: 'BW', status: 'Busy', color: 'bg-red-500' },
                            ].map((agent) => (
                                <div key={agent.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center font-bold text-primary-700 dark:text-primary-300">
                                                {agent.initials}
                                            </div>
                                            <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ${agent.color} border-2 border-white dark:border-gray-900`} />
                                        </div>
                                        <span className="font-medium text-sm">{agent.name}</span>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{agent.status}</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-none shadow-red-100/50 shadow-lg dark:bg-red-900/10 border-l-4 border-l-red-500">
                        <CardHeader>
                            <CardTitle className="text-lg text-red-600 dark:text-red-400">Urgent Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                                    <p className="text-sm font-semibold text-red-800 dark:text-red-200">New Refund Request</p>
                                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">Booking #BK-9988 (1.5M VND)</p>
                                    <Button size="sm" variant="destructive" className="w-full mt-3 shadow-md shadow-red-500/20">
                                        Review Now
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
