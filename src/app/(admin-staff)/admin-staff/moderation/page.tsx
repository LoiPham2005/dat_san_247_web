'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StatsCard } from "@/components/ui/stats-card";
import {
    Check,
    X,
    Shield,
    Eye,
    AlertTriangle,
    ShieldCheck,
    Users,
    MessageSquare,
    MoreVertical,
    CheckCircle2
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function ModerationPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Content Moderation
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Review venue applications, flagged reviews, and community safety.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Guidelines
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Verification Queue
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Pending Approvals"
                    value="15"
                    description="New owners awaiting verification"
                    icon={Shield}
                    className="border-orange-100 dark:border-orange-900/30"
                />
                <StatsCard
                    title="Flagged Reviews"
                    value="8"
                    description="Reported by community users"
                    icon={MessageSquare}
                    className="border-red-100 dark:border-red-900/30"
                />
                <StatsCard
                    title="User Reports"
                    value="3"
                    description="Active suspension requests"
                    icon={Users}
                    className="border-amber-100 dark:border-amber-900/30"
                />
            </div>

            <Tabs defaultValue="approvals" className="space-y-6">
                <TabsList className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-1 rounded-xl">
                    <TabsTrigger value="approvals">Owner Approvals</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews & Content</TabsTrigger>
                    <TabsTrigger value="users">User Management</TabsTrigger>
                </TabsList>

                <TabsContent value="approvals" className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="border-none shadow-sm hover:shadow-md transition-shadow dark:bg-gray-900/50">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                        <div className="relative h-24 w-40 bg-gray-100 rounded-2xl flex-shrink-0 overflow-hidden group">
                                            <img src={`https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=400&h=240&fit=crop`} alt="Venue" className="object-cover w-full h-full" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <Button size="sm" variant="secondary" className="h-8 text-xs">Preview Photos</Button>
                                            </div>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="font-bold text-xl text-gray-900 dark:text-white">New Badminton Center {i}</h3>
                                                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400">Verification Needed</Badge>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
                                                <p className="text-gray-500">Owner: <span className="text-gray-900 dark:text-gray-300 font-medium">Hoang Van Owner</span></p>
                                                <p className="text-gray-500">Phone: <span className="text-gray-900 dark:text-gray-300 font-medium">0909 *** 123</span></p>
                                                <p className="text-gray-500">Location: <span className="text-gray-900 dark:text-gray-300 font-medium">District 1, Ho Chi Minh City</span></p>
                                                <p className="text-gray-500">Submitted: <span className="text-gray-900 dark:text-gray-300 font-medium">2 hours ago</span></p>
                                            </div>
                                            <div className="flex gap-4 text-xs font-semibold text-primary-600 mt-2">
                                                <button className="flex items-center gap-1 hover:underline underline-offset-4"><Eye className="h-3.5 w-3.5" /> Business License</button>
                                                <button className="flex items-center gap-1 hover:underline underline-offset-4"><Shield className="h-3.5 w-3.5" /> Identity Check</button>
                                            </div>
                                        </div>
                                        <div className="flex md:flex-col gap-2 w-full md:w-auto">
                                            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl">
                                                <Check className="mr-2 h-4 w-4" /> Approve
                                            </Button>
                                            <Button variant="outline" className="flex-1 border-red-200 text-red-600 hover:bg-red-50 rounded-xl">
                                                <X className="mr-2 h-4 w-4" /> Reject
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="reviews">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50 overflow-hidden">
                        <CardHeader className="border-b dark:border-gray-800">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Flagged Content Queue</CardTitle>
                                <Badge variant="outline" className="font-mono">8 ITEMS REMAINING</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[500px]">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="p-6 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors flex gap-6">
                                        <div className="p-2 h-fit bg-red-100 dark:bg-red-900/30 rounded-full">
                                            <AlertTriangle className="h-5 w-5 text-red-600" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <span className="font-bold text-gray-900 dark:text-white">Review on "City Sports Complex"</span>
                                                    <p className="text-xs text-gray-400 mt-0.5">Reported by: anonymous_user123 • Mar 22, 2024</p>
                                                </div>
                                                <Badge variant="destructive" className="bg-red-100 text-red-700 text-[10px] py-0">Profanity</Badge>
                                            </div>
                                            <div className="relative p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border dark:border-gray-700 italic text-sm text-gray-700 dark:text-gray-300">
                                                <span className="absolute -top-3 left-4 bg-white dark:bg-gray-900 px-2 text-[10px] font-bold text-gray-400">CONTENT</span>
                                                "This place is terrible, don't go here... [Potential profanity or hate speech detected] ..."
                                            </div>
                                            <div className="flex gap-2">
                                                <Button size="sm" variant="default" className="rounded-lg h-8 px-4">Delete Review</Button>
                                                <Button size="sm" variant="outline" className="rounded-lg h-8 px-4 text-gray-500">Dismiss Report</Button>
                                                <Button size="sm" variant="ghost" className="rounded-lg h-8 text-amber-600 hover:bg-amber-50">Warn User</Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
