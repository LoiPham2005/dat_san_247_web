'use client';

// Simple Observer Pattern
type ToastProps = {
    id: string;
    title?: string;
    description?: string;
    className?: string;
    duration?: number;
    // ... other props
};

type Listener = (toasts: ToastProps[]) => void;

let memoryToasts: ToastProps[] = [];
let listeners: Listener[] = [];

function emitChange() {
    listeners.forEach((listener) => listener([...memoryToasts]));
}

function toast({ duration = 3000, ...props }: Omit<ToastProps, "id">) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, duration, ...props };

    memoryToasts = [...memoryToasts, newToast];
    emitChange();

    if (duration > 0) {
        setTimeout(() => {
            dismiss(id);
        }, duration);
    }

    return {
        id,
        dismiss: () => dismiss(id),
    };
}

function dismiss(id: string) {
    memoryToasts = memoryToasts.filter((t) => t.id !== id);
    emitChange();
}

const useToast = () => {
    const [toasts, setToasts] = React.useState<ToastProps[]>(memoryToasts);

    React.useEffect(() => {
        listeners.push(setToasts);
        return () => {
            listeners = listeners.filter((l) => l !== setToasts);
        };
    }, []);

    return {
        toast,
        dismiss,
        toasts,
    };
};

import * as React from 'react';

export { useToast, toast };
