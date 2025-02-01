// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
//   const protectedRoutes = ['/dashboard'];

//   const { pathname } = request.nextUrl;

//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   if (isProtected) {
//     const token = request.cookies.get('token')?.value;
    
//     if (!token) {
//       const loginUrl = new URL('/login', request.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], 
};
// 