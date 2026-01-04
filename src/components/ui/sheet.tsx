'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/format';

const SheetContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
} | null>(null);

const Sheet = ({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
    const [isOpenState, setIsOpenState] = React.useState(false);

    const isOpen = open !== undefined ? open : isOpenState;
    const setIsOpen = React.useCallback((newVal: boolean) => {
        setIsOpenState(newVal);
        onOpenChange?.(newVal);
    }, [onOpenChange]);

    return (
        <SheetContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </SheetContext.Provider>
    );
};

const SheetTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
    ({ className, onClick, asChild, children, ...props }, ref) => {
        const context = React.useContext(SheetContext);

        const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            context?.setIsOpen(true);
            onClick?.(e);
        };

        if (asChild && React.isValidElement(children)) {
            // @ts-ignore
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: handleClick,
                ref: ref,
                ...props
            });
        }

        return (
            <button
                ref={ref}
                onClick={handleClick}
                className={className}
                {...props}
            >
                {children}
            </button>
        );
    }
);
SheetTrigger.displayName = "SheetTrigger";

const SheetContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { side?: 'left' | 'right' | 'top' | 'bottom' }>(
    ({ className, side = 'right', children, ...props }, ref) => {
        const context = React.useContext(SheetContext);

        if (!context?.isOpen) return null;

        const sideClasses = {
            top: "inset-x-0 top-0 border-b",
            bottom: "inset-x-0 bottom-0 border-t",
            left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
            right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
        };

        const slideAnim = {
            top: "slide-in-from-top",
            bottom: "slide-in-from-bottom",
            left: "slide-in-from-left",
            right: "slide-in-from-right"
        }

        return (
            <div className="fixed inset-0 z-50 flex bg-black/50 backdrop-blur-sm animate-in fade-in" onClick={() => context.setIsOpen(false)}>
                {/* Prevent click on content from closing */}
                <div
                    ref={ref}
                    className={cn(
                        "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 bg-white dark:bg-gray-900",
                        sideClasses[side],
                        className
                    )}
                    onClick={(e) => e.stopPropagation()}
                    {...props}
                >
                    <button
                        type="button"
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                        onClick={() => context.setIsOpen(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                    {children}
                </div>
            </div>
        );
    }
);
SheetContent.displayName = "SheetContent";

export { Sheet, SheetTrigger, SheetContent };
