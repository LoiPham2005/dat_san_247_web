"use client";

import React, { useState } from 'react';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { OwnerVenue } from '../api/owner-venue.api';
import { useOwnerVenues } from '../hooks/useOwnerVenue';
import { Plus, Search, MapPin, Settings2, AlertCircle, Building2 } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

export const OwnerVenueList = ({ onSelect }: { onSelect: (venue: OwnerVenue) => void }) => {
    const { venues, isLoading, createVenue, isCreating } = useOwnerVenues();
    const [searchTerm, setSearchTerm] = useState('');

    const [isAdding, setIsAdding] = useState(false);
    const [newVenueName, setNewVenueName] = useState('');
    const [newVenueAddress, setNewVenueAddress] = useState('');
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleOpenConfirm = () => {
        if (!newVenueName || !newVenueAddress) return;
        setIsConfirmOpen(true);
    };

    const handleCreate = () => {
        createVenue({ name: newVenueName, address: newVenueAddress });
        setIsAdding(false);
        setNewVenueName('');
        setNewVenueAddress('');
        setIsConfirmOpen(false);
    };

    const filteredVenues = venues.filter(v => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <ConfirmDialog 
                isOpen={isConfirmOpen}
                title="Khởi tạo cơ sở mới?"
                description={`Bạn chuẩn bị tạo cơ sở "${newVenueName}". Sau khi tạo, bạn cần nộp hồ sơ pháp lý để được xét duyệt hoạt động.`}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleCreate}
                loading={isCreating}
                type="info"
            />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Tìm kiếm Cơ sở (Ví dụ: Thanh Xuân)..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 h-11 bg-white border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20"
                    />
                </div>
                {!isAdding && (
                    <Button 
                        onClick={() => setIsAdding(true)}
                        className="h-11 px-6 font-bold shadow-md shadow-emerald-500/20 bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Plus className="w-5 h-5 mr-2" /> Thêm Cơ Sở Mới
                    </Button>
                )}
            </div>

            {isAdding && (
                <Card className="p-6 border-emerald-200 bg-emerald-50/50 shadow-sm animate-in slide-in-from-top-2">
                    <h3 className="text-lg font-black text-emerald-900 mb-4 flex items-center gap-2">
                        <Building2 className="w-5 h-5" /> Khởi Tạo Cơ Sở Mới
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-emerald-800 uppercase">Tên Cơ Sở</label>
                            <Input value={newVenueName} onChange={e => setNewVenueName(e.target.value)} placeholder="Vd: Tổ hợp Sân Bóng Thanh Xuân" className="bg-white border-emerald-200 h-11" />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-emerald-800 uppercase">Địa Chỉ</label>
                            <Input value={newVenueAddress} onChange={e => setNewVenueAddress(e.target.value)} placeholder="Vd: 123 Khuất Duy Tiến" className="bg-white border-emerald-200 h-11" />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 mt-6">
                        <Button variant="outline" onClick={() => setIsAdding(false)} className="h-10 border-emerald-200 text-emerald-700 hover:bg-emerald-100 font-bold">Hủy bỏ</Button>
                        <Button onClick={handleOpenConfirm} disabled={isCreating} className="h-10 bg-emerald-600 hover:bg-emerald-700 shadow-md font-bold text-white px-8">
                            {isCreating ? 'Đang tạo...' : 'Lưu Cơ Sở'}
                        </Button>
                    </div>
                </Card>
            )}

            {isLoading ? (
                <div className="text-center py-12 text-slate-500 font-medium">Đang tải danh sách sân bãi...</div>
            ) : filteredVenues.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 border-dashed">
                    <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium text-lg">Bạn chưa có Cơ sở nào hoặc không tìm thấy kết quả.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVenues.map(venue => (
                        <Card key={venue.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border-slate-200 group flex flex-col cursor-pointer" onClick={() => onSelect(venue)}>
                            <div className="h-32 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                <Building2 className="w-10 h-10 text-slate-300" />
                                <div className="absolute bottom-3 left-4 z-20 flex gap-2">
                                    <StatusBadge status={venue.status} type="venue" />
                                    {venue.status === 'PENDING' && (
                                        <span className="bg-amber-100 text-amber-800 text-[10px] uppercase font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-amber-200">
                                            <AlertCircle className="w-3 h-3" /> Chờ Duyệt (Chưa Public)
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="p-5 flex-1 flex flex-col bg-white">
                                <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors line-clamp-1">
                                    {venue.name}
                                </h3>
                                <div className="mt-2 space-y-1.5 flex-1">
                                    <p className="text-sm font-medium text-slate-500 flex items-start gap-2 line-clamp-2">
                                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" /> {venue.address}, {venue.district}, {venue.city}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-400">ID: {venue.id}</span>
                                    <Button variant="outline" size="sm" className="h-8 font-bold text-xs border-emerald-200 text-emerald-600 group-hover:bg-emerald-50">
                                        <Settings2 className="w-3.5 h-3.5 mr-1.5" /> Quản Lý Đặt Sân
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
