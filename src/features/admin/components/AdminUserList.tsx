"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { UserStatus, KycStatus, RoleSlug } from '../api/admin-user.api';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent } from '@/components/common/Card';
import { Search, Filter, Shield, UserX, CheckCircle, Smartphone, Mail, Clock, ChevronDown, Plus, UserPlus, Check } from 'lucide-react';
import { format } from 'date-fns';
import { UserModal } from './UserModal';
import { Pagination } from '@/components/common/Pagination';
import { cn } from '@/lib/utils/cn';

export const AdminUserList = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('ALL');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    
    // State for click-to-show dropdowns
    const [openStatusDropdownId, setOpenStatusDropdownId] = useState<string | null>(null);
    const [openKycDropdownId, setOpenKycDropdownId] = useState<string | null>(null);

    const { 
        users, roles, meta, isLoading, 
        updateStatus, updateRole, updateKyc, 
        createUser, isCreating 
    } = useAdminUsers({
        page,
        limit,
        search: searchTerm || undefined,
        role: roleFilter === 'ALL' ? undefined : roleFilter,
        status: statusFilter === 'ALL' ? undefined : statusFilter
    });

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Smart Click Outside: Close IF clicking anywhere that isn't a badge or menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            // If the click is not on a status badge and not inside a dropdown menu
            if (!target.closest('.status-trigger') && !target.closest('.status-dropdown')) {
                setOpenStatusDropdownId(null);
                setOpenKycDropdownId(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (val: string) => {
        setSearchTerm(val);
        setPage(1);
    };

    const handleRoleFilter = (val: string) => {
        setRoleFilter(val);
        setPage(1);
    };

    const handleStatusFilter = (val: string) => {
        setStatusFilter(val);
        setPage(1);
    };

    const handleLimitChange = (newLimit: number) => {
        setLimit(newLimit);
        setPage(1);
    };

    const handleCreateUser = async (data: any) => {
        try {
            await createUser(data);
            setIsCreateModalOpen(false);
        } catch (error) {
            // Error is handled in the hook's toast
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải dữ liệu người dùng...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Control Bar - Updated to Match AdminBookingList style */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm email, tên, số điện thoại..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
                
                <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
                    <div className="relative w-full md:min-w-[140px] md:w-auto">
                        <select 
                            className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 font-semibold text-slate-700 transition-all cursor-pointer shadow-sm"
                            value={roleFilter}
                            onChange={(e) => handleRoleFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Vai trò</option>
                            {roles.map(r => (
                                <option key={r.id} value={r.slug}>{r.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                    
                    <div className="relative w-full md:min-w-[160px] md:w-auto">
                        <select 
                            className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 font-semibold text-slate-700 transition-all cursor-pointer shadow-sm"
                            value={statusFilter}
                            onChange={(e) => handleStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Trạng thái</option>
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="INACTIVE">Chưa kích hoạt</option>
                            <option value="SUSPENDED">Tạm khóa</option>
                            <option value="BANNED">Đã cấm</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1 hidden md:block"></div>

                    <Button 
                        onClick={() => setIsCreateModalOpen(true)}
                        className="h-10 px-4 font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 flex items-center gap-2 rounded-lg transition-all active:scale-95"
                    >
                        <UserPlus className="w-4 h-4" /> 
                        <span>Tạo người dùng</span>
                    </Button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl overflow-hidden">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Người dùng</th>
                                <th className="px-6 py-4">Liên hệ</th>
                                <th className="px-6 py-4 text-center">Vai trò</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-center">KYC</th>
                                <th className="px-6 py-4 text-right">Hoạt động cuối</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        Không tìm thấy người dùng nào phù hợp.
                                    </td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200 font-semibold text-slate-500">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.full_name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span>{user.full_name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-slate-900 group-hover:text-primary transition-colors">
                                                    {user.full_name}
                                                </div>
                                                <div className="text-[10px] text-slate-400 mt-0.5 font-medium uppercase tracking-tight">
                                                    ID: {user.id.substring(0, 8)}...
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1.5 text-slate-700 text-xs font-semibold">
                                                <Mail className="w-3.5 h-3.5 text-slate-300" />
                                                {user.email}
                                            </div>
                                            {user.phone && (
                                                <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium tracking-tight">
                                                    <Smartphone className="w-3.5 h-3.5 text-slate-300" />
                                                    {user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative inline-block w-full max-w-[140px]">
                                            <select 
                                                className="w-full appearance-none bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded px-2.5 py-1.5 text-[11px] font-semibold focus:outline-none focus:ring-1 focus:ring-primary/20 shadow-sm text-center cursor-pointer transition-colors uppercase tracking-tight"
                                                value={user.role.id}
                                                onChange={(e) => updateRole({ id: user.id, roleId: e.target.value })}
                                            >
                                                {roles.map(r => (
                                                    <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative inline-block">
                                            <div 
                                                className="status-trigger"
                                                onClick={() => {
                                                    setOpenKycDropdownId(null);
                                                    setOpenStatusDropdownId(openStatusDropdownId === user.id ? null : user.id);
                                                }}
                                            >
                                                <StatusBadge status={user.status} type="user" className="cursor-pointer whitespace-nowrap select-none border-2 hover:border-primary/50 transition-all shadow-sm" />
                                            </div>
                                            
                                            {openStatusDropdownId === user.id && (
                                                <div className="status-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 min-w-[180px] animate-in fade-in zoom-in duration-200">
                                                    <div className="py-2 px-3 mb-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Thay đổi Trạng thái</div>
                                                    <div className="flex flex-col gap-1.5">
                                                        {['ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED'].map(st => (
                                                            <button
                                                                key={st}
                                                                onClick={() => {
                                                                    updateStatus({ id: user.id, status: st as UserStatus });
                                                                    setOpenStatusDropdownId(null);
                                                                }}
                                                                className={cn(
                                                                    "flex items-center justify-between gap-3 p-1.5 rounded-xl transition-all",
                                                                    user.status === st ? "bg-slate-50 ring-1 ring-primary/20 shadow-sm" : "hover:bg-slate-50/50"
                                                                )}
                                                            >
                                                                <StatusBadge status={st} type="user" className="flex-1 text-center py-2" />
                                                                <div className="flex-shrink-0 w-6 flex justify-center">
                                                                    {user.status === st && <Check className="w-3.5 h-3.5 text-primary" />}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative inline-block">
                                            <div 
                                                className="status-trigger"
                                                onClick={() => {
                                                    setOpenStatusDropdownId(null);
                                                    setOpenKycDropdownId(openKycDropdownId === user.id ? null : user.id);
                                                }}
                                            >
                                                <StatusBadge status={user.kyc_status} type="kyc" className="cursor-pointer whitespace-nowrap select-none border-2 hover:border-primary/50 transition-all shadow-sm" />
                                            </div>
                                            
                                            {openKycDropdownId === user.id && (
                                                <div className="status-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 bg-white border border-slate-200 shadow-2xl rounded-2xl p-2 min-w-[180px] animate-in fade-in zoom-in duration-200">
                                                    <div className="py-2 px-3 mb-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">Trạng thái KYC</div>
                                                    <div className="flex flex-col gap-1.5">
                                                        {['UNVERIFIED', 'PENDING', 'VERIFIED', 'REJECTED'].map(st => (
                                                            <button
                                                                key={st}
                                                                onClick={() => {
                                                                    updateKyc({ id: user.id, kyc_status: st as KycStatus });
                                                                    setOpenKycDropdownId(null);
                                                                }}
                                                                className={cn(
                                                                    "flex items-center justify-between gap-3 p-1.5 rounded-xl transition-all",
                                                                    user.kyc_status === st ? "bg-slate-50 ring-1 ring-primary/20 shadow-sm" : "hover:bg-slate-50/50"
                                                                )}
                                                            >
                                                                <StatusBadge status={st} type="kyc" className="flex-1 text-center py-2" />
                                                                <div className="flex-shrink-0 w-6 flex justify-center">
                                                                    {user.kyc_status === st && <Check className="w-3.5 h-3.5 text-primary" />}
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="text-[11px] font-semibold text-slate-800 flex items-center gap-1">
                                                <Clock className="w-3 h-3 text-slate-400" />
                                                {user.last_login_at ? format(new Date(user.last_login_at), 'dd/MM/yy HH:mm') : 'N/A'}
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-medium">
                                                Tạo: {format(new Date(user.created_at), 'dd/MM/yyyy')}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {meta && (
                    <div className="px-6 border-t border-slate-100 bg-slate-50/50">
                        <Pagination 
                            currentPage={page} 
                            totalPages={meta.totalPages} 
                            onPageChange={(p) => setPage(p)}
                            limit={limit}
                            onLimitChange={handleLimitChange}
                            totalItems={meta.total}
                        />
                    </div>
                )}
            </div>

            <UserModal 
                isOpen={isCreateModalOpen} 
                onClose={() => setIsCreateModalOpen(false)} 
                onSubmit={handleCreateUser}
                roles={roles}
                isSubmitting={isCreating}
            />
        </div>
    );
};
