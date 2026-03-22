"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { useOwnerStaff, useOwnerStaffInvites } from '../hooks/useOwnerStaff';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Mail, Shield, CheckCircle2, MoreVertical, XCircle, Clock, Send, Ban } from 'lucide-react';
import { VenueStaffRole, OwnerStaffInvite } from '../api/owner-staff.api';
import { toast } from 'sonner';

export const OwnerStaffManagement = ({ venueId }: { venueId: string }) => {
    const { staffList, isLoadingStaff, updateRole, toggleStatus } = useOwnerStaff(venueId);
    const { invites, isLoadingInvites, inviteStaff, isInviting, revokeInvite, forceAccept, isForceAccepting } = useOwnerStaffInvites(venueId);

    const [activeTab, setActiveTab] = useState<'STAFF'|'INVITES'>('STAFF');

    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<VenueStaffRole>('STAFF');

    const handleInvite = () => {
        if (!inviteEmail) return;
        inviteStaff({ email: inviteEmail, role: inviteRole });
        setInviteEmail('');
    };

    const roleLabels: Record<VenueStaffRole, string> = {
        OWNER: 'Chủ Sân',
        MANAGER: 'Quản Lý',
        STAFF: 'Nhân Viên',
        RECEPTIONIST: 'Lễ Tân'
    };

    return (
        <div className="space-y-6">
            <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden w-max">
                <button 
                    className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'STAFF' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                    onClick={() => setActiveTab('STAFF')}
                >
                    Nhân Viên Chính Thức
                </button>
                <button 
                    className={`px-6 py-3 text-sm font-bold border-b-2 transition-colors ${activeTab === 'INVITES' ? 'border-emerald-600 bg-emerald-50 text-emerald-700' : 'border-transparent text-slate-500 hover:bg-slate-50'}`}
                    onClick={() => setActiveTab('INVITES')}
                >
                    Lời Mời Đã Gửi
                </button>
            </div>

            {activeTab === 'STAFF' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in">
                    {isLoadingStaff ? (
                        <div className="p-8 text-center text-slate-500 font-medium">Đang tải danh sách nhân viên...</div>
                    ) : staffList.length === 0 ? (
                        <div className="p-12 text-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
                            <Shield className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">Chưa có nhân viên nào.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {staffList.map(staff => (
                                <Card key={staff.id} className={`p-5 relative ${!staff.is_active ? 'opacity-70 bg-slate-50' : 'bg-white'}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                                {staff.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">{staff.full_name}</h4>
                                                <p className="text-xs font-semibold text-slate-500">{staff.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Quyền / Chức vụ</label>
                                            <select 
                                                value={staff.role} 
                                                onChange={(e) => updateRole({ id: staff.id, role: e.target.value as VenueStaffRole })}
                                                disabled={staff.role === 'OWNER'}
                                                className="text-xs font-bold outline-none bg-transparent cursor-pointer text-emerald-700 w-full"
                                            >
                                                {Object.entries(roleLabels).map(([key, val]) => (
                                                    <option key={key} value={key}>{val}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            {staff.role !== 'OWNER' && (
                                                <Button 
                                                    variant="ghost" 
                                                    size="sm" 
                                                    onClick={() => toggleStatus({ id: staff.id, is_active: !staff.is_active })}
                                                    className={`h-8 px-3 text-xs font-bold shadow-sm border ${staff.is_active ? 'bg-rose-50 text-rose-600 hover:bg-rose-100 border-rose-200' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-emerald-200'}`}
                                                >
                                                    {staff.is_active ? 'Vô Hiệu Khóa' : 'Kích Hoạt'}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                    {!staff.is_active && (
                                        <div className="absolute top-0 right-0 -mr-2 -mt-2">
                                            <span className="bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg border border-white">
                                                Đã Khóa
                                            </span>
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'INVITES' && (
                <div className="space-y-4 animate-in slide-in-from-bottom-2 fade-in">
                    <Card className="p-5 flex flex-wrap items-end gap-4 bg-emerald-50/50 border-emerald-100">
                        <div className="flex-1 min-w-[200px] space-y-1.5">
                            <label className="text-xs font-bold text-emerald-800 uppercase">Email Nhân Viên</label>
                            <Input value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} type="email" placeholder="example@gmail.com" className="h-10 bg-white" />
                        </div>
                        <div className="w-48 space-y-1.5">
                            <label className="text-xs font-bold text-emerald-800 uppercase">Phân Quyền</label>
                            <select value={inviteRole} onChange={e => setInviteRole(e.target.value as VenueStaffRole)} className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm font-semibold">
                                <option value="MANAGER">Quản Lý</option>
                                <option value="STAFF">Nhân Viên</option>
                                <option value="RECEPTIONIST">Lễ Tân</option>
                            </select>
                        </div>
                        <Button onClick={handleInvite} disabled={isInviting || !inviteEmail} className="h-10 px-6 font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md">
                            <Send className="w-4 h-4 mr-2" /> Gửi Lời Mời
                        </Button>
                    </Card>

                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        {isLoadingInvites ? (
                            <div className="p-8 text-center text-slate-500 font-medium">Đang tải lịch sử mời...</div>
                        ) : invites.length === 0 ? (
                            <div className="p-8 text-center text-slate-500 font-medium">Chưa gửi lời mời nào.</div>
                        ) : (
                            <div className="divide-y divide-slate-100">
                                {invites.map(invite => (
                                    <div key={invite.id} className="p-4 flex flex-col sm:flex-row items-center justify-between hover:bg-slate-50 transition-colors gap-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                                                <Mail className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-800">{invite.invite_email}</div>
                                                <div className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-2">
                                                    <span className="bg-slate-100 px-1.5 py-0.5 rounded font-bold text-slate-600">Quyền: {roleLabels[invite.role]}</span>
                                                    <span>• Gửi: {new Date(invite.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            {invite.status === 'PENDING' && (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                                                    <Clock className="w-3.5 h-3.5" /> Chờ xác nhận
                                                </span>
                                            )}
                                            {invite.status === 'ACCEPTED' && (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> Đã tham gia
                                                </span>
                                            )}
                                            {invite.status === 'REVOKED' && (
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded border border-slate-200">
                                                    <Ban className="w-3.5 h-3.5" /> Đã thu hồi
                                                </span>
                                            )}
                                            
                                            {invite.status === 'PENDING' && (
                                                <div className="flex gap-2">
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        onClick={() => {
                                                            const link = `${window.location.origin}/venue-staff/invite?token=${invite.token}`;
                                                            navigator.clipboard.writeText(link);
                                                            toast.success("Đã sao chép link mời!");
                                                        }} 
                                                        className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-8 font-bold border-indigo-200 bg-indigo-50"
                                                    >
                                                        Sao chép Link
                                                    </Button>
                                                    <Button 
                                                        variant="ghost" 
                                                        size="sm" 
                                                        onClick={() => revokeInvite(invite.id)} 
                                                        className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 h-8 font-bold border border-rose-200 bg-rose-50"
                                                    >
                                                        Thu Hồi
                                                    </Button>
                                                    <Button 
                                                        size="sm" 
                                                        onClick={() => forceAccept(invite.id)} 
                                                        loading={isForceAccepting}
                                                        className="bg-emerald-600 hover:bg-emerald-700 h-8 font-bold shadow-sm"
                                                    >
                                                        Test Chấp Nhận
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
