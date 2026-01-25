'use client';

import { useEffect, useState } from 'react';
import { useModerationStore } from '@/lib/store/moderation.store';
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
    ShieldCheck,
    Users,
    MessageSquare,
    Loader2,
    AlertCircle,
    MapPin,
    Calendar,
    ArrowUpRight,
    Search,
    Filter,
    Clock,
    User,
    Flag,
    MoreVertical,
    History,
    FileText,
    ShieldAlert
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils/format';

// Mock data for Admin specific features
const MOCK_REPORTS = [
    {
        id: '1',
        reporter: 'Nguyen Van A',
        target: 'San Bong Da My Dinh',
        reason: 'Inaccurate photos provided',
        status: 'PENDING',
        priority: 'HIGH',
        date: '2024-03-24',
    },
    {
        id: '2',
        reporter: 'Tran Thi B',
        target: 'San Cau Long ABC',
        reason: 'Harassment in comments',
        status: 'RESOLVED',
        priority: 'MEDIUM',
        date: '2024-03-23',
    }
];

const MOCK_MOD_HISTORY = [
    {
        id: '1',
        action: 'APPROVE',
        staff: 'Admin User',
        target: 'San Tennis 123',
        date: '2024-03-24 10:30',
        note: 'Business license verified.'
    },
    {
        id: '2',
        action: 'REJECT',
        staff: 'Staff Member X',
        target: 'San Bong Co Nhan Tao',
        date: '2024-03-24 09:15',
        note: 'Address is invalid.'
    }
];

