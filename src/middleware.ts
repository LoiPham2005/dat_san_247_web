import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { logger } from './lib/utils/logger';

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const url = req.nextUrl.pathname;

        // Redirect authenticated users away from login/register/root
        if (token && (url === '/login' || url === '/register' || url === '/')) {
            const role = token.role;
            let targetUrl = '/';

            if (role === 'super-admin' || role === 'admin') {
                targetUrl = '/admin/dashboard';
            } else if (role === 'owner') {
                targetUrl = '/owner/dashboard';
            } else if (role === 'staff') {
                targetUrl = '/staff/support';
            } else if (role === 'venue-staff') {
                targetUrl = '/venue-staff/dashboard';
            }

            // Only redirect if the current url is not the target url
            if (url !== targetUrl) {
                return NextResponse.redirect(new URL(targetUrl, req.url));
            }
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
            logger.info(`[Middleware] Redirecting unauthorized STAFF access: User Role=${token?.role}, URL=${url}`);
            return NextResponse.redirect(new URL('/', req.url));
        }

        logger.info(`[Middleware] Allow: Role=${token?.role || 'Guest'}, URL=${url}`);
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
