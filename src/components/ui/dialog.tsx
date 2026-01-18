'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils/format';

const DialogContext = React.createContext<{
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
} | null>(null);

const Dialog = ({ children, open, onOpenChange }: { children: React.ReactNode, open?: boolean, onOpenChange?: (open: boolean) => void }) => {
    const [isOpenState, setIsOpenState] = React.useState(false);

    // Controlled vs Uncontrolled logic
    const isOpen = open !== undefined ? open : isOpenState;
    const setIsOpen = React.useCallback((newVal: boolean) => {
        setIsOpenState(newVal);
        onOpenChange?.(newVal);
    }, [onOpenChange]);

    return (
        <DialogContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </DialogContext.Provider>
    );
};

const DialogTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }>(
    ({ className, onClick, asChild, children, ...props }, ref) => {
        const context = React.useContext(DialogContext);

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
DialogTrigger.displayName = "DialogTrigger";

const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        const context = React.useContext(DialogContext);

        if (!context?.isOpen) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                {/* Backdrop */}
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in"
                    onClick={() => context.setIsOpen(false)}
                />

                {/* Content */}
                <div
                    ref={ref}
                    className={cn(
                        "z-50 grid w-full max-w-lg gap-4 border bg-white p-6 shadow-lg duration-200 animate-in fade-in zoom-in-95 sm:rounded-lg dark:bg-gray-900 border-gray-200 dark:border-gray-800",
                        className
                    )}
                    {...props}
                >
                    {children}
                    <button
                        type="button"
                        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
                        onClick={() => context.setIsOpen(false)}
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                </div>
            </div>
        );
    }
);
DialogContent.displayName = "DialogContent";

const DialogHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-1.5 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
            className
        )}
        {...props}
    />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<
    HTMLParagraphElement,
    React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
    <p
        ref={ref}
        className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
        {...props}
    />
))
DialogDescription.displayName = "DialogDescription"

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription };
