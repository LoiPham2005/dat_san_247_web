import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const role = token?.role as string;
        const pathname = req.nextUrl.pathname;

        // Tự động chuyển hướng từ trang chủ nếu đã đăng nhập và không phải là customer
        if (pathname === "/" && token) {
            if (role === "super_admin" || role === "admin") {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }
            if (role === "owner") {
                return NextResponse.redirect(new URL("/owner/venues", req.url));
            }
            if (role === "staff") {
                return NextResponse.redirect(new URL("/staff/lookup", req.url));
            }
            if (role === "venue_staff") {
                return NextResponse.redirect(new URL("/venue-staff/check-in", req.url));
            }
        }

        // Bảo vệ route /admin
        if (pathname.startsWith("/admin") && role !== "super_admin" && role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Bảo vệ route /owner
        if (pathname.startsWith("/owner") && role !== "owner") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Bảo vệ route /staff
        if (pathname.startsWith("/staff") && role !== "staff") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        // Bảo vệ route /venue-staff
        if (pathname.startsWith("/venue-staff")) {
            const isVenueStaff = token?.isVenueStaff;
            if (role !== "venue_staff" && role !== "admin" && role !== "super_admin" && !isVenueStaff) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const pathname = req.nextUrl.pathname;
                // Cho phép truy cập trang chủ mà không cần token
                if (pathname === "/") return true;
                return !!token;
            },
        },
    }
);

export const config = {
    matcher: [
        "/",
        "/admin/:path*",
        "/owner/:path*",
        "/staff/:path*",
        "/venue-staff/:path*",
        "/profile/:path*",
    ],
};
