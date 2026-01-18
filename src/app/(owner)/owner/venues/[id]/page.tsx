'use client';

import React, { useState, useEffect } from 'react';
import {
    MapPin,
    Star,
    Clock,
    Image as ImageIcon,
    Settings,
    Calendar as CalendarIcon,
    MessageSquare,
    BarChart3,
    Edit,
    Save,
    Trash,
    Plus,
    X,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/format";
import { MOCK_REVIEWS } from "@/lib/constants/mock-data";
import { venueService } from '@/lib/api/services/venue.service';
import { useToast } from '@/components/ui/use-toast';

export default function VenueDetailsPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
    const params = React.use(paramsPromise);
    const [activeTab, setActiveTab] = useState('info');
    const [venue, setVenue] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (!isMounted) return;
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await venueService.getOwnerVenueById(params.id);
                setVenue(data);
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Failed to fetch venue details",
                    variant: "destructive"
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [params.id, isMounted]);

    if (!isMounted || isLoading) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
        );
    }

    const tabs = [
        { id: 'info', label: 'General Info', icon: Settings },
        { id: 'schedule', label: 'Availability & Price', icon: CalendarIcon },
        { id: 'bookings', label: 'Bookings', icon: Clock },
        { id: 'reviews', label: 'Reviews', icon: MessageSquare },
        { id: 'stats', label: 'Statistics', icon: BarChart3 },
    ];

    return (
        <div className="space-y-8 pb-8">
            {/* Header Section */}
            <div className="relative rounded-3xl bg-white dark:bg-gray-900 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                <div className="h-64 w-full bg-gray-100 relative">
                    <img src={venue.thumbnailUrl || (venue.images && venue.images[0]?.url) || `https://images.unsplash.com/photo-1544033527-b192daee1f5b?w=1200&h=400&fit=crop`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-6 left-8 text-white">
                        <div className="flex items-center gap-3 mb-2">
                            <Badge className={cn(
                                "border-none",
                                venue.status === 'APPROVED' ? "bg-green-500" : "bg-amber-500"
                            )}>{venue.status}</Badge>
                            <span className="flex items-center text-sm font-medium bg-black/20 backdrop-blur-md px-2 py-1 rounded-lg">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" /> {venue.rating} ({venue.totalReviews} reviews)
                            </span>
                        </div>
                        <h1 className="text-4xl font-bold uppercase tracking-tight">{venue.name}</h1>
                        <p className="flex items-center text-gray-200 mt-1">
                            <MapPin className="h-4 w-4 mr-1 text-primary-400" /> {venue.address}, {venue.district}, {venue.city}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="px-8 border-b border-gray-100 dark:border-gray-800 flex items-center gap-8 overflow-x-auto bg-white dark:bg-gray-900">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "flex items-center gap-2 py-5 text-[10px] font-bold uppercase tracking-widest border-b-2 transition-all whitespace-nowrap",
                                activeTab === tab.id
                                    ? "border-primary-600 text-primary-600"
                                    : "border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                            )}
                        >
                            <tab.icon className="h-3.5 w-3.5" />
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'info' && <InfoTab venue={venue} />}
                {activeTab === 'schedule' && <ScheduleTab venue={venue} onRefresh={() => {
                    // Re-fetch venue data
                    const fetchData = async () => {
                        const data = await venueService.getOwnerVenueById(params.id);
                        setVenue(data);
                    };
                    fetchData();
                }} />}
                {activeTab === 'bookings' && <BookingsTab />}
                {activeTab === 'reviews' && <ReviewsTab />}
                {activeTab === 'stats' && <StatsTab />}
            </div>
        </div>
    );
}

