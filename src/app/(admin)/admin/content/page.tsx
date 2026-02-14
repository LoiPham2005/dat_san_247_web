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
import axiosInstance from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/endpoints';
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function ContentPage() {
    const [activeTab, setActiveTab] = useState('banners');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBanner, setEditingBanner] = useState<any>(null);
    const [editingBlog, setEditingBlog] = useState<any>(null);
    const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
    const [editingEmail, setEditingEmail] = useState<any>(null);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
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
        } else if (activeTab === 'blog') {
            setEditingBlog(null);
            setIsBlogModalOpen(true);
        } else if (activeTab === 'email') {
            setEditingEmail(null);
            setIsEmailModalOpen(true);
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
                {activeTab === 'blog' && <BlogSection onEdit={(post) => {
                    setEditingBlog(post);
                    setIsBlogModalOpen(true);
                }} />}
                {activeTab === 'email' && <EmailSection onEdit={(template) => {
                    setEditingEmail(template);
                    setIsEmailModalOpen(true);
                }} />}
                {activeTab === 'push' && <PushSection />}
            </div>

            <BannerModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                banner={editingBanner}
            />

            <BlogModal
                isOpen={isBlogModalOpen}
                onClose={() => setIsBlogModalOpen(false)}
                post={editingBlog}
            />

            <EmailModal
                isOpen={isEmailModalOpen}
                onClose={() => setIsEmailModalOpen(false)}
                template={editingEmail}
            />
        </div>
    );
}

function BannerSection({ onEdit }: { onEdit: (banner: any) => void }) {
    const { useBannersQuery, deleteBannerMutation } = useContent();
    const { data: banners, isLoading } = useBannersQuery();
    const { toast } = useToast();

    if (banners) {
        console.log('🖼️ [BannerDebug] Raw Banners Data:', banners);
        if (Array.isArray(banners)) {
            banners.forEach((b, index) => {
                console.log(`   🔸 Banner [${index}] ID: ${b.id}`);
                console.log(`      - ImageURL: ${b.imageUrl}`);
                console.log(`      - MobileImage: ${b.mobileImageUrl}`);
                console.log(`      - Type: ${b.type}`);
            });
        }
    }

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteBannerMutation.mutateAsync(deleteId);
            toast({ title: 'Success', description: 'Banner deleted successfully', className: 'bg-green-600 text-white border-none' });
            setDeleteId(null);
        } catch (err) {
            toast({ title: 'Error', description: 'Failed to delete banner', variant: 'destructive' });
        }
    };

    if (isLoading) {
        return (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-[250px] animate-pulse bg-gray-100 dark:bg-gray-800 rounded-2xl" />
                ))}
            </div>
        );
    }

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

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Banner"
                description="Are you sure you want to delete this banner? This action cannot be undone."
                isLoading={deleteBannerMutation.isPending}
            />
        </div>
    )
}

