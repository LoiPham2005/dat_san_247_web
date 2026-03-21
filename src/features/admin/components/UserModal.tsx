"use client";

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/common/Dialog';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { User, Mail, Phone, Shield, Lock, CheckCircle2 } from 'lucide-react';
import { AdminRole } from '../api/admin-user.api';

interface UserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    roles: AdminRole[];
    isSubmitting: boolean;
}

export const UserModal = ({ isOpen, onClose, onSubmit, roles, isSubmitting }: UserModalProps) => {
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
        phone: '',
        role_id: '',
        status: 'ACTIVE'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.role_id && roles.length > 0) {
            // Pick first role if not selected
            formData.role_id = roles[0].id;
        }
        await onSubmit(formData);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] border-none shadow-2xl overflow-hidden p-0">
                <div className="bg-gradient-to-r from-primary/10 to-transparent p-6 pb-0">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                            <div className="p-2 bg-primary rounded-xl text-white shadow-lg shadow-primary/20">
                                <User className="w-5 h-5" />
                            </div>
                            Tạo tài khoản mới
                        </DialogTitle>
                    </DialogHeader>
                    <p className="text-slate-500 text-xs mt-2 font-bold uppercase tracking-widest opacity-70">Cấp tài khoản hệ thống cho quản trị viên hoặc chủ sân</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input 
                                        name="full_name"
                                        required
                                        placeholder="Nguyễn Văn A" 
                                        className="pl-10 h-11 border-slate-200 focus:ring-primary/20 bg-slate-50/50"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input 
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="admin@datsan247.vn" 
                                        className="pl-10 h-11 border-slate-200 focus:ring-primary/20 bg-slate-50/50 text-sm"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mật khẩu</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input 
                                        name="password"
                                        type="password"
                                        required
                                        minLength={6}
                                        placeholder="••••••••" 
                                        className="pl-10 h-11 border-slate-200 focus:ring-primary/20 bg-slate-50/50"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                                <div className="relative">
                                    <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <Input 
                                        name="phone"
                                        placeholder="09xx xxx xxx" 
                                        className="pl-10 h-11 border-slate-200 focus:ring-primary/20 bg-slate-50/50"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Vai trò (Role)</label>
                                <div className="relative">
                                    <Shield className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                                    <select 
                                        name="role_id"
                                        required
                                        className="w-full pl-10 h-11 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-slate-50/50 text-sm font-semibold text-slate-700 appearance-none"
                                        value={formData.role_id}
                                        onChange={handleChange}
                                    >
                                        <option value="">Chọn vai trò...</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>{role.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button 
                                type="button" 
                                variant="outline" 
                                onClick={onClose}
                                className="font-bold border-slate-200"
                            >
                                Hủy bỏ
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="font-black bg-primary shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Đang tạo...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4" /> Xác nhận tạo
                                    </div>
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
