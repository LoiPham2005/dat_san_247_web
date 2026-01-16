'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from "@/components/ui/stats-card";
import {
    DollarSign,
    ArrowUpRight,
    ArrowDownLeft,
    FileText,
    Download,
    Wallet,
    CreditCard,
    History,
    Filter,
    CheckCircle2,
    XCircle
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

export default function FinancePage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Financial Overview
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Monitor revenue, process payouts, and manage platform invoices.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <History className="mr-2 h-4 w-4" />
                        Audit Log
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <Download className="mr-2 h-4 w-4" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Revenue (MTD)"
                    value="1.2B VND"
                    trend="+15% vs last month"
                    trendUp={true}
                    icon={DollarSign}
                    className="border-green-100 dark:border-green-900/30"
                />
                <StatsCard
                    title="Pending Payouts"
                    value="250M VND"
                    description="45 Owners waiting"
                    icon={Wallet}
                    className="border-orange-100 dark:border-orange-900/30"
                />
                <StatsCard
                    title="Refunds Processed"
                    value="12.5M VND"
                    trend="+1.2% refund rate"
                    trendUp={false}
                    icon={ArrowDownLeft}
                    className="border-red-100 dark:border-red-900/30"
                />
                <StatsCard
                    title="Platform Fees"
                    value="120M VND"
                    description="Net platform profit"
                    icon={FileText}
                    className="border-blue-100 dark:border-blue-900/30"
                />
            </div>

            <Tabs defaultValue="payouts" className="space-y-6">
                <TabsList className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-1 rounded-xl">
                    <TabsTrigger value="payouts">Owner Payouts</TabsTrigger>
                    <TabsTrigger value="refunds">Refund Requests</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices & Fees</TabsTrigger>
                    <TabsTrigger value="tax">Tax Compliance</TabsTrigger>
                </TabsList>

                <TabsContent value="payouts">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Payout Requests</CardTitle>
                                <p className="text-sm text-gray-500 mt-1">Venue owners requesting fund withdrawals</p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2">
                                <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
                                <Button variant="outline" size="sm" className="text-primary-600"><Download className="mr-2 h-4 w-4" /> CSV</Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {[
                                    { name: 'City Sports Complex', amount: '25,000,000', bank: 'Techcombank', date: 'Mar 25, 2024' },
                                    { name: 'Elite Badminton Hub', amount: '18,500,000', bank: 'Vietcombank', date: 'Mar 24, 2024' },
                                    { name: 'Pro Tennis Academy', amount: '42,000,000', bank: 'ACB', date: 'Mar 23, 2024' },
                                    { name: 'Riverside Soccer', amount: '12,000,000', bank: 'VietinBank', date: 'Mar 23, 2024' },
                                    { name: 'Sky Fitness Center', amount: '9,800,000', bank: 'VPBank', date: 'Mar 22, 2024' },
                                ].map((payout, i) => (
                                    <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center font-bold text-primary-700 dark:text-primary-300">
                                                {payout.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{payout.name}</p>
                                                <p className="text-sm text-gray-500">{payout.bank} • •••• 1234</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                            <div className="text-right">
                                                <p className="font-bold text-lg text-primary-600">{payout.amount} VND</p>
                                                <p className="text-xs text-gray-500">{payout.date}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700 h-9 px-4 rounded-xl">
                                                    <CheckCircle2 className="h-4 w-4 mr-2" />
                                                    Approve
                                                </Button>
                                                <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-50 hover:text-red-700 h-9 rounded-xl">
                                                    <XCircle className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" className="w-full mt-6 text-gray-500">View 15 more requests</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="refunds">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50 p-12 flex flex-col items-center justify-center text-center">
                        <div className="h-20 w-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                            <ArrowDownLeft className="h-10 w-10 text-red-600" />
                        </div>
                        <h3 className="text-2xl font-bold">Refund Management</h3>
                        <p className="text-gray-500 max-w-md mt-2">All pending customer refunds due to cancellations or service issues will appear here for final approval.</p>
                        <Button className="mt-8 bg-gray-900 text-white dark:bg-white dark:text-gray-900">View Policy Guidelines</Button>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
