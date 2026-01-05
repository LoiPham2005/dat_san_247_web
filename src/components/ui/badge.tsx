import { cn } from "@/lib/utils/format";

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'secondary' | 'destructive';
    className?: string;
}

export const Badge = ({ children, variant = 'default', className }: BadgeProps) => {
    return (
        <span className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            {
                'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200': variant === 'default',
                'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100': variant === 'secondary',
                'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400': variant === 'success',
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400': variant === 'warning',
                'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400': variant === 'danger' || variant === 'destructive',
                'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400': variant === 'info',
                'border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-300': variant === 'outline',
            },
            className
        )}>
            {children}
        </span>
    );
};
