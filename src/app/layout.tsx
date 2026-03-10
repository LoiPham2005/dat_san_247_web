import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'DatSan247 - Đặt Sân Thể Thao Nhanh Chóng',
    description: 'Hệ thống quản lý và đặt sân thể thao chuyên nghiệp',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="vi">
            <body className="antialiased min-h-screen">
                {children}
            </body>
        </html>
    );
}
