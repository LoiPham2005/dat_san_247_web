"use client";

import React, { useState } from 'react';
import { useAdminVenues } from '../hooks/useAdminVenues';
import { VenueStatus } from '../api/admin-venue.api';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Card } from '@/components/common/Card';
import { Search, MapPin, Store, Star, Percent, Settings2, Eye, ShieldCheck, ChevronDown } from 'lucide-react';

export const AdminVenueList = () => {
    const { venues, isLoading, updateStatus, updateFeatured, updateCommission } = useAdminVenues();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [editingCommissionId, setEditingCommissionId] = useState<string | null>(null);
    const [tempCommissionRate, setTempCommissionRate] = useState<string>("");
    
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
    const [tempNote, setTempNote] = useState<string>("");
    
    // Simulate current logged in user role for demo purposes
    const [simulatedRole, setSimulatedRole] = useState<'admin' | 'super_admin'>('admin');

    const filteredVenues = venues.filter((venue) => {
        const matchesSearch = venue.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              venue.owner_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              venue.city.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || venue.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleCommissionSave = (id: string) => {
        const parsedRate = parseFloat(tempCommissionRate);
        if (!isNaN(parsedRate) && parsedRate >= 0 && parsedRate <= 100) {
            updateCommission({ id, rate: parsedRate });
        }
        setEditingCommissionId(null);
    };

    const handleNoteSave = (id: string) => {
        // @ts-ignore
        if (useAdminVenues().updateAdminNotes) {
            // @ts-ignore
            useAdminVenues().updateAdminNotes({ id, notes: tempNote });
        }
        setEditingNoteId(null);
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải danh sách sân...</p>
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
                <Button 
                    variant="outline" size="sm" 
                    className="h-8 border-indigo-200 text-indigo-700 bg-white"
                    onClick={() => setSimulatedRole(r => r === 'admin' ? 'super_admin' : 'admin')}
                >
                    Đổi quyền (Demo)
                </Button>
            </div>

            {/* Control Bar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Tìm theo tên sân, email chủ sân, khu vực..."
                        className="pl-9 h-10 border-slate-200 bg-slate-50 focus:bg-white transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative w-full md:w-48">
                        <select 
                            className="w-full appearance-none h-10 bg-slate-50 hover:bg-white border border-slate-200 hover:border-slate-300 rounded-md px-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-semibold text-slate-700 transition-all cursor-pointer"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="ALL">Tất cả Trạng thái</option>
                            <option value="PENDING">Chờ duyệt</option>
                            <option value="APPROVED">Đã Duyệt</option>
                            <option value="REJECTED">Bị từ chối</option>
                            <option value="SUSPENDED">Đình chỉ</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Venues Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVenues.length === 0 ? (
                    <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                        Không tìm thấy Venue nào khớp với tìm kiếm.
                    </div>
                ) : (
                    filteredVenues.map((venue) => (
                        <Card key={venue.id} className="relative overflow-hidden bg-white hover:border-primary/50 transition-all group border-slate-200">
                            {/* Featured Ribbon */}
                            {venue.is_featured && (
                                <div className="absolute top-0 right-0 z-10">
                                    <div className="w-28 h-6 absolute top-3 -right-7 bg-amber-400 text-amber-900 text-[10px] font-bold uppercase tracking-wider text-center rotate-45 shadow-sm leading-6">
                                        Nổi bật
                                    </div>
                                </div>
                            )}

                            {/* Header / Config Bar */}
                            <div className="h-12 bg-slate-50 border-b border-slate-100 flex justify-between items-center px-4">
                                <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest bg-slate-200 px-1.5 py-0.5 rounded">
                                    ID: {venue.id}
                                </span>
                                {(venue.status === 'PENDING' || venue.status === 'SUSPENDED') && (
                                    <span className="ml-2 text-[10px] font-bold px-2 py-0.5 bg-rose-100 text-rose-600 rounded">
                                        Cần Duyệt Hồ Sơ
                                    </span>
                                )}
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-auto">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 text-slate-400 hover:text-amber-500 hover:bg-amber-50"
                                        title={venue.is_featured ? "Gỡ Nổi bật" : "Đặt làm Nổi bật"}
                                        onClick={() => updateFeatured({ id: venue.id, is_featured: !venue.is_featured })}
                                    >
                                        <Star className={`w-4 h-4 ${venue.is_featured ? 'fill-amber-400 text-amber-400' : ''}`} />
                                    </Button>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-7 w-7 text-slate-400 hover:text-primary hover:bg-primary/5"
                                        title="Chỉnh sửa Chiết khấu"
                                        onClick={() => {
                                            setEditingCommissionId(venue.id);
                                            setTempCommissionRate(venue.commission_rate.toString());
                                        }}
                                    >
                                        <Percent className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                            {/* Venue Info */}
                            <div className="p-5">
                                <div className="mb-4">
                                    <h3 className="font-bold text-slate-900 text-lg group-hover:text-primary transition-colors line-clamp-1" title={venue.name}>
                                        {venue.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
                                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                        {venue.district}, {venue.city}
                                    </div>
                                </div>

                                <div className="space-y-3 mb-5">
                                    <div className="flex items-center gap-2 text-sm bg-slate-50 p-2 rounded-lg border border-slate-100">
                                        <div className="h-7 w-7 rounded-md bg-white border border-slate-200 flex items-center justify-center shrink-0">
                                            <Store className="w-3.5 h-3.5 text-slate-400" />
                                        </div>
                                        <div className="overflow-hidden">
                                            <div className="text-xs font-semibold text-slate-800 truncate">{venue.owner_name}</div>
                                            <div className="text-[10px] text-slate-500 truncate">{venue.owner_email}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* ADMIN NOTES */}
                                <div className="mb-4">
                                    {editingNoteId === venue.id ? (
                                        <div className="border border-primary rounded-lg p-2 bg-blue-50/50">
                                            <textarea 
                                                className="w-full text-xs font-medium text-slate-700 bg-transparent focus:outline-none resize-none"
                                                rows={2}
                                                value={tempNote}
                                                onChange={(e) => setTempNote(e.target.value)}
                                                autoFocus
                                                placeholder="Ghi chú nội bộ cho vận hành viên..."
                                            />
                                            <div className="flex justify-end gap-2 mt-2">
                                                <button onClick={() => setEditingNoteId(null)} className="text-[10px] font-bold text-slate-500">Hủy</button>
                                                <button onClick={() => {
                                                    // @ts-ignore
                                                    useAdminVenues().updateAdminNotes?.({ id: venue.id, notes: tempNote });
                                                    setEditingNoteId(null);
                                                }} className="text-[10px] font-bold text-primary">Lưu ghi chú</button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div 
                                            className="text-[11px] font-medium text-slate-600 bg-slate-100 p-2 rounded-lg cursor-pointer hover:bg-slate-200 hover:text-slate-800 transition-colors line-clamp-2 italic"
                                            onClick={() => {
                                                setEditingNoteId(venue.id);
                                                // @ts-ignore
                                                setTempNote(venue.admin_notes || "");
                                            }}
                                            title="Bấm để sửa ghi chú nội bộ"
                                        >
                                            {/* @ts-ignore */}
                                            {venue.admin_notes ? `📝 ${venue.admin_notes}` : "📝 Thêm ghi chú nội bộ..."}
                                        </div>
                                    )}
                                </div>

                                {/* KPIs */}
                                <div className="grid grid-cols-2 gap-3 mb-6 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Đánh giá</div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-lg font-bold text-slate-800">{venue.rating === 0 ? '--' : venue.rating}</span>
                                            <span className="text-xs text-slate-500">({venue.total_reviews})</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center justify-between">
                                            <span>Phí Hoa Hồng</span>
                                            <button 
                                                className="text-primary hover:text-primary/70 cursor-pointer p-0 h-auto"
                                                onClick={() => {
                                                    setEditingCommissionId(venue.id);
                                                    setTempCommissionRate(venue.commission_rate.toString());
                                                }}
                                            >
                                                <Settings2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        {editingCommissionId === venue.id ? (
                                            <div className="flex items-center gap-1">
                                                <Input 
                                                    autoFocus
                                                    className="h-6 w-14 px-1 text-sm text-center bg-white border-primary"
                                                    value={tempCommissionRate}
                                                    onChange={(e) => setTempCommissionRate(e.target.value)}
                                                    onBlur={() => handleCommissionSave(venue.id)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleCommissionSave(venue.id)}
                                                />
                                                <Percent className="w-3 h-3 text-slate-400" />
                                            </div>
                                        ) : (
                                            <div className="flex items-baseline gap-0.5" onClick={() => {
                                                setEditingCommissionId(venue.id);
                                                setTempCommissionRate(venue.commission_rate.toString());
                                            }}>
                                                <span className="text-lg font-bold text-emerald-600">{venue.commission_rate}</span>
                                                <Percent className="w-3.5 h-3.5 text-emerald-600" />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Status & Quick Action */}
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="relative inline-block">
                                        {/* Hidden Select over Badge for inline edit */}
                                        <select 
                                            className="w-full h-full absolute inset-0 opacity-0 cursor-pointer z-10"
                                            value={venue.status}
                                            onChange={(e) => updateStatus({ id: venue.id, status: e.target.value as VenueStatus })}
                                        >
                                            <option value="PENDING">Chờ duyệt</option>
                                            <option value="APPROVED">Duyệt & Hoạt động</option>
                                            <option value="REJECTED">Từ chối</option>
                                            <option value="SUSPENDED">Đình chỉ</option>
                                        </select>
                                        <div className="group-hover:opacity-90 transition-opacity">
                                            <StatusBadge status={venue.status} type="venue" className="px-3" />
                                        </div>
                                    </div>

                                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs shadow-sm bg-white hover:bg-slate-50">
                                        <Eye className="w-3 h-3 mr-1.5" />
                                        Chi tiết
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
