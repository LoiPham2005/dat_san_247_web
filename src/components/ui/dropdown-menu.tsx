'use client';

import React, {
    createContext,
    useContext,
    useState,
    useRef,
    useEffect,
    ReactNode
} from 'react';
import { cn } from '@/lib/utils/format';

interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export const DropdownMenu = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
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
    if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

    return (
        <div onClick={() => context.setIsOpen(!context.isOpen)} className="cursor-pointer inline-flex">
            {children}
        </div>
    );
};

interface DropdownMenuContentProps {
    children: ReactNode;
    align?: 'start' | 'end' | 'center'; // mapped to left/right/center
    className?: string;
}

export const DropdownMenuContent = ({
    children,
    align = 'start',
    className
}: DropdownMenuContentProps) => {
    const context = useContext(DropdownContext);
    if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu");

    if (!context.isOpen) return null;

    let alignClass = 'left-0';
    if (align === 'end') alignClass = 'right-0';
    if (align === 'center') alignClass = 'left-1/2 -translate-x-1/2';

    return (
        <div className={cn(
            "absolute top-full mt-2 w-56 rounded-xl border border-gray-100 bg-white shadow-xl z-50 dark:border-gray-800 dark:bg-gray-900 animate-in fade-in zoom-in-95 duration-100",
            alignClass,
            className
        )}>
            <div className="p-1">{children}</div>
        </div>
    );
};

export const DropdownMenuItem = ({
    children,
    onClick,
    className,
    asChild
}: {
    children: ReactNode;
    onClick?: () => void;
    className?: string;
    asChild?: boolean;
}) => {
    const context = useContext(DropdownContext);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onClick?.();
        context?.setIsOpen(false);
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
