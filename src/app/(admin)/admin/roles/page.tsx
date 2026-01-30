'use client';

import { useState } from 'react';
import {
    Shield,
    Plus,
    Search,
    MoreVertical,
    CheckCircle2,
    Users,
    Info,
    Lock,
    Unlock,
    Settings,
    Database,
    Globe,
    MessageSquare,
    CreditCard,
    LayoutDashboard,
    Edit,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// Mock data for roles based on your seeder
const INITIAL_ROLES = [
    {
        id: '1',
        name: 'Super Admin',
        slug: 'super-admin',
        description: 'Full system access with all permissions. Cannot be modified.',
        isSystem: true,
        userCount: 2,
        permissions: ['*'],
        color: 'bg-red-500'
    },
    {
        id: '2',
        name: 'Admin',
        slug: 'admin',
        description: 'Partial system administrative access. Manage users and venues.',
        isSystem: true,
        userCount: 5,
        permissions: ['users:read', 'users:update', 'venues:read', 'venues:verify', 'bookings:read', 'analytics:view', 'settings:manage'],
        color: 'bg-orange-500'
    },
    {
        id: '3',
        name: 'Venue Owner',
        slug: 'owner',
        description: 'Manage their own sport venues, courts, and staff.',
        isSystem: true,
        userCount: 45,
        permissions: ['venues:manage', 'courts:create', 'courts:read', 'courts:update', 'courts:delete', 'bookings:read', 'bookings:update', 'analytics:view', 'users:read'],
        color: 'bg-blue-500'
    },
    {
        id: '4',
        name: 'Staff',
        slug: 'staff',
        description: 'System staff with limited administrative access for support.',
        isSystem: true,
        userCount: 12,
        permissions: ['users:read', 'venues:read', 'bookings:read'],
        color: 'bg-green-500'
    }
];

const PERMISSION_GROUPS = [
    {
        name: 'User Management',
        icon: Users,
        permissions: [
            { slug: 'users:read', label: 'View Users', description: 'Can view user list and details' },
            { slug: 'users:create', label: 'Create Users', description: 'Can create new users' },
            { slug: 'users:update', label: 'Update Users', description: 'Can edit existing users' },
            { slug: 'users:delete', label: 'Delete Users', description: 'Can remove users from system' },
        ]
    },
    {
        name: 'Venue Management',
        icon: Globe,
        permissions: [
            { slug: 'venues:read', label: 'View Venues', description: 'Can view venue list' },
            { slug: 'venues:manage', label: 'Manage Own Venues', description: 'Owner specific management' },
            { slug: 'venues:verify', label: 'Verify Venues', description: 'Can approve/reject venues' },
            { slug: 'venues:delete', label: 'Delete Venues', description: 'Can remove venues' },
        ]
    },
    {
        name: 'Booking Management',
        icon: CreditCard,
        permissions: [
            { slug: 'bookings:read', label: 'View Bookings', description: 'Can view all bookings' },
            { slug: 'bookings:create', label: 'Create Bookings', description: 'Can create bookings' },
            { slug: 'bookings:update', label: 'Update Bookings', description: 'Can edit bookings' },
            { slug: 'bookings:check-in', label: 'Process Check-in', description: 'Can check-in customers' },
        ]
    },
    {
        name: 'System Settings',
        icon: Settings,
        permissions: [
            { slug: 'settings:manage', label: 'Manage Settings', description: 'Can edit system config' },
            { slug: 'analytics:view', label: 'View Analytics', description: 'Can view reports' },
            { slug: 'roles:manage', label: 'Manage Roles', description: 'Can edit permissions' },
        ]
    }
];

export default function RolesPage() {
    const [roles, setRoles] = useState(INITIAL_ROLES);
    const [selectedRoleId, setSelectedRoleId] = useState('2'); // Default to Admin
    const [searchTerm, setSearchTerm] = useState('');

    const selectedRole = roles.find(r => r.id === selectedRoleId) || roles[0];

    const togglePermission = (roleId: string, permissionSlug: string) => {
        if (roleId === '1') return; // Super admin cannot be changed

        setRoles(prev => prev.map(role => {
            if (role.id === roleId) {
                const hasPermission = role.permissions.includes(permissionSlug);
                const newPermissions = hasPermission
                    ? role.permissions.filter(p => p !== permissionSlug)
                    : [...role.permissions, permissionSlug];
                return { ...role, permissions: newPermissions };
            }
            return role;
        }));
    };

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                        <Shield className="h-8 w-8 text-primary-600" />
                        Roles & Permissions
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Define access levels and system capabilities for different user groups.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Role
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Roles Sidebar */}
                <div className="lg:col-span-4 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search roles..."
                            className="pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        {roles.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((role) => (
                            <div
                                key={role.id}
                                onClick={() => setSelectedRoleId(role.id)}
                                className={`group relative flex flex-col p-4 rounded-xl border transition-all cursor-pointer ${selectedRoleId === role.id
                                        ? 'border-primary-500 bg-primary-50/30 dark:bg-primary-950/20 ring-1 ring-primary-500'
                                        : 'border-gray-200 hover:border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-800'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${role.color}`} />
                                        <h3 className="font-bold text-gray-900 dark:text-white">{role.name}</h3>
                                    </div>
                                    <Badge variant={role.isSystem ? "secondary" : "outline"} className="text-[10px]">
                                        {role.isSystem ? 'System' : 'Custom'}
                                    </Badge>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mb-3">
                                    {role.description}
                                </p>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex items-center text-xs text-gray-400 gap-1 font-medium">
                                        <Users className="h-3 w-3" />
                                        {role.userCount} users assigned
                                    </div>
                                    {selectedRoleId === role.id && (
                                        <CheckCircle2 className="h-4 w-4 text-primary-500" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Permissions Content */}
                <div className="lg:col-span-8">
                    <Card className="border-none shadow-premium bg-white dark:bg-gray-900">
                        <CardHeader className="border-b dark:border-gray-800 pb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${selectedRole.color} bg-opacity-10 dark:bg-opacity-20`}>
                                        <Shield className={`h-6 w-6 ${selectedRole.color.replace('bg-', 'text-')}`} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl font-bold">{selectedRole.name}</CardTitle>
                                        <CardDescription>{selectedRole.description}</CardDescription>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" disabled={selectedRole.slug === 'super-admin'}>
                                        <Edit className="h-4 w-4 mr-2" /> Edit Info
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" disabled={selectedRole.isSystem}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="pt-6">
                            <div className="flex items-center gap-2 mb-6 p-3 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-900/30">
                                <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                    {selectedRole.slug === 'super-admin'
                                        ? "This role has unrestricted access to the entire platform. Permissions cannot be removed."
                                        : "Select the checkboxes below to grant or revoke specific permissions for this role."}
                                </p>
                            </div>

                            <Tabs defaultValue="all" className="w-full">
                                <TabsList className="mb-6">
                                    <TabsTrigger value="all">All Permissions</TabsTrigger>
                                    <TabsTrigger value="active">Active ({selectedRole.permissions.length})</TabsTrigger>
                                </TabsList>

                                <TabsContent value="all" className="space-y-8">
                                    {PERMISSION_GROUPS.map((group) => (
                                        <div key={group.name} className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <group.icon className="h-5 w-5 text-gray-400" />
                                                <h4 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-xs">
                                                    {group.name}
                                                </h4>
                                                <Separator className="flex-1" />
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {group.permissions.map((perm) => (
                                                    <div
                                                        key={perm.slug}
                                                        className={`flex items-start gap-3 p-4 rounded-xl border transition-all ${selectedRole.permissions.includes(perm.slug) || selectedRole.slug === 'super-admin'
                                                                ? 'border-primary-100 bg-primary-50/20 dark:bg-primary-900/5'
                                                                : 'border-gray-100 dark:border-gray-800'
                                                            }`}
                                                    >
                                                        <Checkbox
                                                            id={perm.slug}
                                                            checked={selectedRole.permissions.includes(perm.slug) || selectedRole.slug === 'super-admin'}
                                                            disabled={selectedRole.slug === 'super-admin'}
                                                            onCheckedChange={() => togglePermission(selectedRole.id, perm.slug)}
                                                            className="mt-1"
                                                        />
                                                        <div className="space-y-1">
                                                            <label
                                                                htmlFor={perm.slug}
                                                                className="text-sm font-bold text-gray-900 dark:text-white cursor-pointer"
                                                            >
                                                                {perm.label}
                                                            </label>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {perm.description}
                                                            </p>
                                                            <code className="text-[10px] py-0.5 px-1 bg-gray-100 dark:bg-gray-800 rounded font-mono text-gray-400">
                                                                {perm.slug}
                                                            </code>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </TabsContent>

                                <TabsContent value="active">
                                    {/* Simplified view for active permissions */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {selectedRole.slug === 'super-admin' ? (
                                            <div className="col-span-full p-8 text-center border-2 border-dashed rounded-xl">
                                                <Unlock className="h-10 w-10 mx-auto mb-2 text-gray-300" />
                                                <p className="text-gray-500">Super admin has all permissions enabled.</p>
                                            </div>
                                        ) : selectedRole.permissions.map(slug => (
                                            <div key={slug} className="flex items-center gap-2 p-2 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                <span className="text-xs font-medium text-green-700 dark:text-green-300 font-mono">{slug}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>

                        <CardFooter className="border-t dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 py-6">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Lock className="h-3 w-3" />
                                    Last policy update: Dec 12, 2025
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" onClick={() => setRoles(INITIAL_ROLES)}>Discard Changes</Button>
                                    <Button disabled={selectedRole.slug === 'super-admin'}>Save Permissions</Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
