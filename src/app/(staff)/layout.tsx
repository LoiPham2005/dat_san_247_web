
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';

const staffMenuItems = [
    { label: 'Dashboard', href: '/staff/dashboard', icon: 'LayoutDashboard' },
    { label: 'Bookings', href: '/staff/bookings', icon: 'Calendar' },
    { label: 'Schedule', href: '/staff/schedule', icon: 'Clock' },
];

export default function StaffLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar items={staffMenuItems} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
