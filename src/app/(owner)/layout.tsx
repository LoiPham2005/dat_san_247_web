
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

const ownerMenuItems = [
    { label: 'Dashboard', href: '/owner/dashboard', icon: 'LayoutDashboard' },
    { label: 'Venues', href: '/owner/venues', icon: 'MapPin' },
    { label: 'Bookings', href: '/owner/bookings', icon: 'Calendar' },
    { label: 'Revenue', href: '/owner/revenue', icon: 'DollarSign' },
    { label: 'Staff', href: '/owner/staff', icon: 'Users' },
];

export default function OwnerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar items={ownerMenuItems} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
