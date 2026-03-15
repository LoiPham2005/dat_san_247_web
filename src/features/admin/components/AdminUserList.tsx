"use client";

import React, { useState } from 'react';
import { useAdminUsers } from '../hooks/useAdminUsers';
import { UserStatus, KycStatus, RoleSlug } from '../api/admin-user.api';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card, CardContent } from '@/components/common/Card';
import { Search, Filter, Shield, UserX, CheckCircle, Smartphone, Mail, Clock, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

export const AdminUserList = () => {
    const { users, isLoading, updateStatus, updateRole, updateKyc } = useAdminUsers();
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('ALL');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [simulatedRole, setSimulatedRole] = useState<'admin' | 'super_admin'>('admin');

    const filteredUsers = users.filter((user) => {
        const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (user.phone && user.phone.includes(searchTerm));
        const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

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
            {/* Demo Header for role simulation */}
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex justify-between items-center">
                <div className="text-sm text-indigo-800 font-medium">
                    Đang xem với tư cách: <strong className="uppercase">{simulatedRole === 'admin' ? 'Admin Vận Hành' : 'Super Admin'}</strong>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" size="sm" 
                        className="h-8 border-indigo-200 text-indigo-700 bg-white"
                        onClick={() => setSimulatedRole(r => r === 'admin' ? 'super_admin' : 'admin')}
                    >
                        Đổi quyền (Demo)
                    </Button>
                </div>
            </div>

            {/* Header & Filters */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm theo email, tên, số điện thoại..."
                        className="pl-9 h-10 border-slate-200 bg-white shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <select 
                            className="w-full appearance-none h-10 bg-white border border-slate-200 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-slate-700 shadow-sm transition-all"
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Vai trò</option>
                            <option value="super_admin">Super Admin</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                            <option value="owner">Venue Owner</option>
                            <option value="venue_staff">Venue Staff</option>
                            <option value="customer">Customer</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                    
                    <div className="relative w-full md:w-48">
                        <select 
                            className="w-full appearance-none h-10 bg-white border border-slate-200 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-medium text-slate-700 shadow-sm transition-all"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Trạng thái</option>
                            <option value="ACTIVE">Hoạt động</option>
                            <option value="INACTIVE">Chưa kích hoạt</option>
                            <option value="SUSPENDED">Tạm khóa</option>
                            <option value="BANNED">Đã cấm</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50/80 text-slate-500 font-semibold uppercase text-[11px] tracking-wider border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Người dùng</th>
                                <th className="px-6 py-4">Liên hệ</th>
                                <th className="px-6 py-4 text-center">Vai trò</th>
                                <th className="px-6 py-4 text-center">Trạng thái</th>
                                <th className="px-6 py-4 text-center">KYC / Định danh</th>
                                <th className="px-6 py-4 text-right">Hoạt động cuối</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100/80 bg-white">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                                        Không tìm thấy người dùng nào phù hợp.
                                    </td>
                                </tr>
                            ) : filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center overflow-hidden border border-slate-200">
                                                {user.avatar_url ? (
                                                    <img src={user.avatar_url} alt={user.full_name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="text-slate-500 font-bold">{user.full_name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 group-hover:text-primary transition-colors flex items-center gap-2">
                                                    {user.full_name}
                                                    <button onClick={() => alert('Demo Mode: Sẽ hiển thị Dialog để sửa thông tin cơ bản: Tên, SĐT, Địa chỉ')} className="text-slate-400 hover:text-primary transition-colors" title="Sửa thông tin cơ bản">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                                                    </button>
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5 flex gap-2">
                                                    <span>ID: {user.id}</span>
                                                    <button onClick={() => alert('Demo Mode: Sẽ hiển thị danh sách thiết bị đăng nhập')} className="text-blue-500 hover:underline flex items-center gap-0.5">
                                                        <Smartphone className="w-3 h-3" /> Xem TB
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" />
                                                {user.email}
                                            </div>
                                            {user.phone && (
                                                <div className="flex items-center gap-1.5 text-slate-600 text-xs font-medium">
                                                    <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                                                    {user.phone}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative inline-block w-36">
                                            <select 
                                                className="w-full appearance-none bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-sm text-center cursor-pointer transition-colors"
                                                value={user.role}
                                                onChange={(e) => updateRole({ id: user.id, role: e.target.value as RoleSlug })}
                                            >
                                                <option value="super_admin">Super Admin</option>
                                                <option value="admin">Admin</option>
                                                <option value="staff">Staff</option>
                                                <option value="owner">Venue Owner</option>
                                                <option value="venue_staff">Venue Staff</option>
                                                <option value="customer">Customer</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative inline-block w-32">
                                            <select 
                                                className="w-full appearance-none bg-transparent rounded-md px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary text-center cursor-pointer opacity-0 absolute inset-0 z-10"
                                                value={user.status}
                                                onChange={(e) => updateStatus({ id: user.id, status: e.target.value as UserStatus })}
                                            >
                                                <option value="ACTIVE">Hoạt động</option>
                                                <option value="INACTIVE">Chưa kích hoạt</option>
                                                <option value="SUSPENDED">Tạm khóa</option>
                                                {(simulatedRole === 'super_admin' || user.status === 'BANNED') && (
                                                    <option value="BANNED">Cấm (Ban)</option>
                                                )}
                                            </select>
                                            <div className="group-hover:opacity-80 transition-opacity">
                                                <StatusBadge status={user.status} type="user" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="relative inline-block w-32">
                                            <select 
                                                className="w-full appearance-none bg-transparent rounded-md px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary text-center cursor-pointer opacity-0 absolute inset-0 z-10"
                                                value={user.kyc_status}
                                                onChange={(e) => updateKyc({ id: user.id, kyc_status: e.target.value as KycStatus })}
                                            >
                                                <option value="UNVERIFIED">Chưa xác minh</option>
                                                <option value="PENDING">Đang chờ</option>
                                                <option value="VERIFIED">Đã xác minh</option>
                                                <option value="REJECTED">Từ chối</option>
                                            </select>
                                            <div className="group-hover:opacity-80 transition-opacity">
                                                <StatusBadge status={user.kyc_status} type="kyc" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex flex-col items-end gap-1">
                                            <div className="text-xs font-medium text-slate-800">
                                                {user.last_login_at ? format(new Date(user.last_login_at), 'dd/MM/yyyy HH:mm') : 'Chưa đăng nhập'}
                                            </div>
                                            <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                                <Clock className="w-3 h-3" />
                                                Tạo: {format(new Date(user.created_at), 'dd/MM/yy')}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between text-sm text-slate-500 font-medium">
                    <span>Tổng cộng: <strong className="text-slate-900">{filteredUsers.length}</strong> người dùng</span>
                    <div className="text-xs text-slate-400 italic">Gợi ý: Nhấn vào các badge "Trạng thái" hoặc "KYC" để đổi nhanh.</div>
                </div>
            </Card>
        </div>
    );
};
