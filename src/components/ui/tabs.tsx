'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/format';

const TabsContext = React.createContext<{
    value: string;
    onValueChange: (value: string) => void;
    orientation?: "horizontal" | "vertical";
} | null>(null);

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    orientation?: "horizontal" | "vertical";
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    ({ className, defaultValue, value: controlledValue, onValueChange, orientation = "horizontal", children, ...props }, ref) => {
        const [value, setValue] = React.useState(defaultValue || '');

        React.useEffect(() => {
            if (controlledValue !== undefined) setValue(controlledValue);
        }, [controlledValue]);

        const handleValueChange = React.useCallback((newValue: string) => {
            setValue(newValue);
            onValueChange?.(newValue);
        }, [onValueChange]);

        return (
            <TabsContext.Provider value={{ value, onValueChange: handleValueChange, orientation }}>
                <div ref={ref} className={cn("w-full", className, orientation === "vertical" ? "flex" : "")} {...props}>
                    {children}
                </div>
            </TabsContext.Provider>
        );
    }
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn(
                "inline-flex bg-muted text-muted-foreground",
                // specific styling is often handled by parent className in user code for flexibility
                className
            )}
            {...props}
        />
    )
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ className, value, onClick, ...props }, ref) => {
        const context = React.useContext(TabsContext);
        const isActive = context?.value === value;

        return (
            <button
                ref={ref}
                type="button"
                role="tab"
                aria-selected={isActive}
                data-state={isActive ? "active" : "inactive"}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
                    className
                )}
                onClick={(e) => {
                    context?.onValueChange(value);
                    onClick?.(e);
                }}
                {...props}
            />
        );
    }
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
    ({ className, value, ...props }, ref) => {
        const context = React.useContext(TabsContext);
        if (context?.value !== value) return null;

        return (
            <div
                ref={ref}
                role="tabpanel"
                className={cn(
                    "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    className
                )}
                {...props}
            />
        );
    }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
