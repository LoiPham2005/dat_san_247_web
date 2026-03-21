"use client";

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { PolicyType, AdminPolicy } from '../api/admin-content.api';
import { X, Save } from 'lucide-react';

interface PolicyFormProps {
    policy?: AdminPolicy;
    onSubmit: (data: any) => void;
    onCancel: () => void;
    isLoading: boolean;
}

export const AdminPolicyForm = ({ policy, onSubmit, onCancel, isLoading }: PolicyFormProps) => {
    const [formData, setFormData] = useState({
        type: policy?.type || 'PRIVACY_POLICY' as PolicyType,
        title: policy?.title || '',
        content: policy?.content || '',
        version: policy?.version || '1.0.0',
        effective_date: policy?.effective_date ? new Date(policy.effective_date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        is_current: policy?.is_current ?? true,
        requires_acceptance: (policy as any)?.requires_acceptance ?? false,
    });

    const types: PolicyType[] = ['TERMS_OF_SERVICE', 'PRIVACY_POLICY', 'REFUND_POLICY', 'CANCELLATION_POLICY', 'COOKIE_POLICY', 'COMMUNITY_GUIDELINES'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            effective_date: new Date(formData.effective_date).toISOString(),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">{policy ? 'Cập nhật Điều Khoản' : 'Soạn thảo Tài liệu Mới'}</h2>
                <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Loại tài liệu</label>
                        <select 
                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                            value={formData.type}
                            onChange={e => setFormData({...formData, type: e.target.value as PolicyType})}
                        >
                            {types.map(t => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Phiên bản</label>
                        <Input 
                            placeholder="VD: 1.0.2"
                            value={formData.version}
                            onChange={e => setFormData({...formData, version: e.target.value})}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Tiêu đề tài liệu</label>
                    <Input 
                        required
                        placeholder="VD: Chính sách bảo mật thông tin người dùng"
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Nội dung (Markdown/Text)</label>
                    <textarea 
                        className="w-full min-h-[300px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:bg-white transition-all font-mono"
                        placeholder="Nhập nội dung tài liệu pháp lý tại đây..."
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 items-end">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Ngày hiệu lực</label>
                        <Input 
                            type="date"
                            value={formData.effective_date}
                            onChange={e => setFormData({...formData, effective_date: e.target.value})}
                        />
                    </div>
                    <div className="flex gap-4 pb-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.is_current}
                                onChange={e => setFormData({...formData, is_current: e.target.checked})}
                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-slate-700">Bản hiện hành</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={formData.requires_acceptance}
                                onChange={e => setFormData({...formData, requires_acceptance: e.target.checked})}
                                className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <span className="text-sm font-medium text-slate-700">Bắt buộc đồng ý</span>
                        </label>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button variant="ghost" type="button" onClick={onCancel}>Hủy bỏ</Button>
                <Button variant="default" type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    Lưu tài liệu
                </Button>
            </div>
        </form>
    );
};
