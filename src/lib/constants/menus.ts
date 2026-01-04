import {
    LayoutDashboard,
    Users,
    MapPin,
    Calendar,
    Settings,
    FileText,
    BarChart3,
    Shield,
    CalendarCheck,
    Wallet,
    Bell,
    MessageSquareQuote
} from 'lucide-react';
import { UserRole } from '@/types/auth.types';

export const ROLE_MENUS = {
    [UserRole.ADMIN]: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { label: 'Users', icon: Users, href: '/admin/users' },
        { label: 'Venues', icon: MapPin, href: '/admin/venues' },
        { label: 'Bookings', icon: Calendar, href: '/admin/bookings' },
        { label: 'Finance', icon: Wallet, href: '/admin/finance' },
        { label: 'Promotions', icon: Shield, href: '/admin/promotions' },
        { label: 'Content', icon: FileText, href: '/admin/content' },
        { label: 'Reviews', icon: MessageSquareQuote, href: '/admin/reviews' },
        { label: 'Notifications', icon: Bell, href: '/admin/notifications' },
        { label: 'Reports', icon: BarChart3, href: '/admin/reports' },
        { label: 'Settings', icon: Settings, href: '/admin/settings' },
    ],
    [UserRole.OWNER]: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/owner/dashboard' },
        { label: 'My Venues', icon: MapPin, href: '/owner/venues' },
        { label: 'Bookings', icon: Calendar, href: '/owner/bookings' },
        { label: 'Revenue', icon: Wallet, href: '/owner/revenue' },
        { label: 'Staff', icon: Users, href: '/owner/staff' },
        { label: 'Promotions', icon: Shield, href: '/owner/promotions' },
        { label: 'Analytics', icon: BarChart3, href: '/owner/analytics' },
        { label: 'Settings', icon: Settings, href: '/owner/settings' },
    ],
    [UserRole.STAFF]: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { label: 'Check In/Out', icon: CalendarCheck, href: '/admin/checkin' },
        { label: 'Bookings', icon: Calendar, href: '/admin/bookings' },
        { label: 'My Venue', icon: MapPin, href: '/admin/my-venue' },
    ],
    [UserRole.CUSTOMER]: [
        { label: 'Home', icon: LayoutDashboard, href: '/' },
    ]
};
