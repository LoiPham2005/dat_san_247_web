'use client';

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MoreHorizontal,
    Bell,
    Send,
    Users,
    Shield,
    Layout,
    Clock,
    Search,
    History,
    Smartphone
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { MOCK_NOTIFICATIONS } from "@/lib/constants/mock-data";

export default function NotificationsAdminPage() {
    return (
        <div className="space-y-8 pb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Global Notifications
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Broadcast messages to all users, owners, or specific segments.
                    </p>
                </div>
                <Button className="bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20">
                    <Send className="mr-2 h-4 w-4" /> Compose Broadcast
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Quick Templates */}
                <div className="lg:col-span-1 space-y-6">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Quick Templates</h3>
                    <div className="space-y-3">
                        <TemplateCard
                            title="System Maintenance"
                            icon={Shield}
                            color="bg-orange-500"
                            desc="Alert users about scheduled downtime."
                        />
                        <TemplateCard
                            title="Holiday Greeting"
                            icon={Layout}
                            color="bg-red-500"
                            desc="Send seasonal wishes and promos."
                        />
                        <TemplateCard
                            title="App Update"
                            icon={Smartphone}
                            color="bg-blue-500"
                            desc="Inform users about new features."
                            iconComp={<History className="h-5 w-5" />}
                        />
                    </div>
                </div>

                {/* History Table */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Broadcast History</h3>
                    <div className="rounded-xl bg-white p-1 shadow-sm border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
                        <div className="p-4">
                            <DataTable
                                columns={columns}
                                data={MOCK_NOTIFICATIONS}
                                searchKey="title"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const columns: ColumnDef<any>[] = [
    {
        accessorKey: "title",
        header: "Broadcast Title",
        cell: ({ row }) => (
            <div className="flex flex-col max-w-[200px]">
                <span className="font-semibold text-sm truncate">{row.original.title}</span>
                <span className="text-[10px] text-gray-400 line-clamp-1">{row.original.message}</span>
            </div>
        )
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
            const type = row.original.type;
            return <Badge variant={type === 'SYSTEM' ? 'danger' : 'info'}>{type}</Badge>
        }
    },
    {
        accessorKey: "recipient",
        header: "Audience",
        cell: ({ row }) => (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Users className="h-3 w-3" />
                {row.original.recipient}
            </div>
        )
    },
    {
        accessorKey: "stats",
        header: "Reach",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <div className="text-center">
                    <p className="text-sm font-bold">{row.original.stats.open}</p>
                    <p className="text-[10px] text-gray-400">Opens</p>
                </div>
                <div className="text-center">
                    <p className="text-sm font-bold text-primary-600">{row.original.stats.click}</p>
                    <p className="text-[10px] text-gray-400">Clicks</p>
                </div>
            </div>
        )
    },
    {
        accessorKey: "sentAt",
        header: "Sent",
        cell: ({ row }) => (
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                <Clock className="h-3 w-3" />
                {new Date(row.original.sentAt).toLocaleDateString()}
            </div>
        )
    }
];

function TemplateCard({ title, desc, color, iconComp }: any) {
    return (
        <div className="group p-4 rounded-2xl border border-gray-100 bg-white hover:border-primary-500 transition-all cursor-pointer dark:bg-gray-900 dark:border-gray-800 shadow-sm">
            <div className="flex items-start gap-4">
                <div className={`h-10 w-10 rounded-xl ${color} flex items-center justify-center text-white shadow-lg shadow-${color}/20`}>
                    {iconComp || <Bell className="h-5 w-5" />}
                </div>
                <div>
                    <h4 className="text-sm font-bold group-hover:text-primary-600 transition-colors">{title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
            </div>
        </div>
    )
}
