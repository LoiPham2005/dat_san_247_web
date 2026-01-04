'use client';

import { useSettingsStore } from '@/lib/store/settings.store';

export const RevenueChart = () => {
    const { theme } = useSettingsStore();
    const isDark = theme === 'dark';

    // SVG Mock Chart for Stability and Premium Look
    return (
        <div className="h-[350px] w-full flex items-end justify-between gap-2 pt-10 relative">
            {[40, 60, 45, 90, 75, 100, 85].map((height, i) => (
                <div key={i} className="group relative flex-1 flex flex-col items-center justify-end h-full z-10">
                    {/* Tooltip hint */}
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 bg-gray-900 text-white text-[10px] px-2 py-1 rounded shadow-xl pointer-events-none whitespace-nowrap z-20 dark:bg-gray-100 dark:text-gray-900 font-bold">
                        ${height * 10} Revenue
                    </div>

                    {/* Bar */}
                    <div
                        style={{ height: `${height}%` }}
                        className="w-full max-w-[40px] bg-gradient-to-t from-primary-500/20 to-primary-500 rounded-t-lg transition-all duration-500 group-hover:from-primary-500/40 group-hover:to-primary-600 shadow-sm"
                    />

                    {/* Label */}
                    <span className="mt-4 text-xs font-medium text-gray-400 dark:text-gray-500">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                    </span>

                    {/* Hover Glow */}
                    <div className="absolute inset-x-0 bottom-8 h-full bg-primary-500/5 blur-xl group-hover:bg-primary-500/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
            ))}

            {/* Horizontal Grid lines (visual only) */}
            <div className="absolute inset-0 pointer-events-none border-b border-gray-100 dark:border-gray-800 flex flex-col justify-between py-10 opacity-30">
                <div className="border-t border-gray-100 dark:border-gray-800 w-full" />
                <div className="border-t border-gray-100 dark:border-gray-800 w-full" />
                <div className="border-t border-gray-100 dark:border-gray-800 w-full" />
            </div>
        </div>
    );
};
