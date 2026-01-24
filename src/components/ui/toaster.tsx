'use client';

import { useToast } from './use-toast';
import { X, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils/format';
import { useEffect, useState } from 'react';

export function Toaster() {
    const { toasts, dismiss } = useToast();

    return (
        <div className="fixed bottom-0 right-0 z-[100] flex flex-col p-4 gap-2 w-full max-w-[420px] pointer-events-none">
            {toasts.map(({ id, title, description, variant, ...props }) => (
                <div
                    key={id}
                    className={cn(
                        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-2xl border p-4 pr-8 shadow-lg transition-all animate-in slide-in-from-right-full",
                        variant === 'destructive'
                            ? "bg-red-600 border-red-500 text-white"
                            : "bg-white border-gray-100 dark:bg-gray-900 dark:border-gray-800 text-gray-900 dark:text-white"
                    )}
                >
                    <div className="flex gap-3">
                        {variant === 'destructive' ? (
                            <AlertCircle className="h-5 w-5 shrink-0" />
                        ) : (
                            <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                        )}
                        <div className="grid gap-1">
                            {title && <div className="text-sm font-bold uppercase tracking-tight">{title}</div>}
                            {description && <div className="text-xs opacity-90 font-medium">{description}</div>}
                        </div>
                    </div>
                    <button
                        onClick={() => dismiss(id)}
                        className="absolute right-2 top-2 p-1 rounded-full hover:bg-black/5 opacity-50 hover:opacity-100 transition-opacity"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
