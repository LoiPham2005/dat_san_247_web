import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register', '/'];
const adminRoutes = ['/admin'];
const ownerRoutes = ['/owner'];
const adminStaffRoutes = ['/staff'];
const venueStaffRoutes = ['/venue-staff'];

export function middleware(request: NextRequest) {
    // TEMPORARY BYPASS: allow all traffic because Auth is currently in localStorage (client-side)
    // and middleware cannot read it. Layouts handle client-side protection.
    return NextResponse.next();

    /*
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
    
    // ... rest of logic
    */
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
