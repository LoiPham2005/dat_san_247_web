import { CustomerHeader } from '@/components/layout/customer/CustomerHeader';
import { CustomerFooter } from '@/components/layout/customer/CustomerFooter';
import { Toaster } from '@/components/ui/toaster';

export default function CustomerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 font-sans">
            <CustomerHeader />
            <main className="flex-grow">
                {children}
            </main>
            <CustomerFooter />
            <Toaster />
        </div>
    );
}
