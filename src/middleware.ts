import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path ==='/login' || path ==='/signup'
    const token = request.cookies.get('token')?.value || ''
    // If the requested page isn't public, redirect them back login
    if (!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url))
    }
    if (isPublicPath && token){
        return NextResponse.redirect(new URL('/', request.url))
    }

  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup'
  ],
}