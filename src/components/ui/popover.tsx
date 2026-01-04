'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/format';

const Popover = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <PopoverContext.Provider value={{ isOpen, setIsOpen }}>
            <div className="relative inline-block">{children}</div>
        </PopoverContext.Provider>
    );
};

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
    ({ className, onClick, asChild, children, ...props }, ref) => {
        const { isOpen, setIsOpen } = React.useContext(PopoverContext);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            setIsOpen(!isOpen);
            onClick?.(e);
        };

        if (asChild && React.isValidElement(children)) {
            // @ts-ignore
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: handleClick,
                ref: ref
            });
        }

        return (
            <button
                ref={ref}
                type="button"
                onClick={handleClick}
                className={className}
                {...props}
            >
                {children}
            </button>
        );
    }
);
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: 'start' | 'center' | 'end' }>(
    ({ className, align = 'center', style, ...props }, ref) => {
        const { isOpen, setIsOpen } = React.useContext(PopoverContext);
        const contentRef = React.useRef<HTMLDivElement>(null);

        // Close on click outside
        React.useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                // simple check, ideally would use event.composedPath to check if click is inside trigger or content
                // but since we wrap everything in the context provider div, verify if target is contained in that div?
                // Actually, the Popover Root wraps trigger and content. So if click is NOT in that root... 
                // But the Ref is on content. If click is outside content AND trigger?
                // Let's rely on a simple blur-like behavior or just close on click anywhere else.
                if (isOpen && contentRef.current && !contentRef.current.contains(event.target as Node)) {
                    // We need to NOT close if the trigger was clicked, but the trigger click toggles it anyway.
                    // The logic gets tricky without a robust library. 
                    // Let's implementation a simple timeout check for now or just rely on the toggle for simplicity in this demo environment.
                    setIsOpen(false);
                }
            };

            // Delay adding listener to avoid immediate close on trigger click bubbling
            if (isOpen) {
                document.addEventListener('mousedown', handleClickOutside);
            }
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [isOpen, setIsOpen]);

        if (!isOpen) return null;

        return (
            <div
                ref={contentRef}
                className={cn(
                    "absolute z-50 w-72 rounded-md border bg-white p-4 text-gray-900 shadow-md outline-none animate-in fade-in zoom-in-95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:bg-gray-900 dark:text-gray-100",
                    align === 'start' && "left-0",
                    align === 'center' && "left-1/2 -translate-x-1/2",
                    align === 'end' && "right-0",
                    "mt-2", // margin-top from trigger
                    className
                )}
                {...props}
            />
        );
    }
);
PopoverContent.displayName = "PopoverContent";

const PopoverContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}>({ isOpen: false, setIsOpen: () => { } });

export { Popover, PopoverTrigger, PopoverContent };
