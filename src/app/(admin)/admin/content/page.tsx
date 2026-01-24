'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
    Image as ImageIcon,
    FileText,
    Mail,
    Bell,
    Plus,
    Search,
    MoreHorizontal,
    Upload,
    ExternalLink,
    Clock,
    CheckCircle2,
    Trash2,
    Edit3
} from "lucide-react";
import { cn, formatDate } from "@/lib/utils/format";
import { Badge } from "@/components/ui/badge";
import { useContent } from '@/lib/hooks/useContent';
import { useContentStore } from '@/lib/store/content.store';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from '@/components/ui/textarea';

export default function ContentPage() {
    const [activeTab, setActiveTab] = useState('banners');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const tabs = [
        { id: 'banners', label: 'Banners', icon: ImageIcon },
        { id: 'blog', label: 'Blog Posts', icon: FileText },
        { id: 'email', label: 'Email Templates', icon: Mail },
        { id: 'push', label: 'Push Notifications', icon: Bell },
    ];

    const handleNewClick = () => {
        if (activeTab === 'banners') {
            setEditingBanner(null);
            setIsModalOpen(true);
        }
    };

    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Content Management
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage media, articles, and automated communications.
                    </p>
                </div>
                <Button onClick={handleNewClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    New {activeTab === 'banners' ? 'Banner' : activeTab === 'blog' ? 'Post' : activeTab === 'email' ? 'Template' : 'Notification'}
                </Button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 border-b border-gray-100 dark:border-gray-800 p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
                            activeTab === tab.id
                                ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400"
                                : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        )}
                    >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Rendering */}
            <div className="min-h-[400px]">
                {activeTab === 'banners' && <BannerSection onEdit={(banner) => {
                    setEditingBanner(banner);
                    setIsModalOpen(true);
                }} />}
                {activeTab === 'blog' && <BlogSection />}
                {activeTab === 'email' && <EmailSection />}
                {activeTab === 'push' && <PushSection />}
            </div>

            <BannerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                banner={editingBanner}
            />
        </div>
    );
}

