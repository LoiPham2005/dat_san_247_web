"use client";

import React from 'react';
import { Button } from './Button';
import { AlertCircle, CheckCircle2, Trash2, HelpCircle, X } from 'lucide-react';

export type ConfirmType = 'danger' | 'warning' | 'info' | 'success';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    type?: ConfirmType;
    loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = 'Xác nhận',
    cancelText = 'Hủy bỏ',
    type = 'info',
    loading = false
}) => {
    if (!isOpen) return null;

    const icons = {
        danger: <Trash2 className="w-8 h-8 text-rose-500" />,
        warning: <AlertCircle className="w-8 h-8 text-amber-500" />,
        info: <HelpCircle className="w-8 h-8 text-blue-500" />,
        success: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
    };

    const colors = {
        danger: 'bg-rose-500 hover:bg-rose-600 shadow-rose-200',
        warning: 'bg-amber-500 hover:bg-amber-600 shadow-amber-200',
        info: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
        success: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200',
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop with extreme blur and dim */}
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose} />
            
            {/* Modal Content */}
            <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-in zoom-in-95 duration-300 overflow-hidden">
                <div className="p-8 pb-4">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="p-4 bg-slate-50 rounded-2xl">
                            {icons[type]}
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-black text-slate-900 leading-tight tracking-tight">{title}</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed px-4">{description}</p>
                        </div>
                    </div>
                </div>

                <div className="p-8 pt-6 flex flex-col sm:flex-row gap-3">
                    <Button 
                        variant="outline" 
                        onClick={onClose} 
                        disabled={loading}
                        className="flex-1 h-12 rounded-2xl border-slate-200 text-slate-600 font-bold transition-all hover:bg-slate-50"
                    >
                        {cancelText}
                    </Button>
                    <Button 
                        onClick={onConfirm}
                        disabled={loading}
                        className={`flex-1 h-12 rounded-2xl text-white font-bold shadow-lg transition-all active:scale-95 ${colors[type]}`}
                    >
                        {loading ? 'Đang xử lý...' : confirmText}
                    </Button>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};
