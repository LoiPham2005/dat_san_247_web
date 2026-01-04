'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/format';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
    ({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
        const [isChecked, setIsChecked] = React.useState(defaultChecked || false);

        React.useEffect(() => {
            if (checked !== undefined) {
                setIsChecked(checked);
            }
        }, [checked]);

        const toggle = () => {
            const newValue = !isChecked;
            setIsChecked(newValue);
            if (onCheckedChange) onCheckedChange(newValue);
        };

        // We use a hidden input for form submission compatibility but render a custom toggle
        return (
            <div
                className={cn(
                    "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-600 data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700",
                    className
                )}
                onClick={toggle}
                data-state={isChecked ? 'checked' : 'unchecked'}
            >
                <input
                    type="checkbox"
                    className="sr-only"
                    ref={ref}
                    checked={isChecked}
                    onChange={(e) => {
                        // handled by parent div click, but keep syncing
                        toggle();
                    }}
                    {...props}
                />
                <span
                    data-state={isChecked ? 'checked' : 'unchecked'}
                    className={cn(
                        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
                    )}
                />
            </div>
        );
    }
);
Switch.displayName = "Switch";

export { Switch };
