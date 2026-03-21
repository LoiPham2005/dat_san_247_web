"use client";

import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import { X } from 'lucide-react';

interface DialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" 
                onClick={() => onOpenChange(false)} 
            />
            {children}
        </div>
    );
};

export const DialogContent = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn(
            "relative bg-white rounded-3xl shadow-2xl w-full max-w-md border border-white/20 animate-in zoom-in-95 duration-300 overflow-hidden",
            className
        )}>
            {children}
        </div>
    );
};

export const DialogHeader = ({ children, className }: { children: ReactNode, className?: string }) => {
    return <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}>{children}</div>;
};

export const DialogFooter = ({ children, className }: { children: ReactNode, className?: string }) => {
    return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}>{children}</div>;
};

export const DialogTitle = ({ children, className }: { children: ReactNode, className?: string }) => {
    return <h3 className={cn("text-lg font-semibold leading-none tracking-tight", className)}>{children}</h3>;
};

export const DialogDescription = ({ children, className }: { children: ReactNode, className?: string }) => {
    return <p className={cn("text-sm text-slate-500", className)}>{children}</p>;
};
