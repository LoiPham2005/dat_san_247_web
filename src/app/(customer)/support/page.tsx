import React from 'react';
import { CustomerSupport } from '@/features/customer/components/CustomerSupport';
import { MessagesSquare } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hỗ Trợ & Yêu Cầu | DatSan247',
    description: 'Hệ thống gửi yêu cầu, báo lỗi hoặc báo cáo vi phạm với DatSan247',
};

export default function SupportPage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 tracking-tight">
                        <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                            <MessagesSquare className="w-8 h-8" />
                        </div>
                        Trung Tâm Hỗ Trợ
                    </h1>
                    <p className="text-sm text-slate-500 font-medium mt-3 max-w-xl leading-relaxed">
                        Bạn gặp vấn đề về thanh toán, lỗi khóa sân hay chủ sân thu phụ phí sai quy định? Gửi ngay một Ticket để đội ngũ DatSan247 tiếp nhận và bảo vệ quyền lợi cho bạn nhé.
                    </p>
                </div>
            </div>
            
            <CustomerSupport />
        </div>
    );
}
