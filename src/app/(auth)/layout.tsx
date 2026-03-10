import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
            <Link href="/" className="flex items-center gap-2 mb-8 transition-opacity hover:opacity-90">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-2xl shadow-sm">
                    D
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                    DatSan<span className="text-primary">247</span>
                </span>
            </Link>

            <div className="w-full max-w-md">
                {children}
            </div>

            <p className="mt-8 text-sm text-slate-500 text-center">
                © {new Date().getFullYear()} DatSan247. Bảo mật và Uy tín.
            </p>
        </div>
    );
}
