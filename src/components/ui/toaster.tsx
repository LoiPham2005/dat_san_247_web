'use client';

import { useToast } from './use-toast';
import { cn } from '@/lib/utils/format';
import { X } from 'lucide-react';

export function Toaster() {
    const { toasts, dismiss } = useToast();

    return (
        <div className="fixed top-0 right-0 z-[100] flex flex-col gap-2 p-4 w-full max-w-sm pointer-events-none">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={cn(
                        "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border p-6 pr-8 shadow-xl transition-all animate-in slide-in-from-right-full duration-300",
                        t.variant === 'destructive'
                            ? "bg-red-600 border-red-700 text-white"
                            : "bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-gray-200 dark:border-gray-800 text-gray-950 dark:text-gray-50",
                        t.className
                    )}
                >
                    <div className="grid gap-1">
                        {t.title && <div className="text-sm font-semibold">{t.title}</div>}
                        {t.description && <div className="text-sm opacity-90">{t.description}</div>}
                    </div>
                    <button
                        onClick={() => dismiss(t.id)}
                        className={cn(
                            "absolute right-2 top-2 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100 focus:outline-none",
                            t.variant === 'destructive' ? "text-white" : "text-gray-500"
                        )}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
