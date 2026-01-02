import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

const adminMenuItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: 'LayoutDashboard' },
    { label: 'Users', href: '/admin/users', icon: 'Users' },
    { label: 'Venues', href: '/admin/venues', icon: 'MapPin' },
    { label: 'Bookings', href: '/admin/bookings', icon: 'Calendar' },
    { label: 'Reports', href: '/admin/reports', icon: 'BarChart' },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar items={adminMenuItems} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
