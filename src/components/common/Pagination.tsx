"use client";

import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    
    // Add optional limit controls
    limit?: number;
    onLimitChange?: (newLimit: number) => void;
    totalItems?: number;
    
    className?: string;
}

export const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    limit, 
    onLimitChange, 
    totalItems,
    className 
}: PaginationProps) => {
    
    const getPageNumbers = () => {
        const pages = [];
        const showMax = 5;

        if (totalPages <= showMax) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            let start = Math.max(1, currentPage - 2);
            let end = Math.min(totalPages, start + showMax - 1);

            if (end === totalPages) {
                start = Math.max(1, end - showMax + 1);
            }

            for (let i = start; i <= end; i++) pages.push(i);
        }
        return pages;
    };

    return (
        <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4 px-2 py-4", className)}>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-primary disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all font-medium"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-1">
                    {getPageNumbers().map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={cn(
                                "flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg border text-sm font-semibold transition-all",
                                currentPage === page
                                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                                    : "bg-white border-slate-200 text-slate-600 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                            )}
                        >
                            {page}
                        </button>
                    ))}
                    
                    {totalPages > 5 && getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
                        <div className="flex items-center gap-1">
                            <span className="text-slate-400 px-1">
                                <MoreHorizontal className="w-4 h-4" />
                            </span>
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className="flex items-center justify-center min-w-[36px] h-9 px-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all"
                            >
                                {totalPages}
                            </button>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-primary disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-slate-600 transition-all font-medium"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
            
            <div className="flex items-center gap-6">
                {onLimitChange && limit && (
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest hidden lg:inline">Hiển thị:</span>
                        <div className="relative">
                            <select
                                value={limit}
                                onChange={(e) => onLimitChange(Number(e.target.value))}
                                className="appearance-none bg-slate-50 border border-slate-200 rounded px-3 py-1.5 pr-8 text-xs font-bold text-slate-600 focus:outline-none focus:ring-1 focus:ring-primary/20 shadow-sm cursor-pointer hover:bg-white transition-all"
                            >
                                <option value={10}>10 bản ghi</option>
                                <option value={20}>20 bản ghi</option>
                                <option value={50}>50 bản ghi</option>
                                <option value={100}>100 bản ghi</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-2 h-3 w-3 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                )}
                
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    Trang {currentPage} / {totalPages}
                    {totalItems !== undefined && (
                        <span className="ml-2 border-l border-slate-200 pl-2">Tổng: {totalItems}</span>
                    )}
                </div>
            </div>
        </div>
    );
};