function BannerSection({ onEdit }: { onEdit: (banner: any) => void }) {
    const { useBannersQuery, deleteBannerMutation } = useContent();
    const { data: banners, isLoading } = useBannersQuery();
    const { toast } = useToast();

    if (isLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[250px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                ))}
            </div>
        );
    }

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this banner?')) {
            try {
                await deleteBannerMutation.mutateAsync(id);
                toast({ title: 'Success', description: 'Banner deleted successfully' });
            } catch (err) {
                toast({ title: 'Error', description: 'Failed to delete banner', variant: 'destructive' });
            }
        }
    };

    const bannerList = Array.isArray(banners) ? banners : [];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bannerList.map((banner: any) => (
                <div key={banner.id} className="group relative rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <div className="aspect-[16/9] w-full bg-gray-100 overflow-hidden relative">
                        <img
                            src={banner.imageUrl}
                            alt={banner.content?.title || 'Banner'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                className="text-white border-white bg-transparent hover:bg-white hover:text-black"
                                onClick={() => onEdit(banner)}
                            >
                                <Edit3 className="mr-2 h-4 w-4" />
                                Edit
                            </Button>
                            <Button
                                size="sm"
                                variant="destructive"
                                className="bg-red-500/80 hover:bg-red-600"
                                onClick={() => handleDelete(banner.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-sm truncate flex-1 mr-2">{banner.content?.title}</h4>
                            <Badge variant={banner.content?.status === 'PUBLISHED' ? 'success' : 'outline'}>
                                {banner.content?.status}
                            </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 truncate">
                            {banner.actionType}: {banner.actionUrl || banner.actionVenueId || 'N/A'}
                        </p>
                        <div className="flex items-center justify-between text-[11px] text-gray-400">
                            <span>Pos: {banner.position} | Order: {banner.displayOrder}</span>
                            <span suppressHydrationWarning>{formatDate(banner.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            ))}

            {bannerList.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">
                    No banners found. Click "New Banner" to create one.
                </div>
            )}
        </div>
    )
}

function BannerModal({ isOpen, onClose, banner }: { isOpen: boolean, onClose: () => void, banner?: any }) {
    const { createBannerMutation, updateBannerMutation } = useContent();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [mobileFile, setMobileFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        // Ensure files are appended manually if state managed, or just rely on native name if not
        if (file) formData.set('image', file);
        if (mobileFile) formData.set('mobileImage', mobileFile);

        // Filter out empty strings from the FormData to avoid DTO validation errors (like for endDate)
        const filteredData = new FormData();
        formData.forEach((value, key) => {
            if (value !== '') {
                filteredData.append(key, value);
            }
        });

        try {
            if (banner) {
                await updateBannerMutation.mutateAsync({ id: banner.id, formData: filteredData });
                toast({ title: 'Success', description: 'Banner updated successfully' });
            } else {
                await createBannerMutation.mutateAsync(filteredData);
                toast({ title: 'Success', description: 'Banner created successfully' });
            }
            onClose();
        } catch (error) {
            toast({ title: 'Error', description: 'Action failed', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{banner ? 'Edit Banner' : 'Create New Banner'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" defaultValue={banner?.content?.title} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" defaultValue={banner?.content?.description} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Position</Label>
                                <Select
                                    name="position"
                                    defaultValue={banner?.position || 'HOME_HERO'}
                                    options={[
                                        { value: 'HOME_HERO', label: 'Home Hero' },
                                        { value: 'HOME_MIDDLE', label: 'Home Middle' },
                                        { value: 'VENUE_LIST', label: 'Venue List' },
                                    ]}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="displayOrder">Display Order</Label>
                                <Input id="displayOrder" name="displayOrder" type="number" defaultValue={banner?.displayOrder || 0} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Content Type</Label>
                                <Select
                                    name="type"
                                    defaultValue={banner?.type || 'IMAGE'}
                                    options={[
                                        { value: 'IMAGE', label: 'Image' },
                                        { value: 'VIDEO', label: 'Video' },
                                    ]}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select
                                    name="status"
                                    defaultValue={banner?.content?.status || 'PUBLISHED'}
                                    options={[
                                        { value: 'PUBLISHED', label: 'Published' },
                                        { value: 'DRAFT', label: 'Draft' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="image">Desktop Image (16:9) {banner && '(Optional)'}</Label>
                            <Input
                                id="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                required={!banner}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="mobileImage">Mobile Image (9:16) (Optional)</Label>
                            <Input
                                id="mobileImage"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setMobileFile(e.target.files?.[0] || null)}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input id="startDate" name="startDate" type="date" defaultValue={banner?.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="endDate">End Date (Optional)</Label>
                                <Input id="endDate" name="endDate" type="date" defaultValue={banner?.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : ''} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="actionUrl">Action URL</Label>
                            <Input id="actionUrl" name="actionUrl" placeholder="https://..." defaultValue={banner?.actionUrl} />
                            <input type="hidden" name="actionType" value="LINK" />
                        </div>
                    </div>
                    <DialogFooter className="mt-4">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Banner'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function BlogSection() {
    return (
        <div className="space-y-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-6 p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary-500 transition-all dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                    <div className="h-20 w-32 rounded-lg bg-gray-100 overflow-hidden shrink-0">
                        <img src={`https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop&q=60&index=${i}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="info">Sport</Badge>
                            <span className="text-[11px] text-gray-400">Published 5 hours ago</span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white">Top {i * 3} Soccer Fields in Ho Chi Minh City 2024</h4>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><ExternalLink className="h-3 w-3" /> {i * 400} views</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 5 min read</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm">Actions</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function EmailSection() {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {['Welcome Email', 'Booking Confirmation', 'Password Reset', 'Marketing Monthly'].map((name, i) => (
                <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm group">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-4 dark:bg-primary-900/20">
                        <Mail className="h-6 w-6" />
                    </div>
                    <h4 className="font-bold text-sm mb-1">{name}</h4>
                    <p className="text-xs text-gray-500 mb-4">Last update: Mar 20, 2024</p>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="w-full text-xs">Edit Template</Button>
                        <Button variant="ghost" size="sm" className="w-full text-[10px] text-gray-400">Send Test</Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

function PushSection() {
    return (
        <div className="max-w-3xl space-y-6">
            <div className="bg-primary-50/50 p-6 rounded-2xl border border-primary-100 dark:bg-primary-900/10 dark:border-primary-900/20">
                <h4 className="font-bold flex items-center gap-2 mb-4">
                    <Bell className="h-4 w-4" />
                    New Push Notification
                </h4>
                <div className="space-y-4">
                    <input
                        placeholder="Notification Title"
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <textarea
                        placeholder="Notification Message..."
                        rows={3}
                        className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                    />
                    <div className="flex gap-4">
                        <select className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-sm">
                            <option>All Users</option>
                            <option>Owners Only</option>
                            <option>VIP Customers</option>
                        </select>
                        <Button className="px-8">Send Now</Button>
                    </div>
                </div>
            </div>

            <h4 className="font-bold text-gray-900 dark:text-white">Recent Log</h4>
            <div className="space-y-3">
                {[1, 2].map((i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm">
                        <div>
                            <h5 className="text-sm font-semibold">Weekend Promo Alert</h5>
                            <p className="text-xs text-gray-500">Sent to 4,500 users • 2 hours ago</p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium">
                            <span className="text-green-600">65% Open</span>
                            <span className="text-blue-600">12% Click</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

