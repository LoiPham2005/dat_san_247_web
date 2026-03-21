"use client";

import React, { useState } from 'react';
import { useAdminContent } from '../hooks/useAdminContent';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import { Search, Scale, HelpCircle, CheckCircle2, FileText, CalendarClock, PlusCircle, PenSquare, Trash2, ShieldAlert } from 'lucide-react';
import { format } from 'date-fns';
import { AdminPolicyForm } from './AdminPolicyForm';
import { AdminFaqForm } from './AdminFaqForm';

export const AdminContentList = () => {
    const { 
        policies, faqs, isLoadingPolicies, isLoadingFaqs,
        upsertPolicy, isUpsertingPolicy,
        createFaq, isCreatingFaq, updateFaq, isUpdatingFaq, deleteFaq, isDeletingFaq
    } = useAdminContent();
    
    const [activeTab, setActiveTab] = useState<'POLICIES' | 'FAQS'>('POLICIES');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const isLoading = isLoadingPolicies || isLoadingFaqs;

    const filteredPolicies = policies.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredFaqs = faqs.filter(f => f.question.toLowerCase().includes(searchTerm.toLowerCase()));

    const handlePolicySubmit = (data: any) => {
        upsertPolicy(data, {
            onSuccess: () => {
                setShowForm(false);
                setEditingItem(null);
            }
        });
    };

    const handleFaqSubmit = (data: any) => {
        if (editingItem) {
            updateFaq({ id: editingItem.id, data }, {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingItem(null);
                }
            });
        } else {
            createFaq(data, {
                onSuccess: () => {
                    setShowForm(false);
                    setEditingItem(null);
                }
            });
        }
    };

    const handleDeleteFaq = (id: string, question: string) => {
        if (window.confirm(`Xóa câu hỏi: "${question}"?`)) {
            deleteFaq(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-[400px] w-full items-center justify-center">
                <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-r-2 border-primary border-t-2"></div>
                    <p className="text-sm text-slate-500 font-medium">Đang tải Dữ liệu Văn bản...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Tabs & Controls */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="flex border-b border-slate-200">
                    <button 
                        className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all ${activeTab === 'POLICIES' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('POLICIES')}
                    >
                        <Scale className="w-4 h-4" /> Chính sách Điều Khoản (Policies)
                    </button>
                    <button 
                        className={`flex-1 flex justify-center items-center gap-2 py-4 text-sm font-bold transition-all ${activeTab === 'FAQS' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
                        onClick={() => setActiveTab('FAQS')}
                    >
                        <HelpCircle className="w-4 h-4" /> Câu hỏi Thường Gặp (FAQs)
                    </button>
                </div>

                <div className="p-4 bg-slate-50/50 flex flex-col md:flex-row gap-4 justify-between">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder={`Tìm theo ${activeTab === 'POLICIES' ? 'Tiêu đề Điều khoản' : 'Câu hỏi FAQ'}...`}
                            className="pl-9 h-10 border-slate-200 bg-white shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button 
                        onClick={() => {
                            setEditingItem(null);
                            setShowForm(true);
                        }}
                        className="h-10 shadow-sm shadow-primary/20"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Soạn thảo {activeTab === 'POLICIES' ? 'Tài liệu' : 'FAQ'} mới
                    </Button>
                </div>
            </div>

            {/* Form Modal (Simple Overlay) */}
            {showForm && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                        {activeTab === 'POLICIES' ? (
                            <AdminPolicyForm 
                                policy={editingItem}
                                onSubmit={handlePolicySubmit}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingItem(null);
                                }}
                                isLoading={isUpsertingPolicy}
                            />
                        ) : (
                            <AdminFaqForm 
                                faq={editingItem}
                                onSubmit={handleFaqSubmit}
                                onCancel={() => {
                                    setShowForm(false);
                                    setEditingItem(null);
                                }}
                                isLoading={isCreatingFaq || isUpdatingFaq}
                            />
                        )}
                    </div>
                </div>
            )}

            {/* Content: Policies */}
            {activeTab === 'POLICIES' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {filteredPolicies.map(policy => (
                        <div key={policy.id} className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-primary/40 transition-all p-5 flex flex-col justify-between group">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-slate-100 text-slate-500 rounded-lg group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-lg">{policy.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">{policy.type.replace(/_/g, ' ')}</span>
                                                <span className="text-[10px] font-bold uppercase text-sky-600 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">Phiên bản {policy.version}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {policy.is_current ? (
                                        <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200 shadow-sm">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> Bản Hiện Hành
                                        </span>
                                    ) : (
                                        <span className="text-[10px] font-bold uppercase text-slate-400 bg-slate-50 px-2 py-1 rounded-full border border-slate-200">
                                            Lưu Trữ Khảo Cổ
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm text-slate-600 line-clamp-3 leading-relaxed pl-[3.25rem]">
                                    {policy.content}
                                </div>
                            </div>

                            {/* Footer actions */}
                            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 pl-[3.25rem]">
                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                    <CalendarClock className="w-4 h-4 text-slate-400" />
                                    Hiệu lực từ: {format(new Date(policy.effective_date), 'dd/MM/yyyy')}
                                    {policy.requires_acceptance && (
                                        <span className="ml-2 text-[10px] px-1.5 py-0.5 bg-rose-50 text-rose-600 rounded items-center gap-1 font-bold border border-rose-100 flex" title="Bắt buộc Khách hàng Tick đồng ý">
                                            <ShieldAlert className="w-3 h-3" /> Force Accept
                                        </span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10"
                                        onClick={() => {
                                            setEditingItem(policy);
                                            setShowForm(true);
                                        }}
                                    >
                                        <PenSquare className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredPolicies.length === 0 && (
                        <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200 border-dashed">
                            Không tìm thấy Chính sách nào phù hợp.
                        </div>
                    )}
                </div>
            )}

            {/* Content: FAQs */}
            {activeTab === 'FAQS' && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                    {filteredFaqs.map(faq => (
                        <div key={faq.id} className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-6 hover:bg-slate-50/50 transition-colors group">
                            <div className="flex gap-4 items-start">
                                <div className="hidden md:flex flex-col items-center mt-1">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center text-sm border border-slate-200 shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">{faq.display_order}</div>
                                </div>
                                <div>
                                    <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                                        {faq.question}
                                        <span className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 shrink-0">{faq.category}</span>
                                    </h4>
                                    <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
                                    {faq.author && (
                                        <p className="text-[10px] text-slate-400 mt-2 font-medium">Bởi: {faq.author.full_name}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 self-end md:self-auto">
                                <label className="relative inline-flex items-center cursor-pointer" title={faq.is_active ? "Đang hiển thị trên Web" : "Đã Ẩn"}>
                                    <input 
                                        type="checkbox" 
                                        className="sr-only peer" 
                                        checked={faq.is_active} 
                                        onChange={() => updateFaq({ id: faq.id, data: { is_active: !faq.is_active }})}
                                    />
                                    <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                                <div className="w-px h-6 bg-slate-200 mx-1"></div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-slate-400 hover:text-primary hover:bg-primary/10"
                                    onClick={() => {
                                        setEditingItem(faq);
                                        setShowForm(true);
                                    }}
                                >
                                    <PenSquare className="w-4 h-4" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 text-rose-300 hover:text-rose-600 hover:bg-rose-50"
                                    onClick={() => handleDeleteFaq(faq.id, faq.question)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                    {filteredFaqs.length === 0 && (
                        <div className="py-16 text-center text-slate-500 bg-white border border-slate-200 border-dashed rounded-b-xl">
                            Không tìm thấy Câu hỏi FAQ nào phù hợp.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
