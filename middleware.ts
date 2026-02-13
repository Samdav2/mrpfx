import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Check if the request is for the admin dashboard
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude the login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for the admin access token cookie
        const adminToken = request.cookies.get('admin_access_token');

        if (!adminToken) {
            // Redirect to admin login if no token found
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
