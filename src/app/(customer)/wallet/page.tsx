'use client';

import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft, Wallet, CreditCard, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

// Mock Transaction Data
const TRANSACTIONS = [
    { id: "TRX-1001", type: "DEPOSIT", amount: 500000, date: "2024-03-25T10:00:00", status: "SUCCESS", method: "Momo" },
    { id: "TRX-1002", type: "PAYMENT", amount: 300000, date: "2024-03-24T18:30:00", status: "SUCCESS", method: "Wallet" },
    { id: "TRX-1003", type: "REFUND", amount: 200000, date: "2024-03-20T09:15:00", status: "SUCCESS", method: "Wallet" },
    { id: "TRX-1004", type: "PAYMENT", amount: 450000, date: "2024-03-18T20:00:00", status: "SUCCESS", method: "Credit Card" },
    { id: "TRX-1005", type: "DEPOSIT", amount: 1000000, date: "2024-03-15T14:20:00", status: "SUCCESS", method: "Bank Transfer" },
];

export default function WalletPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Column: Balance Card */}
                <div className="w-full md:w-1/3 space-y-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Wallet</h1>

                    {/* Main Card */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-gray-400 font-medium mb-2">Total Balance</p>
                            <h2 className="text-5xl font-bold tracking-tight">1,250,000<span className="text-xl align-top">đ</span></h2>

                            <div className="mt-8 flex gap-4">
                                <Button className="flex-1 bg-white text-gray-900 hover:bg-gray-100 font-bold h-12 shadow-lg">
                                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Top Up
                                </Button>
                                <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10 h-12">
                                    <ArrowUpRight className="mr-2 h-4 w-4" /> Withdraw
                                </Button>
                            </div>
                        </div>

                        {/* Decorative Circles */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary-500/20 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-900/20">
                            <p className="text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider mb-1">Total In</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">+1.5M đ</p>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/10 p-4 rounded-2xl border border-red-100 dark:border-red-900/20">
                            <p className="text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider mb-1">Total Out</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">-250k đ</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Transactions */}
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold">Transaction History</h2>
                        <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" /> Export
                        </Button>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm overflow-hidden">
                        <DataTable
                            columns={columns}
                            data={TRANSACTIONS}
                            searchKey="id"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.getValue("type") as string;
            return (
                <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${type === 'DEPOSIT' || type === 'REFUND'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                        {type === 'DEPOSIT' || type === 'REFUND'
                            ? <ArrowDownLeft className="h-4 w-4" />
                            : <ArrowUpRight className="h-4 w-4" />
                        }
                    </div>
                    <span className="font-medium text-sm capitalize">{type.toLowerCase()}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => <span className="text-gray-500 text-sm">{new Date(row.getValue("date")).toLocaleDateString()}</span>
    },
    {
        accessorKey: "method",
        header: "Method",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => {
            const amount = row.getValue("amount") as number;
            const type = row.getValue("type") as string;
            const isPositive = type === 'DEPOSIT' || type === 'REFUND';

            return (
                <span className={`font-bold ${isPositive ? 'text-green-600' : 'text-gray-900 dark:text-gray-100'}`}>
                    {isPositive ? '+' : '-'}{amount.toLocaleString()}đ
                </span>
            )
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <Badge variant="success" className="bg-green-100 text-green-700 border-none">Success</Badge>
        )
    }
];
