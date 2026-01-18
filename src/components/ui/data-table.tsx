'use client';

import { useState } from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ColumnFiltersState
} from '@tanstack/react-table';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'; // I'll assume standard shadcn-like table structure which I might need to create if missing
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Search,
    Download,
    SlidersHorizontal,
    Loader2
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils/format';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    searchKey?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    filterColumn?: string;
    filterValue?: string;
    onFilterChange?: (value: string) => void;
    filterOptions?: { label: string; value: string }[];
    isLoading?: boolean;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    searchKey,
    searchValue,
    onSearchChange,
    filterColumn,
    filterValue,
    onFilterChange,
    filterOptions,
    isLoading
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnVisibility, setColumnVisibility] = useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            globalFilter,
            columnVisibility,
        },
        onGlobalFilterChange: setGlobalFilter,
    });

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 flex-1">
                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search..."
                            value={searchValue !== undefined ? searchValue : globalFilter}
                            onChange={(event) => {
                                if (onSearchChange) {
                                    onSearchChange(event.target.value);
                                } else {
                                    setGlobalFilter(event.target.value);
                                }
                            }}
                            className="pl-9"
                        />
                    </div>
                    {filterColumn && filterOptions && (
                        <div className="w-40">
                            <select
                                className="h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                                value={filterValue !== undefined ? filterValue : (table.getColumn(filterColumn)?.getFilterValue() as string) || "ALL"}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    if (onFilterChange) {
                                        onFilterChange(val === 'ALL' ? '' : val);
                                    } else {
                                        table.getColumn(filterColumn)?.setFilterValue(val === 'ALL' ? "" : val);
                                    }
                                }}
                            >
                                <option value="ALL">All {filterColumn}</option>
                                {filterOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                                <SlidersHorizontal className="mr-2 h-4 w-4" />
                                View
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[150px]">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuItem
                                            key={column.id}
                                            className="capitalize cursor-pointer"
                                            closeOnClick={false}
                                            onClick={() => column.toggleVisibility(!column.getIsVisible())}
                                        >
                                            <div className="flex items-center gap-2 w-full">
                                                <input
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 cursor-pointer"
                                                    checked={column.getIsVisible()}
                                                    readOnly
                                                />
                                                <span>{typeof column.columnDef.header === 'string' ? column.columnDef.header : column.id}</span>
                                            </div>
                                        </DropdownMenuItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                    </Button>
                </div>
            </div>

            <div className="rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
                <div className="overflow-x-auto">
                    {/* Basic Table Implementation if UI component missing, but user had src/components/ui/table.tsx earlier */}
                    {/* Let's try to use standard HTML table with Tailwind classes if import fails or verify standard structure */}
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-gray-500 [&:has([role=checkbox])]:pr-0 dark:text-gray-400">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </th>
                                        )
                                    })
                                ))}
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={columns.length} className="h-64">
                                        <div className="flex items-center justify-center">
                                            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                                        </div>
                                    </td>
                                </tr>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                        className="border-b border-gray-200 transition-colors hover:bg-gray-50/50 data-[state=selected]:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800/50"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex items-center justify-between px-2">
                <div className="flex-1 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <p className="hidden sm:block">
                            Page {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, table.getPageCount()) }).map((_, i) => (
                            <button
                                key={i}
                                className={cn(
                                    "h-8 w-8 rounded-md text-sm font-medium transition-colors",
                                    table.getState().pagination.pageIndex === i
                                        ? "bg-primary-600 text-white"
                                        : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                                )}
                                onClick={() => table.setPageIndex(i)}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
