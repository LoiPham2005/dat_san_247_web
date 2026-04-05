"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useAdminNotifications } from '../hooks/useAdminNotifications';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Megaphone, Users, BellRing, Clock, Send, Trash2, Search, ChevronDown, Check, X, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { Badge } from '@/components/common/Badge';
import { Pagination } from '@/components/common/Pagination';
import { cn } from '@/lib/utils/cn';
import { adminUserApi, AdminUser } from '../api/admin-user.api';

export const AdminNotificationConsole = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('ALL');

    const { notifications, meta, isLoading, isFetching, sendNoti, isSending, deleteNoti } = useAdminNotifications({
        page,
        limit,
        search: searchTerm || undefined,
        type: typeFilter === 'ALL' ? undefined : typeFilter as any
    });
    
    // Form States
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [target, setTarget] = useState<'ALL' | 'ROLES' | 'USERS'>('ALL');
    const [roles, setRoles] = useState<string[]>([]);
    
    // User Selection States
    const [userSearch, setUserSearch] = useState('');
    const [foundUsers, setFoundUsers] = useState<AdminUser[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<AdminUser[]>([]);
    const [isSearchingUsers, setIsSearchingUsers] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsSearchingUsers(true);
            try {
                // Fetch với search rỗng để lấy danh sách "mồi" ban đầu
                const res = await adminUserApi.getUsers({ 
                    search: userSearch.trim() || undefined, 
                    limit: 20 
                });
                setFoundUsers(res.items);
                if (userSearch.trim()) {
                    setShowResults(true);
                }
            } catch (error) {
                console.error('Lỗi tìm người dùng:', error);
            } finally {
                setIsSearchingUsers(false);
            }
        };

        const timer = setTimeout(fetchUsers, userSearch.trim() ? 500 : 0);
        return () => clearTimeout(timer);
    }, [userSearch]);

    // Close user search dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleBroadcast = () => {
        if (!title.trim() || !message.trim()) return;
        
        sendNoti({ 
            target, 
            title, 
            message, 
            roles: target === 'ROLES' ? roles : undefined,
            userIds: target === 'USERS' ? selectedUsers.map(u => u.id) : undefined
        }, {
            onSuccess: () => {
                setTitle('');
                setMessage('');
                setRoles([]);
                setSelectedUsers([]);
                setPage(1);
            }
        });
    };

    const handlePageChange = (p: number) => setPage(p);
    const handleLimitChange = (l: number) => { setLimit(l); setPage(1); };

    const toggleRole = (role: string) => {
        setRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
    };

    const addTargetUser = (user: AdminUser) => {
        if (!selectedUsers.find(u => u.id === user.id)) {
            setSelectedUsers([...selectedUsers, user]);
        }
        setUserSearch('');
        setShowResults(false);
    };

    const removeTargetUser = (id: string) => {
        setSelectedUsers(selectedUsers.filter(u => u.id !== id));
    };

    const showFullLoading = isLoading && notifications.length === 0;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left: Broadcast Form */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white border text-sm border-slate-200 rounded-2xl shadow-sm p-6 lg:sticky lg:top-8">
                    <div className="space-y-5">
                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                            <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                                <Megaphone className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-800 text-base">Phát Thông Báo Mới</h3>
                                <p className="text-xs text-slate-500 font-medium">Gửi tin nhắn tức thời</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">Mục tiêu nhận tin</label>
                                <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-50 rounded-xl">
                                    {(['ALL', 'ROLES', 'USERS'] as const).map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTarget(t)}
                                            className={cn(
                                                "py-2 rounded-lg text-[10px] font-bold transition-all",
                                                target === t ? "bg-white text-primary shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-slate-100/50"
                                            )}
                                        >
                                            {t === 'ALL' ? 'Tất cả' : t === 'ROLES' ? 'Vai trò' : 'Dùng ID'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {target === 'ROLES' && (
                                <div className="space-y-2 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <div className="flex flex-wrap gap-2">
                                        {['customer', 'owner', 'staff'].map((r) => (
                                            <button
                                                key={r}
                                                onClick={() => toggleRole(r)}
                                                className={cn(
                                                    "px-3 py-1.5 rounded-full text-[10px] font-black uppercase border transition-all",
                                                    roles.includes(r) ? "bg-primary border-primary text-white shadow-sm" : "bg-white border-slate-200 text-slate-400"
                                                )}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {target === 'USERS' && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-top-1 duration-200 relative" ref={dropdownRef}>
                                    <div className="relative">
                                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                                        <Input 
                                            placeholder="Gõ email hoặc tên người dùng..." 
                                            value={userSearch}
                                            onChange={(e) => setUserSearch(e.target.value)}
                                            onFocus={() => setShowResults(true)}
                                            className="pl-9 h-9 text-xs"
                                        />
                                        {isSearchingUsers && (
                                            <div className="absolute right-3 top-2.5">
                                                <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                                            </div>
                                        )}
                                    </div>
                                    
                                    {showResults && foundUsers.length > 0 && (
                                        <div className="absolute z-50 left-0 right-0 top-10 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-150">
                                            <div className="max-h-[280px] overflow-y-auto custom-scrollbar">
                                                <div className="p-2 border-b border-slate-50 bg-slate-50/30">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Kết quả tìm kiếm</p>
                                                </div>
                                                {foundUsers.length === 0 ? (
                                                    <div className="p-8 text-center">
                                                        <Search className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                                        <p className="text-xs font-bold text-slate-400 uppercase">Không tìm thấy ai...</p>
                                                    </div>
                                                ) : foundUsers.map(user => (
                                                    <button
                                                        key={user.id}
                                                        onClick={() => addTargetUser(user)}
                                                        className="w-full px-4 py-2.5 text-left hover:bg-primary/5 flex items-center justify-between group transition-colors border-b border-slate-50 last:border-0"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 overflow-hidden ring-2 ring-white">
                                                                {user.avatar_url ? <img src={user.avatar_url} className="w-full h-full object-cover" /> : user.full_name?.charAt(0)}
                                                            </div>
                                                            <div className="flex flex-col">
                                                                <span className="text-xs font-bold text-slate-700 group-hover:text-primary transition-colors">{user.full_name}</span>
                                                                <span className="text-[10px] text-slate-400 font-medium">{user.email}</span>
                                                            </div>
                                                        </div>
                                                        <Check className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Selected Users Tags */}
                                    <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                                        {selectedUsers.length === 0 && (
                                            <div className="text-[10px] text-slate-400 italic px-1">Chưa chọn ai...</div>
                                        )}
                                        {selectedUsers.map(u => (
                                            <div key={u.id} className="flex items-center gap-1.5 pl-2 pr-1 py-1 bg-white border border-slate-200 rounded-full shadow-sm animate-in scale-90 duration-200">
                                                <span className="text-[10px] font-bold text-slate-600 truncate max-w-[100px]">{u.full_name}</span>
                                                <button 
                                                    onClick={() => removeTargetUser(u.id)}
                                                    className="w-4 h-4 bg-slate-100 text-slate-400 hover:bg-rose-500 hover:text-white rounded-full flex items-center justify-center transition-colors"
                                                >
                                                    <X className="w-2.5 h-2.5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-sans">Tiêu đề bản tin</label>
                                <Input 
                                    placeholder="Tiêu đề thông báo..." 
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    disabled={isSending}
                                    className="h-10 font-bold placeholder:font-normal"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 font-sans">Nội dung chi tiết</label>
                                <textarea 
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm min-h-[120px] outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all font-medium placeholder:font-normal"
                                    placeholder="Nội dung truyền đạt..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={isSending}
                                ></textarea>
                            </div>
                        </div>

                        <Button 
                            className="w-full h-11 bg-primary text-white rounded-xl shadow-lg shadow-primary/20 font-bold text-sm"
                            onClick={handleBroadcast}
                            disabled={isSending || !title || !message || (target === 'USERS' && selectedUsers.length === 0)}
                        >
                            {isSending ? 'Đang gửi...' : 'Phát đi Toàn Mạng Lưới'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Right: History & Control */}
            <div className="lg:col-span-3 space-y-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="relative w-full md:w-96 group">
                        <Search className={cn("absolute left-3 top-2.5 h-4 w-4 transition-colors", isFetching ? "text-primary animate-pulse" : "text-slate-400")} />
                        <Input
                            placeholder="Tìm kiếm tiêu đề, nội dung..."
                            className="pl-9 h-10 border-slate-200 bg-slate-50 focus:bg-white"
                            value={searchTerm}
                            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                        />
                    </div>
                    
                    <div className="flex gap-3 w-full md:w-auto">
                        <div className="relative w-full md:w-48">
                            <select 
                                className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 rounded-lg px-3 pr-9 text-xs focus:outline-none focus:ring-2 focus:ring-primary/10 font-bold text-slate-600 cursor-pointer shadow-sm"
                                value={typeFilter}
                                onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                            >
                                <option value="ALL">Tất cả Loại tin</option>
                                <option value="SYSTEM">Hệ thống</option>
                                <option value="PROMOTION">Khuyến mãi</option>
                                <option value="BOOKING_CONFIRMED">Đặt sân thành công</option>
                                <option value="PAYMENT_SUCCESS">Thanh toán xong</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {showFullLoading ? (
                    <div className="py-24 flex flex-col items-center justify-center gap-4">
                         <div className="animate-spin rounded-full h-10 w-10 border-4 border-primary border-t-transparent shadow-md"></div>
                         <p className="text-xs font-black text-slate-400 uppercase tracking-widest animate-pulse">Khởi tạo dữ liệu...</p>
                    </div>
                ) : (
                    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden min-h-[500px] flex flex-col">
                        <div className="flex-1 overflow-x-auto">
                            <table className="w-full text-sm text-left whitespace-nowrap">
                                <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
                                    <tr>
                                        <th className="px-6 py-4">Bản tin</th>
                                        <th className="px-6 py-4">Người nhận</th>
                                        <th className="px-6 py-4 text-center">Trạng thái</th>
                                        <th className="px-6 py-4 text-right">Tác vụ</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {notifications.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-20 text-center">
                                                <div className="flex flex-col items-center text-slate-300">
                                                    <Megaphone className="w-12 h-12 mb-3 opacity-20" />
                                                    <p className="text-sm font-bold uppercase tracking-widest">Không tìm thấy thông báo</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : notifications.map((noti: any) => (
                                        <tr key={noti.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 max-w-sm whitespace-normal">
                                                    <span className="font-bold text-slate-800 line-clamp-1">{noti.title}</span>
                                                    <span className="text-xs text-slate-400 line-clamp-1 font-medium italic">"{noti.message}"</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="text-[10px] uppercase h-5 text-slate-500 border-slate-200">
                                                            {noti.type}
                                                        </Badge>
                                                        <span className="flex items-center gap-1 text-[10px] text-slate-300 font-medium italic">
                                                            <Clock className="w-3 h-3" /> {format(new Date(noti.created_at), 'dd/MM/yyyy HH:mm', { locale: vi })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400 uppercase ring-2 ring-white overflow-hidden shadow-sm">
                                                        {noti.users?.avatar_url ? <img src={noti.users.avatar_url} className="w-full h-full object-cover" /> : <UserIcon className="w-4 h-4" />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-bold text-slate-700">{noti.users?.full_name || 'Hệ thống'}</span>
                                                        <span className="text-[10px] text-slate-400 italic">ID: {noti.user_id.split('-')[0]}...</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <Badge variant={noti.is_read ? 'secondary' : 'destructive'} className="h-5 text-[9px] px-2 font-black tracking-widest uppercase shadow-sm">
                                                    {noti.is_read ? 'Đã xem' : 'Mới'}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button 
                                                    onClick={() => deleteNoti(noti.id)} 
                                                    className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                                                >
                                                    <Trash2 className="w-4.5 h-4.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {meta && (
                            <div className="px-6 py-2 border-t border-slate-100 bg-slate-50/30">
                                <Pagination 
                                    currentPage={page} 
                                    totalPages={meta.totalPages} 
                                    onPageChange={handlePageChange}
                                    limit={limit}
                                    onLimitChange={handleLimitChange}
                                    totalItems={meta.total}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
