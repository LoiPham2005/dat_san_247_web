'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from "@/components/ui/stats-card";
import {
    BarChart3,
    Ticket,
    Mail,
    TrendingUp,
    Plus,
    Calendar,
    ArrowUpRight,
    Users
} from 'lucide-react';

export default function MarketingPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Marketing Dashboard
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Create campaigns, manage vouchers, and track engagement.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Mail className="mr-2 h-4 w-4" />
                        Marketing Email
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <Plus className="mr-2 h-4 w-4" />
                        New Campaign
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Active Campaigns"
                    value="4"
                    trend="+1 from last week"
                    trendUp={true}
                    icon={TrendingUp}
                    className="border-purple-100 dark:border-purple-900/30"
                />
                <StatsCard
                    title="Vouchers Redeemed"
                    value="1,234"
                    trend="+12% conversion"
                    trendUp={true}
                    icon={Ticket}
                    className="border-emerald-100 dark:border-emerald-900/30"
                />
                <StatsCard
                    title="Email Open Rate"
                    value="24.8%"
                    trend="+2.1% this week"
                    trendUp={true}
                    icon={Mail}
                    className="border-blue-100 dark:border-blue-900/30"
                />
            </div>

            <Tabs defaultValue="campaigns" className="space-y-6">
                <TabsList className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-1 rounded-xl">
                    <TabsTrigger value="campaigns">All Campaigns</TabsTrigger>
                    <TabsTrigger value="vouchers">Voucher Management</TabsTrigger>
                    <TabsTrigger value="content">Content & Blog</TabsTrigger>
                    <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="campaigns" className="space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Running Campaigns</CardTitle>
                                <p className="text-sm text-gray-500 mt-1">Currently active promotions across the platform</p>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary-600">View All</Button>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[
                                    { name: 'Summer Sports Festival', status: 'Running', reach: '5.2k', conversion: '3.4%', color: 'bg-green-500' },
                                    { name: 'New User Welcome Series', status: 'Automated', reach: '1.1k/mo', conversion: '12%', color: 'bg-blue-500' },
                                    { name: 'Weekend Flash Sale', status: 'Scheduled', reach: '-', conversion: '-', color: 'bg-amber-500' },
                                ].map((camp, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-5 border rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className={`h-12 w-12 rounded-xl ${camp.color.replace('bg-', 'bg-').replace('500', '100')} dark:${camp.color.replace('500', '900/30')} flex items-center justify-center`}>
                                                <TrendingUp className={`h-6 w-6 ${camp.color.replace('bg-', 'text-')}`} />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{camp.name}</h3>
                                                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                                                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Reach: {camp.reach}</span>
                                                    <span className="flex items-center gap-1"><ArrowUpRight className="h-3 w-3" /> Conv: {camp.conversion}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge variant={camp.status === 'Running' ? 'default' : 'secondary'} className="px-3">
                                                {camp.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="rounded-full">
                                                <ArrowUpRight className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="vouchers">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50 min-h-[400px] flex flex-col items-center justify-center text-center p-12">
                        <div className="h-16 w-16 bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-4">
                            <Ticket className="h-8 w-8 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold">Voucher Management</h3>
                        <p className="text-gray-500 max-w-sm mt-2">Generate bulk codes, set expiration dates, and monitor usage statistics for all venues.</p>
                        <Button className="mt-6">Create First Voucher Pool</Button>
                    </Card>
                </TabsContent>

                <TabsContent value="content">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none shadow-sm dark:bg-gray-900/50 p-6">
                            <h3 className="font-bold mb-4">Newsletter Drafts</h3>
                            <div className="space-y-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="p-3 border rounded-xl flex justify-between items-center">
                                        <span className="text-sm font-medium">Monthly Catchup - April 2024</span>
                                        <Badge variant="outline">Draft</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        <Card className="border-none shadow-sm dark:bg-gray-900/50 p-6">
                            <h3 className="font-bold mb-4">Blog Posts</h3>
                            <div className="space-y-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="p-3 border rounded-xl flex justify-between items-center">
                                        <span className="text-sm font-medium">Top 5 Badminton Techniques</span>
                                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Published</Badge>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
