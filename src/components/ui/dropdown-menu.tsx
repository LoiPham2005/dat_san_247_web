'use client';

import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    ReactNode
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils/format';

interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    triggerRect: DOMRect | null;
    setTriggerRect: (rect: DOMRect | null) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownMenuLabel = ({ children, className }: { children: ReactNode, className?: string }) => (
    <div className={cn("px-3 py-1.5 text-xs font-semibold text-gray-500", className)}>
        {children}
    </div>
);

export const DropdownMenu = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                // If we use Portal, the content is outside ref. 
                // We'll handle closer in DropdownMenuContent
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', () => setIsOpen(false), { once: true });
            window.addEventListener('resize', () => setIsOpen(false), { once: true });
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, triggerRect, setTriggerRect }}>
            <div ref={ref} className="relative inline-block text-left">
                {children}
            </div>
        </DropdownContext.Provider>
    );
};

export const DropdownMenuTrigger = ({
    children,
    asChild
}: {
    children: ReactNode;
    asChild?: boolean
}) => {
    const context = useContext(DropdownContext);
    const triggerRef = useRef<HTMLDivElement>(null);

    if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (triggerRef.current) {
            context.setTriggerRect(triggerRef.current.getBoundingClientRect());
        }
        context.setIsOpen(!context.isOpen);
    };

    return (
        <div
            ref={triggerRef}
            onClick={handleToggle}
            className="cursor-pointer inline-flex"
        >
            {children}
        </div>
    );
};

interface DropdownMenuContentProps {
    children: ReactNode;
    align?: 'start' | 'end' | 'center';
    className?: string;
}

export const DropdownMenuContent = ({
    children,
    align = 'start',
    className
}: DropdownMenuContentProps) => {
    const context = useContext(DropdownContext);
    const contentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!context || !context.isOpen || !context.triggerRect || !mounted) return null;

    const { triggerRect } = context;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const contentWidth = 224; // w-56 = 14rem = 224px
    const distanceToBottom = viewportHeight - triggerRect.bottom;
    const openUp = distanceToBottom < 250;

    // Calculate position
    let top = openUp ? triggerRect.top - 8 : triggerRect.bottom + 8;
    let left = triggerRect.left;

    if (align === 'end') {
        left = triggerRect.right - contentWidth;
    } else if (align === 'center') {
        left = triggerRect.left + (triggerRect.width / 2) - (contentWidth / 2);
    }

    // Boundary checks
    if (left < 10) left = 10;
    if (left + contentWidth > viewportWidth - 10) left = viewportWidth - contentWidth - 10;

    const transformOrigin = openUp ? 'bottom' : 'top';
    const translateClass = openUp ? '-translate-y-full' : '';

    const content = (
        <>
            {/* Backdrop for closing */}
            <div
                className="fixed inset-0 z-[9998]"
                onClick={(e) => {
                    e.stopPropagation();
                    context.setIsOpen(false);
                }}
            />
            <div
                ref={contentRef}
                style={{
                    position: 'fixed',
                    top: `${top}px`,
                    left: `${left}px`,
                    transformOrigin
                }}
                className={cn(
                    "w-56 rounded-xl border border-gray-100 bg-white shadow-2xl z-[9999] dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-100",
                    translateClass,
                    className
                )}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-1">{children}</div>
            </div>
        </>
    );

    return createPortal(content, document.body);
};

export const DropdownMenuItem = ({
    children,
    onClick,
    className,
    asChild,
    closeOnClick = true
}: {
    children: ReactNode;
    onClick?: (e?: React.MouseEvent) => void;
    className?: string;
    asChild?: boolean;
    closeOnClick?: boolean;
}) => {
    const context = useContext(DropdownContext);

    const handleClick = (e: React.MouseEvent) => {
        // Remove preventDefault to allow Link components to work
        e.stopPropagation();
        onClick?.();
        if (closeOnClick) {
            context?.setIsOpen(false);
        }
    };

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: (e: React.MouseEvent) => {
                const childOnClick = (children.props as any).onClick;
                if (childOnClick) childOnClick(e);
                handleClick(e);
            }
        });
    }

    return (
        <button
            onClick={handleClick}
            className={cn(
                "w-full text-left px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors dark:text-gray-200 dark:hover:bg-gray-800 flex items-center gap-2",
                className
            )}
        >
            {children}
        </button>
    );
};

export const DropdownMenuSeparator = () => (
    <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" />
);
