'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StatsCard } from "@/components/ui/stats-card";
import {
    Activity,
    Server,
    Database,
    AlertCircle,
    Zap,
    Cpu,
    Shield,
    RefreshCcw,
    Terminal,
    ChevronRight,
    Search
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils/format';

export default function TechnicalSupportPage() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        System Infrastructure
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Monitor server health, database performance, and real-time error logs.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Terminal className="mr-2 h-4 w-4" />
                        CLI Access
                    </Button>
                    <Button size="sm" className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Restart Services
                    </Button>
                </div>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Active API Nodes"
                    value="12 / 12"
                    trend="Normal Load"
                    trendUp={true}
                    icon={Server}
                    className="border-green-100 dark:border-green-900/30"
                />
                <StatsCard
                    title="DB Response Time"
                    value="42ms"
                    trend="-5ms vs last hour"
                    trendUp={true}
                    icon={Database}
                    className="border-blue-100 dark:border-blue-900/30"
                />
                <StatsCard
                    title="Error Rate (24h)"
                    value="0.04%"
                    trend="+0.01% since morning"
                    trendUp={false}
                    icon={Activity}
                    className="border-amber-100 dark:border-amber-900/30"
                />
                <StatsCard
                    title="CPU Usage"
                    value="34%"
                    description="Clustering enabled"
                    icon={Cpu}
                    className="border-purple-100 dark:border-purple-900/30"
                />
            </div>

            {/* Real-time Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Monitoring */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader className="flex flex-row items-center justify-between border-b dark:border-gray-800 pb-6">
                            <div>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    Live Log Stream
                                </CardTitle>
                                <p className="text-sm text-gray-500 mt-1">Real-time system event propagation</p>
                            </div>
                            <div className="flex gap-2">
                                <Badge className="bg-green-100 text-green-700 animate-pulse">LIVE</Badge>
                                <Badge variant="outline">ALL EVENTS</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <ScrollArea className="h-[450px] font-mono text-sm leading-relaxed p-6 bg-slate-950 text-slate-300">
                                {[
                                    { time: '14:24:01', level: 'INFO', msg: 'Main cluster node-01 heart-beat received.' },
                                    { time: '14:23:55', level: 'WARN', msg: 'Inbound booking request (BK-9988) delay: 1540ms.' },
                                    { time: '14:23:42', level: 'INFO', msg: 'User session (USR-442) cleanup successful.' },
                                    { time: '14:23:30', level: 'ERROR', msg: 'MailGun service refused connection [ECONNREFUSED].' },
                                    { time: '14:22:15', level: 'INFO', msg: 'New venue registration processed: (VEN-125).' },
                                    { time: '14:21:50', level: 'INFO', msg: 'CDN cache purged for /app/customer/venues.' },
                                    { time: '14:21:40', level: 'INFO', msg: 'DB Connection Pool (Primary) scaled to 25.' },
                                    { time: '14:20:05', level: 'INFO', msg: 'System check complete - 0 vulnerabilities found.' },
                                ].map((log, idx) => (
                                    <div key={idx} className="flex gap-4 py-1 hover:bg-slate-900 group">
                                        <span className="text-slate-500 shrink-0">[{log.time}]</span>
                                        <span className={cn(
                                            "font-bold shrink-0 w-16",
                                            log.level === 'ERROR' ? 'text-red-500' :
                                                log.level === 'WARN' ? 'text-yellow-500' : 'text-blue-500'
                                        )}>{log.level}</span>
                                        <span className="text-slate-200">{log.msg}</span>
                                        <ChevronRight className="h-4 w-4 text-slate-700 ml-auto opacity-0 group-hover:opacity-100 cursor-pointer" />
                                    </div>
                                ))}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar Monitoring */}
                <div className="space-y-6">
                    <Card className="border-none shadow-sm dark:bg-gray-900/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Security Shields</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Shield className="h-5 w-5 text-primary-600" />
                                    <span className="text-sm font-medium">SSL Certificates</span>
                                </div>
                                <Badge className="bg-green-100 text-green-700">OK</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <Zap className="h-5 w-5 text-amber-500" />
                                    <span className="text-sm font-medium">DDoS Protection</span>
                                </div>
                                <Badge className="bg-green-100 text-green-700">ACTIVE</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 border rounded-xl">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                    <span className="text-sm font-medium">Flagged IPs</span>
                                </div>
                                <Badge variant="destructive">12</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-primary-600 text-white border-none shadow-lg shadow-primary-500/20 rounded-2xl p-6 relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg mb-2">Automated Backups</h3>
                            <p className="text-primary-100 text-sm mb-4">Last backup completed 4 hours ago. Next scheduled: 20:00 UTC.</p>
                            <Button variant="secondary" className="w-full bg-white text-primary-600 hover:bg-primary-50 rounded-xl font-bold">
                                Trigger Manual Backup
                            </Button>
                        </div>
                        <Activity className="absolute bottom-[-20%] right-[-10%] h-40 w-40 text-primary-500/20 group-hover:scale-110 transition-transform duration-500" />
                    </Card>
                </div>
            </div>
        </div>
    );
}