export default function AdminModerationPage() {
    const {
        pendingVenues,
        reports,
        activityLogs,
        isLoading,
        error,
        fetchAdminPendingVenues,
        fetchReports,
        fetchActivityLogs,
        approveVenue,
        rejectVenue,
        updateReportStatus
    } = useModerationStore();

    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('venues');

    // Rejection state
    const [rejectingVenueId, setRejectingVenueId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [isRejectLoading, setIsRejectLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchAdminPendingVenues();
        fetchReports();
        fetchActivityLogs();
    }, [fetchAdminPendingVenues, fetchReports, fetchActivityLogs]);

    // Handle Search with debounce (simplified here, but using the search button/input)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (activeTab === 'venues') {
                fetchAdminPendingVenues({ search: searchQuery });
            } else if (activeTab === 'reports') {
                fetchReports({ search: searchQuery });
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery, activeTab, fetchAdminPendingVenues, fetchReports]);

    if (!isMounted) return null;

    const handleApprove = async (id: string, name: string) => {
        try {
            await approveVenue(id, true);
            toast({
                title: "Venue Approved",
                description: `${name} has been successfully approved and is now live.`,
            });
            fetchActivityLogs(); // Refresh logs
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to approve venue",
                variant: "destructive"
            });
        }
    };

    const handleRejectSubmit = async () => {
        if (!rejectingVenueId || !rejectReason.trim()) return;

        setIsRejectLoading(true);
        try {
            await rejectVenue(rejectingVenueId, rejectReason, true);
            toast({
                title: "Venue Rejected",
                description: "The application has been rejected and the owner notified.",
            });
            setRejectingVenueId(null);
            setRejectReason('');
            fetchActivityLogs(); // Refresh logs
        } catch (err: any) {
            toast({
                title: "Error",
                description: err.message || "Failed to reject venue",
                variant: "destructive"
            });
        } finally {
            setIsRejectLoading(false);
        }
    };

    const handleUpdateReportStatus = async (id: string, status: string) => {
        try {
            await updateReportStatus(id, status);
            toast({
                title: "Report Updated",
                description: `Report status changed to ${status}.`,
            });
        } catch (err: any) {
            toast({
                title: "Error",
                description: "Failed to update report status",
                variant: "destructive"
            });
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12 bg-gray-50/50 dark:bg-transparent -m-4 p-4 min-h-[calc(100vh-4rem)]">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-bold text-primary-600 uppercase tracking-widest">Admin Control</span>
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Universal Moderation
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                            Oversee platform integrity, handle reports, and manage venue verifications.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant="outline" className="rounded-2xl px-6 h-12 border-2 hover:bg-gray-50 dark:hover:bg-gray-800">
                            <FileText className="mr-2 h-4 w-4" />
                            Guidelines
                        </Button>
                        <Button className="rounded-2xl px-6 h-12 bg-primary-600 hover:bg-primary-700 shadow-xl shadow-primary-500/20 text-white border-none">
                            <ShieldAlert className="mr-2 h-4 w-4" />
                            System Alerts
                        </Button>
                    </div>
                </div>

                {/* Quick Filters */}
                <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            placeholder="Search venues, reports or users..."
                            className="w-full pl-12 h-14 rounded-2xl bg-gray-50/50 dark:bg-gray-800 border-none focus-visible:ring-2 focus-visible:ring-primary-500 text-base"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" className="h-14 rounded-2xl px-6 border-2 font-semibold">
                        <Filter className="mr-2 h-5 w-5" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatsCard
                    title="Queue Size"
                    value={pendingVenues.length.toString()}
                    description="Venues awaiting verification"
                    icon={Clock}
                    trend="+12%"
                    trendUp={true}
                    className="border-none shadow-xl shadow-gray-200/40 dark:shadow-none bg-white dark:bg-gray-900"
                />
                <StatsCard
                    title="Pending Reports"
                    value={reports.filter(r => r.status === 'OPEN').length.toString()}
                    description="User complaints"
                    icon={Flag}
                    trend="-5%"
                    trendUp={false}
                    className="border-none shadow-xl shadow-gray-200/40 dark:shadow-none bg-white dark:bg-gray-900"
                />
                <StatsCard
                    title="Logs Count"
                    value={activityLogs.length.toString()}
                    description="Actions recorded"
                    icon={Check}
                    trend="+18%"
                    trendUp={true}
                    className="border-none shadow-xl shadow-gray-200/40 dark:shadow-none bg-white dark:bg-gray-900"
                />
                <StatsCard
                    title="Security Score"
                    value="98.5%"
                    description="Platform integrity index"
                    icon={Shield}
                    className="border-none shadow-xl shadow-gray-200/40 dark:shadow-none bg-white dark:bg-gray-900"
                />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex items-center justify-between">
                    <TabsList className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-1.5 rounded-2xl shadow-sm h-auto flex-wrap">
                        <TabsTrigger value="venues" className="rounded-xl px-8 py-3 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-semibold">
                            Venues
                        </TabsTrigger>
                        <TabsTrigger value="reports" className="rounded-xl px-8 py-3 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-semibold text-gray-500">
                            Reports
                        </TabsTrigger>
                        <TabsTrigger value="history" className="rounded-xl px-8 py-3 data-[state=active]:bg-primary-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all font-semibold text-gray-500">
                            Audit History
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="venues" className="space-y-6">
                    {isLoading && pendingVenues.length === 0 ? (
                        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden py-24">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
                                <p className="text-gray-500 font-bold text-lg">Fetching moderation queue...</p>
                            </div>
                        </Card>
                    ) : pendingVenues.length === 0 ? (
                        <Card className="border-none shadow-2xl rounded-3xl overflow-hidden py-24 flex flex-col items-center justify-center text-center px-6">
                            <div className="h-24 w-24 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mb-6">
                                <Check className="h-12 w-12 text-green-500" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Queue is Clear!</h3>
                            <p className="text-gray-500 dark:text-gray-400 max-w-sm text-lg font-medium">No pending venue applications found. You're all caught up with the current submissions.</p>
                            <Button variant="outline" onClick={() => fetchAdminPendingVenues()} className="mt-8 h-12 px-8 rounded-xl font-bold border-2">Refresh Queue</Button>
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {pendingVenues.map((venue) => (
                                <Card key={venue.id} className="overflow-hidden border-none shadow-xl shadow-gray-200/30 hover:shadow-2xl hover:shadow-gray-300/40 transition-all duration-500 rounded-3xl group bg-white dark:bg-gray-900 border-2 border-transparent hover:border-primary-100 dark:hover:border-primary-900/30">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Image Section */}
                                        <div className="relative w-full lg:w-[400px] h-64 lg:h-auto bg-gray-100 overflow-hidden">
                                            <img
                                                src={venue.thumbnailUrl || `https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=800&h=600&fit=crop`}
                                                alt={venue.name}
                                                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                                <Button className="w-full bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold h-12 shadow-lg">
                                                    <Eye className="mr-2 h-5 w-5" /> Detailed View
                                                </Button>
                                            </div>
                                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                                <Badge className="bg-primary-600 text-white border-none px-4 py-1.5 rounded-full text-xs font-bold shadow-lg uppercase tracking-wider">New Submission</Badge>
                                                <Badge className="bg-white/90 text-gray-900 border-none px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1 backdrop-blur-sm">
                                                    <Clock className="h-3 w-3" /> {new Date(venue.createdAt).toLocaleDateString()}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <CardContent className="flex-1 p-8 lg:p-10 flex flex-col justify-between">
                                            <div className="space-y-6">
                                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                                    <div className="space-y-2">
                                                        <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-tight leading-none">{venue.name}</h3>
                                                        <div className="flex items-center text-gray-500 dark:text-gray-400 font-medium">
                                                            <MapPin className="mr-2 h-5 w-5 text-primary-500" />
                                                            <span className="text-lg">{venue.address}, {venue.district}, {venue.city}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1 shrink-0">
                                                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">Priority Score</span>
                                                        <div className="flex items-center gap-1 px-3 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full font-black text-sm border border-amber-100 dark:border-amber-900/30">
                                                            <Shield className="h-3 w-3" /> 8.5/10
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-primary-50/30 dark:group-hover:bg-primary-900/10">
                                                    <div className="space-y-4">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Contact Information</p>
                                                            <div className="space-y-2 mt-2">
                                                                <p className="text-base font-bold flex items-center gap-3">
                                                                    <div className="h-8 w-8 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center text-primary-600 shadow-sm">
                                                                        <User className="h-4 w-4" />
                                                                    </div>
                                                                    {venue.owner?.fullName || 'N/A'}
                                                                </p>
                                                                <div className="pl-11 space-y-1">
                                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{venue.owner?.email || 'N/A'}</p>
                                                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{venue.owner?.phone || 'N/A'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-4">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase font-black text-gray-400 tracking-[0.2em]">Facility Details</p>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <Calendar className="h-4 w-4 text-primary-600" />
                                                                <span className="text-sm font-bold">{venue.openingTime} - {venue.closingTime}</span>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2 mt-3">
                                                                {venue.amenities?.slice(0, 4).map((a: any, i: number) => (
                                                                    <span key={i} className="text-[10px] px-2.5 py-1 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg font-bold text-gray-600 dark:text-gray-300 shadow-sm">{a.name || a}</span>
                                                                ))}
                                                                {venue.amenities && venue.amenities.length > 4 && (
                                                                    <span className="text-[10px] px-2.5 py-1 text-primary-600 font-bold">+{venue.amenities.length - 4} more</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-100 dark:border-gray-800">
                                                <Button
                                                    onClick={() => handleApprove(venue.id, venue.name)}
                                                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl h-14 font-black text-lg transition-all shadow-xl shadow-primary-500/20 active:scale-[0.98]"
                                                    disabled={isLoading}
                                                >
                                                    <Check className="mr-2 h-6 w-6 stroke-[3]" /> APPROVE BUSINESS
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setRejectingVenueId(venue.id)}
                                                    className="flex-1 border-2 border-red-100 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 dark:border-red-900/30 rounded-2xl h-14 font-black text-lg transition-all active:scale-[0.98]"
                                                    disabled={isLoading}
                                                >
                                                    <X className="mr-2 h-6 w-6 stroke-[3]" /> REJECT REQUEST
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-14 w-14 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-800 shrink-0">
                                                    <MoreVertical className="h-6 w-6" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="reports" className="space-y-6">
                    <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white dark:bg-gray-900">
                        <CardHeader className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 p-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Active Reports</CardTitle>
                                    <p className="text-gray-500 font-medium">Handle user reports and system violations.</p>
                                </div>
                                <Badge className="px-6 py-2 rounded-full border-none bg-red-100 text-red-600 font-black">
                                    {reports.filter(r => r.status === 'OPEN').length} PENDING
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800">
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Reporter</th>
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Subject</th>
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Description</th>
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">Priority</th>
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {reports.map((report) => (
                                            <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold">
                                                            {report.user?.fullName?.charAt(0) || 'U'}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 dark:text-white">{report.user?.fullName || 'Unknown User'}</p>
                                                            <p className="text-xs text-gray-500">{new Date(report.createdAt).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 font-bold text-gray-900 dark:text-white">{report.subject}</td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium max-w-[200px] truncate">{report.description}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <Badge className={cn(
                                                        "rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider border-none",
                                                        report.priority === 'HIGH' ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                                                    )}>
                                                        {report.priority}
                                                    </Badge>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        className="rounded-xl h-10 px-4 font-bold text-primary-600"
                                                        onClick={() => handleUpdateReportStatus(report.id, 'RESOLVED')}
                                                        disabled={report.status === 'RESOLVED'}
                                                    >
                                                        {report.status === 'RESOLVED' ? 'Resolved' : 'Resolve'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                    <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white dark:bg-gray-900">
                        <CardHeader className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800 p-8">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="text-2xl font-black uppercase tracking-tight">Audit History</CardTitle>
                                    <p className="text-gray-500 font-medium">Traceable record of all moderation actions.</p>
                                </div>
                                <Button variant="outline" className="rounded-xl font-bold border-2">
                                    <History className="mr-2 h-4 w-4" /> Export CSV
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8">
                            <div className="space-y-8">
                                {activityLogs.map((log) => (
                                    <div key={log.id} className="flex gap-6 relative">
                                        <div className="shrink-0 flex flex-col items-center">
                                            <div className={cn(
                                                "h-12 w-12 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3",
                                                log.activityType.includes('APPROVED') ? "bg-green-600 text-white" : "bg-red-600 text-white"
                                            )}>
                                                {log.activityType.includes('APPROVED') ? <Check className="h-6 w-6" /> : <X className="h-6 w-6" />}
                                            </div>
                                            <div className="w-0.5 h-full bg-gray-100 dark:bg-gray-800 mt-2" />
                                        </div>
                                        <div className="flex-1 pb-8">
                                            <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                                    <div>
                                                        <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                                            {log.activityType.replace('_', ' ')} — {log.entityType}
                                                        </h4>
                                                        <p className="text-sm text-gray-500 font-medium flex items-center gap-2 mt-1">
                                                            <User className="h-3.5 w-3.5" /> Action by <span className="text-primary-600 font-bold">{log.user?.fullName || 'System'}</span>
                                                        </p>
                                                    </div>
                                                    <div className="text-right shrink-0">
                                                        <Badge variant="outline" className="rounded-full font-bold text-[10px] border-2 uppercase">
                                                            {new Date(log.createdAt).toLocaleString()}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 dark:text-gray-300 font-medium bg-white dark:bg-gray-900 p-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-600">
                                                    " {log.description} "
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Reject Reason Dialog */}
            <Dialog open={!!rejectingVenueId} onOpenChange={(open) => !open && setRejectingVenueId(null)}>
                <DialogContent className="sm:max-w-[600px] rounded-[2.5rem] p-10 overflow-hidden border-none shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-2 bg-red-600" />
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black text-red-600 uppercase tracking-tighter flex items-center gap-3">
                            <ShieldAlert className="h-8 w-8" /> Reject Application
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 pt-3 text-lg font-medium leading-relaxed">
                            Provide a professional and detailed feedback for the owner. Clear instructions help them fix issues faster.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-8">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3 block">Feedback Message</label>
                        <Textarea
                            placeholder="e.g., The business registration certificate is expired. Please upload a valid document from year 2024 or later."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="min-h-[200px] rounded-3xl border-2 border-gray-100 focus:border-red-500 focus:ring-0 p-6 text-lg font-medium transition-all"
                        />
                    </div>
                    <DialogFooter className="gap-4 sm:gap-0 sm:flex-row-reverse">
                        <Button
                            variant="destructive"
                            onClick={handleRejectSubmit}
                            disabled={!rejectReason.trim() || isRejectLoading}
                            className="rounded-[1.5rem] h-14 px-10 bg-red-600 hover:bg-red-700 shadow-xl shadow-red-500/20 font-black text-lg transition-transform active:scale-95 flex-1"
                        >
                            {isRejectLoading ? <Loader2 className="h-6 w-6 animate-spin mr-2" /> : <X className="h-6 w-6 mr-2 stroke-[3]" />}
                            CONFIRM REJECTION
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setRejectingVenueId(null)}
                            className="rounded-[1.5rem] h-14 px-8 font-bold text-gray-500 hover:bg-gray-100 flex-1"
                        >
                            Back To Queue
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