function BannerModal({ isOpen, onClose, banner }: { isOpen: boolean, onClose: () => void, banner?: any }) {
    const { createBannerMutation, updateBannerMutation } = useContent();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [mobileFile, setMobileFile] = useState<File | null>(null);

    // Reset file states when modal opens/closes or banner changes
    useEffect(() => {
        setFile(null);
        setMobileFile(null);
    }, [isOpen, banner]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        // Explicitly set files if they exist in state (handles potential input value issues)
        if (file) formData.set('image', file);
        if (mobileFile) formData.set('mobileImage', mobileFile);

        const filteredData = new FormData();
        formData.forEach((value, key) => {
            if (value !== '') filteredData.append(key, value);
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
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="p-6 pb-2">
                    <DialogTitle className="text-xl">{banner ? 'Edit Banner' : 'Create New Banner'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
                        <div className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input id="title" name="title" defaultValue={banner?.content?.title} required className="bg-gray-50/50" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Description (Optional)</Label>
                                <Textarea id="description" name="description" defaultValue={banner?.content?.description} className="resize-none bg-gray-50/50" />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
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
                            <div className="space-y-4">
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
                        </div>

                        {/* Image Data Section */}
                        <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Media Assets</h4>

                            {/* Desktop Image */}
                            <div className="grid gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="image" className="text-base font-medium">Desktop Image (16:9)</Label>
                                    <span className="text-xs text-gray-500">{banner ? '(Keep empty to preserve)' : '(Required)'}</span>
                                </div>

                                {banner?.imageUrl && !file && (
                                    <div className="flex items-start gap-4 p-3 bg-white dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm group">
                                        <div className="h-16 w-28 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                                            <img src={banner.imageUrl} alt="Current" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Image</p>
                                            <a href={banner.imageUrl} target="_blank" rel="noopener" className="text-[10px] text-blue-500 hover:text-blue-600 hover:underline truncate block w-full">
                                                {banner.imageUrl}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <Input
                                    id="image"
                                    type="file"
                                    accept="image/*"
                                    className="bg-white dark:bg-gray-950"
                                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                                    required={!banner}
                                />
                            </div>

                            {/* Mobile Image */}
                            <div className="grid gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
                                <div className="flex justify-between items-center">
                                    <Label htmlFor="mobileImage" className="text-base font-medium">Mobile Image (9:16)</Label>
                                    <span className="text-xs text-gray-500">(Optional)</span>
                                </div>

                                {banner?.mobileImageUrl && !mobileFile && (
                                    <div className="flex items-start gap-4 p-3 bg-white dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800 shadow-sm">
                                        <div className="h-16 w-10 bg-gray-100 rounded-md overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                                            <img src={banner.mobileImageUrl} alt="Current Mobile" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0 overflow-hidden">
                                            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">Current Mobile Image</p>
                                            <a href={banner.mobileImageUrl} target="_blank" rel="noopener" className="text-[10px] text-blue-500 hover:text-blue-600 hover:underline truncate block w-full">
                                                {banner.mobileImageUrl}
                                            </a>
                                        </div>
                                    </div>
                                )}

                                <Input
                                    id="mobileImage"
                                    type="file"
                                    accept="image/*"
                                    className="bg-white dark:bg-gray-950"
                                    onChange={(e) => setMobileFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-2 border-t border-gray-100 dark:border-gray-800">
                            <div className="grid gap-2">
                                <Label htmlFor="startDate">Start Date</Label>
                                <Input id="startDate" name="startDate" type="date" defaultValue={banner?.startDate ? new Date(banner.startDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]} required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="endDate">End Date</Label>
                                <Input id="endDate" name="endDate" type="date" defaultValue={banner?.endDate ? new Date(banner.endDate).toISOString().split('T')[0] : ''} />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="actionUrl">Action URL</Label>
                            <Input id="actionUrl" name="actionUrl" placeholder="https://..." defaultValue={banner?.actionUrl} />
                            <input type="hidden" name="actionType" value="LINK" />
                        </div>
                    </div>

                    <DialogFooter className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 mt-auto">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : banner ? 'Save Changes' : 'Create Banner'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function BlogSection({ onEdit }: { onEdit: (post: any) => void }) {
    const { useBlogsQuery, deleteBlogMutation } = useContent();
    const { data: posts, isLoading } = useBlogsQuery();
    const { toast } = useToast();

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeleteId(id);
    }

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteBlogMutation.mutateAsync(deleteId);
            toast({ title: 'Deleted', description: 'Blog post has been removed.', className: 'bg-green-600 text-white border-none' });
            setDeleteId(null);
        } catch (err) {
            toast({ title: 'Error', variant: 'destructive' });
        }
    }

    if (isLoading) {
        return <div className="space-y-4">{[1, 2, 3].map(i => <div key={i} className="h-24 animate-pulse bg-gray-100 rounded-2xl" />)}</div>
    }

    const postList = Array.isArray(posts) ? posts : [];

    return (
        <div className="space-y-4">
            {postList.map((post: any) => (
                <div key={post.id} className="flex items-center gap-6 p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary-500 transition-all dark:border-gray-800 dark:bg-gray-900 shadow-sm group">
                    <div className="h-20 w-32 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-50 dark:border-gray-800">
                        {post.content?.thumbnailUrl ? (
                            <img src={post.content.thumbnailUrl} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <ImageIcon className="h-6 w-6" />
                            </div>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <Badge variant="info" className="uppercase text-[9px]">{post.category}</Badge>
                            <span className="text-[11px] text-gray-400">
                                {post.content?.status} • {formatDate(post.publishedAt || post.createdAt)}
                            </span>
                        </div>
                        <h4 className="font-bold text-gray-900 dark:text-white truncate">{post.content?.title}</h4>
                        <div className="mt-2 flex items-center gap-4 text-xs text-gray-500 font-medium">
                            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readingTime} min read</span>
                            <span className="flex items-center gap-1 font-bold text-primary-600">By {post.author}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="sm" onClick={() => onEdit(post)}>
                            <Edit3 className="h-4 w-4 mr-2" /> Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => handleDelete(post.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            ))}

            {postList.length === 0 && (
                <div className="py-12 text-center text-gray-500">No blog posts found.</div>
            )}

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Blog Post"
                description="Are you sure you want to delete this post? This action cannot be undone."
                isLoading={deleteBlogMutation.isPending}
            />
        </div>
    )
}

function BlogModal({ isOpen, onClose, post }: { isOpen: boolean, onClose: () => void, post?: any }) {
    const { createBlogMutation, updateBlogMutation } = useContent();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [thumbnail, setThumbnail] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        if (thumbnail) formData.append('thumbnail', thumbnail);

        try {
            if (post) {
                await updateBlogMutation.mutateAsync({ id: post.id, formData });
                toast({ title: 'Blog updated' });
            } else {
                await createBlogMutation.mutateAsync(formData);
                toast({ title: 'Blog created' });
            }
            onClose();
        } catch (error) {
            toast({ title: 'Error', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{post ? 'Edit Post' : 'Create New Post'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input name="title" defaultValue={post?.content?.title} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Category</Label>
                                <Select
                                    name="category"
                                    defaultValue={post?.category || 'NEWS'}
                                    options={[
                                        { value: 'NEWS', label: 'News' },
                                        { value: 'GUIDE', label: 'Guide' },
                                        { value: 'HEALTH', label: 'Health' },
                                        { value: 'SPORT', label: 'Sport' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Input name="description" defaultValue={post?.content?.description} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Full Content (Markdown/HTML Support)</Label>
                            <Textarea name="content" className="min-h-[200px]" defaultValue={post?.content?.content} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Author Name</Label>
                                <Input name="author" defaultValue={post?.author || 'Admin'} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Reading Time (min)</Label>
                                <Input name="readingTime" type="number" defaultValue={post?.readingTime || 5} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Thumbnail</Label>
                                <Input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files?.[0] || null)} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Status</Label>
                                <Select
                                    name="status"
                                    defaultValue={post?.content?.status || 'PUBLISHED'}
                                    options={[
                                        { value: 'PUBLISHED', label: 'Published' },
                                        { value: 'DRAFT', label: 'Draft' },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Post'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function EmailSection({ onEdit }: { onEdit: (template: any) => void }) {
    const { useEmailTemplatesQuery, deleteEmailTemplateMutation } = useContent();
    const { data: templates, isLoading } = useEmailTemplatesQuery();
    const { toast } = useToast();

    const [deleteId, setDeleteId] = useState<string | null>(null);

    const handleDelete = (id: string) => {
        setDeleteId(id);
    }

    const confirmDelete = async () => {
        if (!deleteId) return;
        try {
            await deleteEmailTemplateMutation.mutateAsync(deleteId);
            toast({ title: 'Deleted', description: 'Template has been removed.', className: 'bg-green-600 text-white border-none' });
            setDeleteId(null);
        } catch (err) {
            toast({ title: 'Error', variant: 'destructive' });
        }
    }

    if (isLoading) return <div className="grid gap-6 md:grid-cols-4">{[1, 2, 3].map(i => <div key={i} className="h-48 animate-pulse bg-gray-100 rounded-2xl" />)}</div>

    const handleSendTest = async (id: string) => {
        const email = prompt('Enter email address to send test:');
        if (!email) return;

        try {
            await axiosInstance.post(API_ENDPOINTS.EMAIL_TEMPLATE_BY_ID(id) + '/send-test', { email });
            toast({ title: 'Test email sent!' });
        } catch (err) {
            toast({ title: 'Failed to send test email', variant: 'destructive' });
        }
    }

    const templateList = Array.isArray(templates) ? templates : [];

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {templateList.map((template: any) => (
                <div key={template.id} className="p-6 rounded-2xl border border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-900 shadow-sm group relative overflow-hidden">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-4 dark:bg-primary-900/20">
                        <Mail className="h-6 w-6" />
                    </div>
                    <Badge className="absolute top-4 right-4 bg-gray-50 text-gray-500 font-bold border-none text-[8px] tracking-widest uppercase">
                        {template.templateType}
                    </Badge>
                    <h4 className="font-bold text-sm mb-1 truncate">{template.templateName}</h4>
                    <p className="text-[10px] text-gray-400 mb-4 truncate italic">{template.subject}</p>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm" className="w-full text-xs font-black uppercase tracking-widest" onClick={() => onEdit(template)}>
                            <Edit3 className="mr-2 h-3 w-3" /> Edit Template
                        </Button>
                        <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="flex-1 text-[10px] text-primary-600 font-bold uppercase" onClick={() => handleSendTest(template.id)}>
                                Send Test
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1 text-[10px] text-red-500 hover:text-red-600 font-bold uppercase" onClick={() => handleDelete(template.id)}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            {templateList.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500">No email templates found.</div>
            )}

            <ConfirmDialog
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={confirmDelete}
                title="Delete Template"
                description="Are you sure you want to delete this email template?"
                isLoading={deleteEmailTemplateMutation.isPending}
            />
        </div>
    )
}

function EmailModal({ isOpen, onClose, template }: { isOpen: boolean, onClose: () => void, template?: any }) {
    const { createEmailTemplateMutation, updateEmailTemplateMutation } = useContent();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            if (template) {
                await updateEmailTemplateMutation.mutateAsync({ id: template.id, payload: data });
                toast({ title: 'Template updated' });
            } else {
                await createEmailTemplateMutation.mutateAsync(data);
                toast({ title: 'Template created' });
            }
            onClose();
        } catch (error) {
            toast({ title: 'Error', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{template ? 'Edit Template' : 'Create New Template'}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-1">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Internal Title</Label>
                                <Input name="title" defaultValue={template?.content?.title} placeholder="e.g. Welcome Email Admin" required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Template Key</Label>
                                <Input name="templateName" defaultValue={template?.templateName} placeholder="WELCOME_USER" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>Subject Line</Label>
                                <Input name="subject" defaultValue={template?.subject} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>Template Type</Label>
                                <Select
                                    name="templateType"
                                    defaultValue={template?.templateType || 'CUSTOM'}
                                    options={[
                                        { value: 'WELCOME', label: 'Welcome' },
                                        { value: 'BOOKING_CONFIRMATION', label: 'Booking Confirmation' },
                                        { value: 'BOOKING_REMINDER', label: 'Booking Reminder' },
                                        { value: 'PAYMENT_RECEIPT', label: 'Payment Receipt' },
                                        { value: 'PASSWORD_RESET', label: 'Password Reset' },
                                        { value: 'PROMOTION', label: 'Promotion' },
                                        { value: 'NEWSLETTER', label: 'Newsletter' },
                                        { value: 'TRANSACTIONAL', label: 'Transactional' },
                                        { value: 'MARKETING', label: 'Marketing' },
                                        { value: 'SYSTEM', label: 'System' },
                                        { value: 'CUSTOM', label: 'Custom' },
                                    ]}
                                />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>HTML Content</Label>
                            <Textarea name="htmlContent" className="min-h-[300px] font-mono text-xs" defaultValue={template?.htmlContent} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label>From Name</Label>
                                <Input name="fromName" defaultValue={template?.fromName || 'DatSan247'} required />
                            </div>
                            <div className="grid gap-2">
                                <Label>From Email</Label>
                                <Input name="fromEmail" type="email" defaultValue={template?.fromEmail || 'hello@datsan247.com'} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label>Preheader (Optional)</Label>
                            <Input name="preheader" defaultValue={template?.preheader} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Template'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
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

