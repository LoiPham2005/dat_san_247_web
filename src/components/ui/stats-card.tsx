import { cn } from "@/lib/utils/format";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
    title: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    description?: string;
    className?: string;
}

export const StatsCard = ({
    title,
    value,
    trend,
    trendUp = true,
    icon: Icon,
    description,
    className
}: StatsCardProps) => {
    return (
        <div className={cn(
            "group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-none",
            className
        )}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {value}
                    </h3>
                </div>
                <div className="rounded-xl bg-primary-50 p-3 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-900/20 dark:text-primary-400 dark:group-hover:bg-primary-600 dark:group-hover:text-white">
                    <Icon className="h-6 w-6" />
                </div>
            </div>

            {(trend || description) && (
                <div className="mt-4 flex items-center gap-2">
                    {trend && (
                        <span className={cn(
                            "flex items-center text-sm font-medium",
                            trendUp ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        )}>
                            {trendUp ? <ArrowUpRight className="mr-1 h-4 w-4" /> : <ArrowDownRight className="mr-1 h-4 w-4" />}
                            {trend}
                        </span>
                    )}
                    {description && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            {description}
                        </span>
                    )}
                </div>
            )}

            {/* Decor blob */}
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-500/5 blur-2xl transition-all group-hover:bg-primary-500/10 dark:bg-primary-500/10" />
        </div>
    );
};
