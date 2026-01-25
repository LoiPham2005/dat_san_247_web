import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatCurrency = (amount: number | string): string => {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount;
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(value || 0);
};

export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

export const formatTime = (date: string | Date): string => {
    return new Date(date).toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
    });
};
