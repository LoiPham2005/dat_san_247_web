"use client"

import React from "react"
import { toast as sonnerToast } from "sonner"

type ToastProps = {
    title?: string;
    description?: React.ReactNode;
    variant?: "default" | "destructive" | "success" | "warning" | "info";
    duration?: number;
    action?: React.ReactNode;
    [key: string]: any;
}

function toast({ title, description, variant = "default", ...props }: ToastProps) {
    const options = {
        description,
        ...props
    }

    let id: string | number;

    switch (variant) {
        case "destructive":
            id = sonnerToast.error(title, options)
            break
        case "success":
            id = sonnerToast.success(title, options)
            break
        case "warning":
            id = sonnerToast.warning(title, options)
            break
        case "info":
            id = sonnerToast.info(title, options)
            break
        case "default":
        default:
            // Default to success for positive feedback, or simple message
            // Given the context of "dat san", default usually means success/info.
            // But if user wants neutral, sonnerToast.message() is neutral.
            // Previous implementation used check circle (success) for default.
            // So we stick to success for default to maintain behavior.
            id = sonnerToast.success(title, options)
            break
    }

    return {
        id,
        dismiss: () => sonnerToast.dismiss(id)
    }
}

function useToast() {
    return {
        toast,
        dismiss: (id?: string | number) => sonnerToast.dismiss(id)
    }
}

export { useToast, toast }
