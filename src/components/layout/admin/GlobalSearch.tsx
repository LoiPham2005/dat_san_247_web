'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Users, MapPin, Calendar, Ticket, FileText, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/format';

interface SearchResult {
    id: string;
    type: 'user' | 'venue' | 'booking' | 'promotion';
    title: string;
    subtitle: string;
    href: string;
}

// Mock search function - Replace with actual API call
const mockSearch = async (query: string): Promise<SearchResult[]> => {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay

    if (!query.trim()) return [];

    const mockData: SearchResult[] = [
        // Users
        { id: '1', type: 'user', title: 'Nguyễn Văn A', subtitle: 'nguyenvana@email.com • Customer', href: '/admin/users' },
        { id: '2', type: 'user', title: 'Trần Thị B', subtitle: 'tranthib@email.com • Owner', href: '/admin/users' },
        // Venues
        { id: '3', type: 'venue', title: 'Sân Bóng ABC', subtitle: 'Quận 1, TP.HCM • Đang hoạt động', href: '/admin/venues' },
        { id: '4', type: 'venue', title: 'Tennis Center XYZ', subtitle: 'Quận 7, TP.HCM • Chờ duyệt', href: '/admin/venues' },
        // Bookings
        { id: '5', type: 'booking', title: 'Đơn #BK-2024-001', subtitle: '25/01/2024 • 500,000đ', href: '/admin/bookings' },
        { id: '6', type: 'booking', title: 'Đơn #BK-2024-002', subtitle: '24/01/2024 • 750,000đ', href: '/admin/bookings' },
        // Promotions
        { id: '7', type: 'promotion', title: 'SUMMER2024', subtitle: 'Giảm 20% • Còn hiệu lực', href: '/admin/promotions' },
        { id: '8', type: 'promotion', title: 'NEWYEAR25', subtitle: 'Giảm 50k • Hết hạn', href: '/admin/promotions' },
    ];

    // Filter based on query
    return mockData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
    );
};

const typeIcons = {
    user: Users,
    venue: MapPin,
    booking: Calendar,
    promotion: Ticket,
};

const typeLabels = {
    user: 'Người dùng',
    venue: 'Sân',
    booking: 'Đơn đặt',
    promotion: 'Khuyến mãi',
};

const typeColors = {
    user: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    venue: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    booking: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
    promotion: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
};

export const GlobalSearch = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (query.trim()) {
                setIsLoading(true);
                const searchResults = await mockSearch(query);
                setResults(searchResults);
                setIsLoading(false);
                setSelectedIndex(-1);
            } else {
                setResults([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K to open search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsOpen(true);
                setTimeout(() => inputRef.current?.focus(), 100);
            }
            // Escape to close
            if (e.key === 'Escape') {
                setIsOpen(false);
                setQuery('');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Arrow navigation
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex(prev => Math.max(prev - 1, -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            const selected = results[selectedIndex];
            if (selected) {
                router.push(selected.href);
                setIsOpen(false);
                setQuery('');
            }
        }
    }, [results, selectedIndex, router]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleResultClick = (result: SearchResult) => {
        router.push(result.href);
        setIsOpen(false);
        setQuery('');
    };

    // Group results by type
    const groupedResults = results.reduce((acc, result) => {
        if (!acc[result.type]) acc[result.type] = [];
        acc[result.type].push(result);
        return acc;
    }, {} as Record<string, SearchResult[]>);

    return (
        <div ref={containerRef} className="relative">
            {/* Search Input */}
            <div
                onClick={() => {
                    setIsOpen(true);
                    setTimeout(() => inputRef.current?.focus(), 100);
                }}
                className={cn(
                    "relative flex items-center cursor-pointer",
                    isOpen && "z-50"
                )}
            >
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Tìm kiếm... (Ctrl+K)"
                    className={cn(
                        "h-10 rounded-full border border-gray-200 bg-gray-50 pl-10 pr-12 text-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200",
                        isOpen ? "w-80" : "w-64"
                    )}
                />
                {query && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setQuery('');
                            inputRef.current?.focus();
                        }}
                        className="absolute right-10 p-1 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
                <div className="absolute right-3 hidden sm:flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">⌘</kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">K</kbd>
                </div>
            </div>

            {/* Results Dropdown */}
            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 w-full min-w-[400px] max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 z-50">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-8">
                            <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                            <span className="ml-2 text-sm text-gray-500">Đang tìm kiếm...</span>
                        </div>
                    ) : query && results.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                            <Search className="h-8 w-8 mb-2 opacity-50" />
                            <p className="text-sm">Không tìm thấy kết quả cho "{query}"</p>
                        </div>
                    ) : !query ? (
                        <div className="p-4">
                            <p className="text-xs font-medium text-gray-400 uppercase mb-3">Tìm kiếm nhanh</p>
                            <div className="grid grid-cols-2 gap-2">
                                {Object.entries(typeLabels).map(([type, label]) => {
                                    const Icon = typeIcons[type as keyof typeof typeIcons];
                                    return (
                                        <button
                                            key={type}
                                            onClick={() => setQuery(`${label}: `)}
                                            className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition-colors"
                                        >
                                            <div className={cn("p-2 rounded-lg", typeColors[type as keyof typeof typeColors])}>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="py-2">
                            {Object.entries(groupedResults).map(([type, items]) => {
                                const Icon = typeIcons[type as keyof typeof typeIcons];
                                return (
                                    <div key={type}>
                                        <div className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 uppercase">
                                            <Icon className="h-3.5 w-3.5" />
                                            {typeLabels[type as keyof typeof typeLabels]}
                                        </div>
                                        {items.map((result, index) => {
                                            const globalIndex = results.indexOf(result);
                                            return (
                                                <button
                                                    key={result.id}
                                                    onClick={() => handleResultClick(result)}
                                                    className={cn(
                                                        "w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left",
                                                        globalIndex === selectedIndex && "bg-primary-50 dark:bg-primary-900/20"
                                                    )}
                                                >
                                                    <div className={cn("p-2 rounded-lg flex-shrink-0", typeColors[result.type])}>
                                                        <Icon className="h-4 w-4" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                                            {result.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                                            {result.subtitle}
                                                        </p>
                                                    </div>
                                                    <span className="text-xs text-gray-400 flex-shrink-0">↵</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-[10px] text-gray-400">
                        <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1"><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">↑↓</kbd> Di chuyển</span>
                            <span className="flex items-center gap-1"><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">↵</kbd> Chọn</span>
                        </div>
                        <span className="flex items-center gap-1"><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd> Đóng</span>
                    </div>
                </div>
            )}
        </div>
    );
};
