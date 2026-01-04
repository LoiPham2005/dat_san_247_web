'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/format';
import { Label } from '@/components/ui/label';

const RadioGroupContext = React.createContext<{
    value?: string;
    onValueChange?: (value: string) => void;
    name?: string;
} | undefined>(undefined);

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    name?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
    ({ className, value: controlledValue, defaultValue, onValueChange, children, ...props }, ref) => {
        const [value, setValue] = React.useState(defaultValue || '');

        React.useEffect(() => {
            if (controlledValue !== undefined) {
                setValue(controlledValue);
            }
        }, [controlledValue]);

        const handleValueChange = (newValue: string) => {
            setValue(newValue);
            onValueChange?.(newValue);
        };

        return (
            <RadioGroupContext.Provider value={{ value, onValueChange: handleValueChange, name: props.name }}>
                <div className={cn("grid gap-2", className)} ref={ref} {...props}>
                    {children}
                </div>
            </RadioGroupContext.Provider>
        );
    }
);
RadioGroup.displayName = "RadioGroup";

interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
    ({ className, value, ...props }, ref) => {
        const context = React.useContext(RadioGroupContext);
        const isChecked = context?.value === value;

        return (
            <span className="relative flex items-center">
                <button
                    type="button"
                    role="radio"
                    aria-checked={isChecked}
                    data-state={isChecked ? "checked" : "unchecked"}
                    className={cn(
                        "aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                        isChecked ? "border-primary-600 text-primary-600" : "border-gray-400",
                        className
                    )}
                    onClick={() => context?.onValueChange?.(value)}
                >
                    <span className={cn(
                        "flex items-center justify-center",
                        isChecked ? "scale-100" : "scale-0"
                    )}>
                        <span className="h-2.5 w-2.5 rounded-full bg-primary-600" />
                    </span>
                </button>
                <input
                    type="radio"
                    className="sr-only"
                    ref={ref}
                    value={value}
                    checked={isChecked}
                    name={context?.name}
                    onChange={() => context?.onValueChange?.(value)}
                    {...props}
                />
            </span>
        );
    }
);
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