function InfoTab({ venue }: any) {
    return (
        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">Venue Details</h3>
                        <Button size="sm" variant="outline"><Edit className="mr-2 h-4 w-4" /> Edit</Button>
                    </div>
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Venue Name</label>
                            <input className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue={venue.name} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                            <textarea className="w-full h-32 border border-gray-200 rounded-lg p-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700 resize-none" defaultValue={venue.description} />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                                <input className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700" defaultValue={venue.address} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sport Type</label>
                                <select className="w-full h-10 border border-gray-200 rounded-lg px-3 text-sm bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                    <option>Soccer</option>
                                    <option>Tennis</option>
                                    <option>Badminton</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold text-lg mb-6">Amenities</h3>
                    <div className="flex flex-wrap gap-3">
                        {venue.amenities?.map((item: any) => (
                            <span key={typeof item === 'string' ? item : item.id} className="px-3 py-1.5 rounded-lg bg-primary-50 text-primary-700 text-sm font-medium dark:bg-primary-900/20 dark:text-primary-400 flex items-center gap-2">
                                {typeof item === 'string' ? item : item.name}
                                <button className="hover:text-red-500"><X className="h-3 w-3" /></button>
                            </span>
                        ))}
                        <button className="px-3 py-1.5 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm font-medium hover:border-primary-500 hover:text-primary-600 flex items-center gap-1">
                            <Plus className="h-3 w-3" /> Add
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {/* Photo Gallery */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold">Gallery</h3>
                        <Button size="sm" variant="ghost"><Plus className="h-4 w-4" /></Button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {venue.images?.map((img: any, i: number) => (
                            <div key={i} className="aspect-square rounded-lg bg-gray-100 overflow-hidden relative group">
                                <img src={typeof img === 'string' ? img : img.url} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button className="text-white hover:text-red-500"><Trash className="h-4 w-4" /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Rules */}
                <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <h3 className="font-bold mb-4">Venue Rules</h3>
                    <ul className="space-y-3">
                        {venue.rules?.map((rule: string, i: number) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                                <div className="h-1.5 w-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                {rule}
                            </li>
                        ))}
                        {(!venue.rules || venue.rules.length === 0) && (
                            <p className="text-xs text-gray-400 italic">No rules specified</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function ScheduleTab({ venue, onRefresh }: { venue: any, onRefresh: () => void }) {
    const [selectedCourt, setSelectedCourt] = useState<any>(null);
    const [isAddingCourt, setIsAddingCourt] = useState(false);
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const { toast } = useToast();
    const [courts, setCourts] = useState<any[]>(venue.courts || []);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setCourts(venue.courts || []);
    }, [venue.courts]);

    const handleAddCourt = async (data: any) => {
        setIsLoading(true);
        try {
            await venueService.createOwnerCourt({ ...data, venueId: venue.id });
            toast({ title: "Success", description: "Court added successfully" });
            onRefresh();
        } catch (error) {
            toast({ title: "Error", description: "Failed to add court", variant: "destructive" });
        } finally {
            setIsLoading(false);
            setIsAddingCourt(false);
        }
    };

    const handleDeleteCourt = async (id: string) => {
        if (!confirm('Are you sure you want to delete this court?')) return;
        try {
            await venueService.deleteOwnerCourt(id);
            toast({ title: "Success", description: "Court deleted successfully" });
            onRefresh();
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete court", variant: "destructive" });
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {/* Courts List */}
            <div className="lg:col-span-1 space-y-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-lg">Courts List</h3>
                    <Button size="sm" onClick={() => setIsAddingCourt(true)}>
                        <Plus className="h-4 w-4 mr-2" /> Add Court
                    </Button>
                </div>
                <div className="space-y-3">
                    {courts.map((court) => (
                        <div
                            key={court.id}
                            onClick={() => setSelectedCourt(court)}
                            className={cn(
                                "p-4 rounded-xl border transition-all cursor-pointer group",
                                selectedCourt?.id === court.id
                                    ? "bg-primary-50 border-primary-200 shadow-sm"
                                    : "bg-white border-gray-100 hover:border-primary-200 dark:bg-gray-900 dark:border-gray-800"
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-bold text-gray-900 dark:text-white uppercase">{court.name}</p>
                                    <p className="text-xs text-gray-500">{court.sportType} • {court.isIndoor ? 'Indoor' : 'Outdoor'}</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleDeleteCourt(court.id); }}
                                    className="p-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-primary-600">
                                    {new Intl.NumberFormat('vi-VN').format(court.pricePerHour)}đ <span className="text-[10px] text-gray-400 font-normal">/hour</span>
                                </span>
                                <Badge variant={court.isActive ? "default" : "secondary"} className="text-[10px]">
                                    {court.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>
                        </div>
                    ))}
                    {courts.length === 0 && (
                        <div className="p-8 text-center border-2 border-dashed border-gray-100 rounded-2xl dark:border-gray-800">
                            <p className="text-gray-400 text-sm">No courts added yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Pricing & Availability Panel */}
            <div className="lg:col-span-2">
                {selectedCourt ? (
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="font-bold text-xl uppercase">{selectedCourt.name} - Pricing Configuration</h3>
                                    <p className="text-sm text-gray-500">Manage standard and peak hour pricing for this court.</p>
                                </div>
                                <Button onClick={() => setIsEditingPrice(true)}>
                                    <Edit className="h-4 w-4 mr-2" /> Edit Pricing
                                </Button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30">
                                            <Save className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-bold">Base Price</h4>
                                    </div>
                                    <p className="text-3xl font-bold text-primary-600 uppercase">
                                        {new Intl.NumberFormat('vi-VN').format(selectedCourt.pricePerHour)}đ
                                        <span className="text-sm text-gray-400 font-normal ml-2">/ hour</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">Applied to all standard time slots</p>
                                </div>

                                <div className="p-5 rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2 rounded-lg bg-orange-100 text-orange-600 dark:bg-orange-900/30">
                                            <Star className="h-5 w-5" />
                                        </div>
                                        <h4 className="font-bold">Peak Pricing</h4>
                                    </div>
                                    <p className="text-3xl font-bold text-orange-600 uppercase">
                                        {selectedCourt.pricingRules?.length > 0 ? (
                                            `${new Intl.NumberFormat('vi-VN').format(selectedCourt.pricingRules[0].price)}đ`
                                        ) : 'None'}
                                        <span className="text-sm text-gray-400 font-normal ml-2">/ hour</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">Scheduled pricing for special hours</p>
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-bold mb-4 flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-primary-600" /> Operating Status
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                                        <Badge key={day} variant="outline" className="px-4 py-1.5 bg-white dark:bg-gray-800 uppercase font-bold text-[10px] tracking-widest border-2 border-primary-100 text-primary-700">
                                            {day}: {venue.openingTime.slice(0, 5)} - {venue.closingTime.slice(0, 5)}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Advanced Pricing Rules (Placeholder for now) */}
                        <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                            <h3 className="font-bold text-lg mb-4">Pricing Rules</h3>
                            <div className="space-y-3">
                                {selectedCourt.pricingRules?.map((rule: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-gray-50 dark:border-gray-800">
                                        <div className="flex items-center gap-4">
                                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold uppercase">{rule.dayOfWeek?.slice(0, 3)}</div>
                                            <div>
                                                <p className="text-sm font-bold uppercase tracking-tight">{rule.startTime.slice(0, 5)} - {rule.endTime.slice(0, 5)}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{rule.dayOfWeek || 'All Days'}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-primary-600">{new Intl.NumberFormat('vi-VN').format(rule.price)}đ</p>
                                    </div>
                                ))}
                                {(selectedCourt.pricingRules?.length || 0) === 0 && (
                                    <div className="text-center py-6">
                                        <p className="text-sm text-gray-400 italic">No custom pricing rules defined.</p>
                                    </div>
                                )}
                                <Button variant="outline" className="w-full border-dashed border-2 hover:border-primary-500 hover:text-primary-600" onClick={() => setIsEditingPrice(true)}>
                                    <Plus className="h-4 w-4 mr-2" /> Define New Peak Hours
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center p-12 text-center rounded-3xl bg-gray-50/50 border border-dashed border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
                        <CalendarIcon className="h-16 w-16 text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">Select a court</h3>
                        <p className="text-gray-500 max-w-xs mt-2 font-medium">Please select a court from the list on the left to manage its specific availability and pricing.</p>
                    </div>
                )}
            </div>

            {/* Modals placeholders */}
            {isAddingCourt && (
                <CourtFormModal
                    onClose={() => setIsAddingCourt(false)}
                    onSubmit={handleAddCourt}
                    isLoading={isLoading}
                />
            )}
            {isEditingPrice && selectedCourt && (
                <PricingRulesModal
                    court={selectedCourt}
                    onClose={() => setIsEditingPrice(false)}
                    onSubmit={async (rules: any[]) => {
                        try {
                            await venueService.updateCourtPricingRules(selectedCourt.id, rules);
                            toast({ title: "Success", description: "Pricing rules updated" });
                            onRefresh();
                        } catch (error) {
                            toast({ title: "Error", description: "Failed to update pricing" });
                        } finally {
                            setIsEditingPrice(false);
                        }
                    }}
                />
            )}
        </div>
    )
}

function CourtFormModal({ onClose, onSubmit, isLoading }: any) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [sportType, setSportType] = useState('BADMINTON');

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold uppercase tracking-tight">New Court</h3>
                            <p className="text-sm text-gray-500">Add a new court to your venue.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors uppercase"><X className="h-6 w-6" /></button>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest pl-1">Court Name</label>
                            <input
                                className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 font-bold uppercase"
                                placeholder="e.g. Court #1"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest pl-1">Standard Price (vnđ/h)</label>
                            <input
                                className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 font-bold text-primary-600"
                                type="number"
                                placeholder="80000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest pl-1">Sport Type</label>
                            <select
                                className="w-full h-12 border border-gray-200 rounded-xl px-4 text-sm bg-gray-50 focus:ring-2 focus:ring-primary-500 outline-none transition-all dark:bg-gray-800 dark:border-gray-700 font-bold uppercase"
                                value={sportType}
                                onChange={(e) => setSportType(e.target.value)}
                            >
                                <option value="SOCCER">Soccer</option>
                                <option value="TENIS">Tenis</option>
                                <option value="BADMINTON">Badminton</option>
                                <option value="BASKETBALL">Basketball</option>
                            </select>
                        </div>

                        <Button
                            className="w-full h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl text-lg font-bold shadow-xl shadow-primary-500/20 mt-4 transition-all"
                            onClick={() => onSubmit({ name, pricePerHour: Number(price), sportType })}
                            isLoading={isLoading}
                        >
                            Save Court
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PricingRulesModal({ court, onClose, onSubmit }: any) {
    const [rules, setRules] = useState<any[]>(court.pricingRules || []);

    const addRule = () => {
        setRules([...rules, { startTime: '17:00:00', endTime: '22:00:00', price: court.pricePerHour * 1.5, dayOfWeek: null }]);
    };

    const updateRule = (index: number, field: string, value: any) => {
        const newRules = [...rules];
        newRules[index] = { ...newRules[index], [field]: value };
        setRules(newRules);
    };

    const removeRule = (index: number) => {
        setRules(rules.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/20">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-2xl font-bold uppercase tracking-tight">Peak Hour Rules</h3>
                            <p className="text-sm text-gray-500">Configure special pricing for specific time ranges.</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full dark:hover:bg-gray-800 transition-colors uppercase"><X className="h-6 w-6" /></button>
                    </div>

                    <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
                        {rules.map((rule, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 dark:bg-gray-800 dark:border-gray-700 flex flex-wrap items-end gap-3 transition-all hover:border-primary-200">
                                <div className="space-y-1 flex-1 min-w-[120px]">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Day</label>
                                    <select
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold uppercase"
                                        value={rule.dayOfWeek || ''}
                                        onChange={(e) => updateRule(i, 'dayOfWeek', e.target.value || null)}
                                    >
                                        <option value="">All Days</option>
                                        <option value="MONDAY">Monday</option>
                                        <option value="TUESDAY">Tuesday</option>
                                        <option value="WEDNESDAY">Wednesday</option>
                                        <option value="THURSDAY">Thursday</option>
                                        <option value="FRIDAY">Friday</option>
                                        <option value="SATURDAY">Saturday</option>
                                        <option value="SUNDAY">Sunday</option>
                                    </select>
                                </div>
                                <div className="space-y-1 w-28">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Start</label>
                                    <input
                                        type="time"
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold"
                                        value={rule.startTime.slice(0, 5)}
                                        onChange={(e) => updateRule(i, 'startTime', `${e.target.value}:00`)}
                                    />
                                </div>
                                <div className="space-y-1 w-28">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">End</label>
                                    <input
                                        type="time"
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold"
                                        value={rule.endTime.slice(0, 5)}
                                        onChange={(e) => updateRule(i, 'endTime', `${e.target.value}:00`)}
                                    />
                                </div>
                                <div className="space-y-1 w-32">
                                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">Price (vnđ/h)</label>
                                    <input
                                        type="number"
                                        className="w-full h-10 border border-gray-200 rounded-xl px-2 text-xs bg-white dark:bg-gray-900 dark:border-gray-700 font-bold text-primary-600"
                                        value={rule.price}
                                        onChange={(e) => updateRule(i, 'price', Number(e.target.value))}
                                    />
                                </div>
                                <button onClick={() => removeRule(i)} className="mb-1 p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-all"><Trash className="h-4 w-4" /></button>
                            </div>
                        ))}

                        <Button variant="outline" className="w-full h-12 border-dashed border-2 rounded-2xl" onClick={addRule}>
                            <Plus className="h-4 w-4 mr-2" /> Add Rule
                        </Button>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <Button variant="outline" className="flex-1 h-12 rounded-xl uppercase font-bold text-xs" onClick={onClose}>Cancel</Button>
                        <Button className="flex-1 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-xl uppercase font-bold text-xs shadow-lg shadow-primary-500/20" onClick={() => onSubmit(rules)}>Save Changes</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BookingsTab() {
    return (
        <div className="p-8 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm flex flex-col items-center justify-center py-20">
            <CalendarIcon className="h-16 w-16 text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Calendar Integration</h3>
            <p className="text-gray-500 text-center max-w-md mt-2">
                Your Google Calendar style booking view is loading... <br />
                Integrate FullCalendar here for drag-and-drop management.
            </p>
            <Button className="mt-8">View Booking List</Button>
        </div>
    )
}

function ReviewsTab() {
    return (
        <div className="max-w-3xl space-y-6">
            {MOCK_REVIEWS.map((review: any) => (
                <div key={review.id} className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500">
                                {review.customer[0]}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">{review.customer}</h4>
                                <div className="flex items-center gap-1 text-yellow-500 text-xs mt-0.5">
                                    {[...Array(review.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                                </div>
                            </div>
                        </div>
                        <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic">"{review.comment}"</p>
                    <div className="mt-4 flex gap-3">
                        <Button size="sm" variant="outline" className="text-xs">Reply</Button>
                        <Button size="sm" variant="ghost" className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50">Report</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function StatsTab() {
    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold mb-4">Revenue Breakdown</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <span className="text-xs text-gray-400">Bar Chart Placeholder</span>
                </div>
            </div>
            <div className="p-6 rounded-2xl bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold mb-4">Booking Hours Heatmap</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <span className="text-xs text-gray-400">Heatmap Placeholder</span>
                </div>
            </div>
        </div>
    )
}
