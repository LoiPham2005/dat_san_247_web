import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const role = token?.role as string;
        const pathname = req.nextUrl.pathname;

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
        if (pathname.startsWith("/venue-staff") && role !== "venue_staff") {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: [
        "/admin/:path*",
        "/owner/:path*",
        "/staff/:path*",
        "/venue-staff/:path*",
        "/profile/:path*",
    ],
};
