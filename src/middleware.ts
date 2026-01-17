import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const url = req.nextUrl.pathname;

        // Redirect authenticated users away from login/register
        if (token && (url === '/login' || url === '/register')) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Admin routes protection
        if (url.startsWith('/admin') && token?.role !== 'admin' && token?.role !== 'super-admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Owner routes protection
        if (url.startsWith('/owner') && token?.role !== 'owner') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        // Staff routes protection
        if (url.startsWith('/staff') && token?.role !== 'staff' && token?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const url = req.nextUrl.pathname;

                // Protected routes that ALWAYS require authentication
                const protectedRoutes = ['/admin', '/owner', '/staff', '/profile', '/dashboard'];

                // If the route starts with any protected prefix, check for token
                if (protectedRoutes.some(route => url.startsWith(route))) {
                    return !!token;
                }

                // All other routes (Home, Search, Venues, etc.) are public
                return true;
            },
        },
    }
);

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
