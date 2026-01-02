import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register', '/'];
const adminRoutes = ['/admin'];
const ownerRoutes = ['/owner'];
const staffRoutes = ['/staff'];

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-storage')?.value;
    const { pathname } = request.nextUrl;

    // Allow public routes
    if (publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.next();
    }

    // Redirect to login if not authenticated
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Parse user from token (simplified - implement proper JWT parsing)
    try {
        const authData = JSON.parse(token);
        const userRole = authData.state?.user?.role;

        // Role-based access control
        if (adminRoutes.some(route => pathname.startsWith(route)) && userRole !== 'ADMIN') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (ownerRoutes.some(route => pathname.startsWith(route)) && userRole !== 'OWNER') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        if (staffRoutes.some(route => pathname.startsWith(route)) && userRole !== 'STAFF') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
