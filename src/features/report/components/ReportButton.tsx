"use client";

import React, { useState } from 'react';
import { Button } from '@/components/common/Button';
import { AlertTriangle } from 'lucide-react';
import { ReportModal } from './ReportModal';
import { ReportTargetType } from '../api/report.api';
import { cn } from '@/lib/utils/cn';

interface ReportButtonProps {
    targetType: ReportTargetType;
    targetId: string;
    targetName?: string;
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
    showLabel?: boolean;
}

export const ReportButton = ({ 
    targetType, 
    targetId, 
    targetName, 
    variant = "ghost", 
    size = "sm", 
    className,
    showLabel = true 
}: ReportButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                onClick={() => setIsModalOpen(true)}
                className={cn(
                    "group flex items-center gap-1.5 transition-all text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl",
                    className
                )}
                title="Báo cáo vi phạm"
            >
                <AlertTriangle size={14} className="transition-transform group-hover:scale-110" />
                {showLabel && <span className="text-[11px] font-bold uppercase tracking-wider">Báo Cáo</span>}
            </Button>

            <ReportModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                targetType={targetType}
                targetId={targetId}
                targetName={targetName || "Đối tượng này"}
            />
        </>
    );
};
