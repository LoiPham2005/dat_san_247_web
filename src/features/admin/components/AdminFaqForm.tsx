"use client";

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { FaqCategory, AdminFaq } from '../api/admin-content.api';
import { X, Save } from 'lucide-react';

interface FaqFormProps {
    faq?: AdminFaq;
    onSubmit: (data: any) => void;
    onCancel: () => void;
    isLoading: boolean;
}

export const AdminFaqForm = ({ faq, onSubmit, onCancel, isLoading }: FaqFormProps) => {
    const [formData, setFormData] = useState({
        category: faq?.category || 'GENERAL' as FaqCategory,
        question: faq?.question || '',
        answer: faq?.answer || '',
        display_order: faq?.display_order || 0,
        is_active: faq?.is_active ?? true,
    });

    const categories: FaqCategory[] = ['GENERAL', 'BOOKING', 'PAYMENT', 'CANCELLATION', 'ACCOUNT', 'VENUE'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">{faq ? 'Cập nhật FAQ' : 'Thêm Câu hỏi FAQ'}</h2>
                <button type="button" onClick={onCancel} className="text-slate-400 hover:text-slate-600">
                    <X className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Chủ đề</label>
                        <select 
                            className="w-full h-10 px-3 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-primary"
                            value={formData.category}
                            onChange={e => setFormData({...formData, category: e.target.value as FaqCategory})}
                        >
                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Thứ tự hiển thị</label>
                        <Input 
                            type="number"
                            value={formData.display_order}
                            onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})}
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Câu hỏi <span className="text-rose-500">*</span></label>
                    <Input 
                        required
                        placeholder="VD: Làm thế nào để đặt sân?"
                        value={formData.question}
                        onChange={e => setFormData({...formData, question: e.target.value})}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Câu trả lời <span className="text-rose-500">*</span></label>
                    <textarea 
                        className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-primary focus:bg-white transition-all"
                        placeholder="Nhập câu trả lời cụ thể cho người dùng..."
                        value={formData.answer}
                        onChange={e => setFormData({...formData, answer: e.target.value})}
                        required
                    />
                </div>

                <div className="flex items-center gap-2 pb-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            checked={formData.is_active}
                            onChange={e => setFormData({...formData, is_active: e.target.checked})}
                            className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
                        />
                        <span className="text-sm font-medium text-slate-700">Hiển thị công khai</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button variant="ghost" type="button" onClick={onCancel}>Hủy bỏ</Button>
                <Button variant="default" type="submit" disabled={isLoading}>
                    <Save className="w-4 h-4 mr-2" />
                    {faq ? 'Cập nhật FAQ' : 'Lưu câu hỏi'}
                </Button>
            </div>
        </form>
    );
};
