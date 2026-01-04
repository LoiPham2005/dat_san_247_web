'use client';

import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/format';

const AccordionContext = React.createContext<{
    value: string[];
    onValueChange: (value: string) => void;
    collapsible?: boolean;
} | null>(null);

interface AccordionProps {
    type?: "single" | "multiple";
    value?: string | string[];
    defaultValue?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    collapsible?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const Accordion = ({ type = "single", value: controlledValue, defaultValue, onValueChange, collapsible = false, className, children }: AccordionProps) => {
    // Determine internal state structure
    const [value, setValue] = React.useState<string[]>(() => {
        const initial = controlledValue || defaultValue;
        if (Array.isArray(initial)) return initial;
        if (initial) return [initial];
        return [];
    });

    React.useEffect(() => {
        if (controlledValue !== undefined) {
            if (Array.isArray(controlledValue)) setValue(controlledValue);
            else setValue([controlledValue]);
        }
    }, [controlledValue]);

    const handleItemChange = (itemValue: string) => {
        let newValue: string[] = [];
        if (type === "single") {
            if (value.includes(itemValue)) {
                newValue = collapsible ? [] : [itemValue];
            } else {
                newValue = [itemValue];
            }
        } else {
            // multiple
            if (value.includes(itemValue)) {
                newValue = value.filter(v => v !== itemValue);
            } else {
                newValue = [...value, itemValue];
            }
        }

        setValue(newValue);
        if (onValueChange) {
            if (type === "single") onValueChange(newValue[0] || "");
            else onValueChange(newValue);
        }
    };

    return (
        <AccordionContext.Provider value={{ value, onValueChange: handleItemChange, collapsible }}>
            <div className={cn("flex flex-col", className)}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
};

const AccordionItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
    ({ className, value, ...props }, ref) => (
        <div ref={ref} className={cn("border-b", className)} {...props} data-value={value} />
    )
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
    ({ className, children, ...props }, ref) => {
        const context = React.useContext(AccordionContext);
        // Find parent item value (hacky traverse or pass explicit? explicitly passing is better but shadcn api doesn't require it on trigger. 
        // We actually need to get the value from the parent AccordionItem context if we nested Contexts, usually AccordionItem wraps a Context provider.)

        // Let's refactor AccordionItem to provide the value context.
        return (
            <AccordionItemContext.Consumer>
                {({ value }) => {
                    const isOpen = context?.value.includes(value);
                    return (
                        <div className="flex">
                            <button
                                ref={ref}
                                type="button"
                                onClick={() => context?.onValueChange(value)}
                                aria-expanded={isOpen}
                                className={cn(
                                    "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180",
                                    className
                                )}
                                {...props}
                            >
                                {children}
                                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                            </button>
                        </div>
                    )
                }}
            </AccordionItemContext.Consumer>
        );
    }
);
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <AccordionItemContext.Consumer>
            {({ value }) => {
                // We need access to the root context too to check openness
                const rootContext = React.useContext(AccordionContext);
                const isOpen = rootContext?.value.includes(value);

                if (!isOpen) return null;

                return (
                    <div
                        ref={ref}
                        className={cn(
                            "overflow-hidden text-sm transition-all animate-in slide-in-from-top-1",
                            className
                        )}
                        {...props}
                    >
                        <div className="pb-4 pt-0">{children}</div>
                    </div>
                );
            }}
        </AccordionItemContext.Consumer>
    )
);
AccordionContent.displayName = "AccordionContent";

// Helper Context for Item to Trigger/Content communication
const AccordionItemContext = React.createContext<{ value: string }>({ value: '' });

// Redefine AccordionItem to use Provider
const AccordionItemWrapper = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
    ({ className, value, ...props }, ref) => (
        <AccordionItemContext.Provider value={{ value }}>
            <div ref={ref} className={cn("border-b", className)} {...props} />
        </AccordionItemContext.Provider>
    )
);
AccordionItemWrapper.displayName = "AccordionItem";

export { Accordion, AccordionItemWrapper as AccordionItem, AccordionTrigger, AccordionContent };
