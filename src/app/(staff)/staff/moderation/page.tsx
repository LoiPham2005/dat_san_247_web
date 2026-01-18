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
    Phone,
    Mail
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
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
import { cn } from '@/lib/utils/format';

export default function ModerationPage() {
    const {
        pendingVenues,
        isLoading,
        error,
        fetchPendingVenues,
        approveVenue,
        rejectVenue
    } = useModerationStore();

    const { toast } = useToast();
    const [isMounted, setIsMounted] = useState(false);

    // Rejection state
    const [rejectingVenueId, setRejectingVenueId] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState('');
    const [isRejectLoading, setIsRejectLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        fetchPendingVenues();
    }, [fetchPendingVenues]);

    if (!isMounted) return null;

    const handleApprove = async (id: string, name: string) => {
        try {
            await approveVenue(id);
            toast({
                title: "Venue Approved",
                description: `${name} has been successfully approved.`,
            });
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
            await rejectVenue(rejectingVenueId, rejectReason);
            toast({
                title: "Venue Rejected",
                description: "The venue application has been rejected.",
            });
            setRejectingVenueId(null);
            setRejectReason('');
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

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Content Moderation
                    </h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400 font-medium">
                        Review and verify venue applications to maintain platform quality.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-full px-6 border-2 hover:bg-gray-50">
                        Guidelines
                    </Button>
                    <Button className="rounded-full px-6 bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/20 text-white">
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Verification Log
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    title="Pending Venues"
                    value={pendingVenues.length.toString()}
                    description="Applications awaiting review"
                    icon={Shield}
                    className="border-primary-100 dark:border-primary-900/30 bg-primary-50/10"
                />
                <StatsCard
                    title="Reported Content"
                    value="0"
                    description="Flagged reviews or comments"
                    icon={MessageSquare}
                    className="border-red-100 dark:border-red-900/30 bg-red-50/10"
                />
                <StatsCard
                    title="Active Owners"
                    value="--"
                    description="Verified service providers"
                    icon={Users}
                    className="border-primary-100 dark:border-primary-900/30 bg-primary-50/10"
                />
            </div>

            <Tabs defaultValue="venues" className="space-y-6">
                <TabsList className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-1 rounded-xl shadow-sm">
                    <TabsTrigger value="venues" className="rounded-lg px-8 data-[state=active]:bg-primary-600 data-[state=active]:text-white transition-all">
                        Venue Approvals
                    </TabsTrigger>
                    <TabsTrigger value="reviews" className="rounded-lg px-8 data-[state=active]:bg-primary-600 data-[state=active]:text-white transition-all">
                        Reports & Flagged
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="venues" className="space-y-6">
                    {isLoading && pendingVenues.length === 0 ? (
                        <div className="flex h-96 flex-col items-center justify-center gap-4 bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
                            <p className="text-gray-500 font-medium">Scanning for new applications...</p>
                        </div>
                    ) : pendingVenues.length === 0 ? (
                        <div className="flex h-96 flex-col items-center justify-center gap-4 bg-white/50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
                            <div className="h-20 w-20 rounded-full bg-green-50 flex items-center justify-center">
                                <Check className="h-10 w-10 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">All caught up!</h3>
                            <p className="text-gray-500 max-w-sm text-center">No pending venue applications found. Check back later for new submissions.</p>
                            <Button variant="outline" onClick={() => fetchPendingVenues()} className="mt-2">Refresh Queue</Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {pendingVenues.map((venue) => (
                                <Card key={venue.id} className="overflow-hidden border-none shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-300 rounded-3xl group">
                                    <div className="flex flex-col lg:flex-row">
                                        {/* Image Section */}
                                        <div className="relative w-full lg:w-72 h-48 lg:h-auto bg-gray-100 overflow-hidden">
                                            <img
                                                src={venue.thumbnailUrl || `https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=600&h=400&fit=crop`}
                                                alt={venue.name}
                                                className="object-cover w-full h-full"
                                            />
                                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                                <Button size="sm" variant="secondary" className="w-full bg-white border-gray-200 text-gray-900 hover:bg-gray-50">
                                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                                </Button>
                                            </div>
                                            <div className="absolute top-4 left-4">
                                                <Badge className="bg-primary-600 text-white border-none">Pending Verification</Badge>
                                            </div>
                                        </div>

                                        {/* Info Section */}
                                        <CardContent className="flex-1 p-8">
                                            <div className="flex flex-col h-full justify-between gap-6">
                                                <div className="space-y-4">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-tight">{venue.name}</h3>
                                                            <p className="flex items-center text-gray-500 mt-1">
                                                                <MapPin className="mr-1.5 h-4 w-4 text-primary-600" />
                                                                {venue.address}, {venue.district}, {venue.city}
                                                            </p>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Submitted On</p>
                                                            <p className="text-sm font-semibold text-gray-700">{new Date(venue.createdAt).toLocaleDateString('vi-VN')}</p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Owner</p>
                                                            <p className="text-sm font-bold flex items-center gap-2">
                                                                <Users className="h-3.5 w-3.5 text-primary-600" /> {venue.owner?.fullName || 'N/A'}
                                                            </p>
                                                            <div className="flex flex-col gap-0.5 mt-1 border-l-2 border-primary-100 pl-3">
                                                                <p className="text-xs text-gray-500">{venue.owner?.email || 'N/A'}</p>
                                                                <p className="text-xs text-gray-500">{venue.owner?.phone || 'N/A'}</p>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Facility</p>
                                                            <p className="text-sm font-bold flex items-center gap-2">
                                                                <Calendar className="h-3.5 w-3.5 text-primary-600" /> {venue.openingTime} - {venue.closingTime}
                                                            </p>
                                                            <div className="flex flex-wrap gap-1 mt-2">
                                                                {venue.amenities?.slice(0, 3).map((a: any, i: number) => (
                                                                    <span key={i} className="text-[10px] px-1.5 py-0.5 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md font-medium">{a.name || a}</span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                                                    <Button
                                                        onClick={() => handleApprove(venue.id, venue.name)}
                                                        className="flex-1 bg-primary-600 hover:bg-primary-700 text-white rounded-xl h-11 transition-all"
                                                    >
                                                        <Check className="mr-2 h-4 w-4" /> Approve Business
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => setRejectingVenueId(venue.id)}
                                                        className="flex-1 border border-red-200 text-red-600 hover:bg-red-50 rounded-xl h-11"
                                                    >
                                                        <X className="mr-2 h-4 w-4" /> Reject Request
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="reviews">
                    <Card className="border-none shadow-2xl shadow-gray-200/50 rounded-3xl overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b dark:border-gray-800 p-8">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-2xl font-bold">Flagged Reviews Queue</CardTitle>
                                <Badge variant="outline" className="px-4 py-1 rounded-full border-2">O ITEMS REMAINING</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="flex h-64 flex-col items-center justify-center text-gray-400">
                                <MessageSquare className="h-12 w-12 mb-2 opacity-20" />
                                <p>No reported content to review.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Reject Reason Dialog */}
            <Dialog open={!!rejectingVenueId} onOpenChange={(open) => !open && setRejectingVenueId(null)}>
                <DialogContent className="sm:max-w-[500px] rounded-3xl p-8">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-red-600">Reject Application</DialogTitle>
                        <DialogDescription className="text-gray-500 pt-2 text-lg">
                            Please provide a detailed reason for rejecting this venue. This will be sent to the owner.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                        <Textarea
                            placeholder="e.g., Missing required business license photos, incomplete address details, or violates community guidelines..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="min-h-[150px] rounded-2xl border-2 focus:ring-red-500 focus:border-red-500 p-4 text-base"
                        />
                    </div>
                    <DialogFooter className="gap-3 sm:gap-0">
                        <Button
                            variant="outline"
                            onClick={() => setRejectingVenueId(null)}
                            className="rounded-2xl h-12 px-6 border-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleRejectSubmit}
                            disabled={!rejectReason.trim() || isRejectLoading}
                            className="rounded-2xl h-12 px-8 bg-red-600 hover:bg-red-700 shadow-lg shadow-red-500/20"
                        >
                            {isRejectLoading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <X className="h-5 w-5 mr-2" />}
                            Confirm Rejection
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
