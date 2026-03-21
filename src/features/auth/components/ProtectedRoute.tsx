"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        } else if (status === "authenticated" && allowedRoles && !allowedRoles.includes((session?.user as any).role)) {
            router.push("/unauthorized"); // Or some message saying you don't have access
        }
    }, [status, session, allowedRoles, router]);

    if (status === "loading") {
        return <div className="flex h-screen w-screen items-center justify-center">Đang kiểm tra quyền truy cập...</div>;
    }

    if (status === "authenticated") {
        if (allowedRoles && !allowedRoles.includes((session?.user as any).role)) {
            return null; // Will redirect in useEffect
        }
        return <>{children}</>;
    }

    return null;
};
