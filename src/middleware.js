import { NextResponse } from 'next/server';

export async function middleware(req) {
  const path = req.nextUrl.pathname;

  const cookieString = req.headers.get("cookie");

  let adminJwtCookie
  let userJwtCookie
  if (cookieString) {
    const cookies = cookieString.split(";");
    adminJwtCookie = cookies?.find(cookie => cookie.trim().startsWith("adminJwt=")) || undefined
    userJwtCookie = cookies.find(cookie => cookie.trim().startsWith("userJwt=")) || undefined
  }

  // Extract the value of "adminJWT"
  const adminJwtValue = adminJwtCookie ? adminJwtCookie.split("=")[1] : undefined;
  const userJwtValue = userJwtCookie ? userJwtCookie.split("=")[1] : undefined;

  // Check for excluded path
  if (path.startsWith("/admin")) {
    if (path === '/admin/login') {
      if (!adminJwtValue) {
        return NextResponse.next(); // Allow access to login page
      }
      
      const response = await fetch("http://localhost:8000/api/is-admin-login", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${adminJwtValue}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      if (response) {

        if (response.status == 200) {
          // If token is valid, allow access
          return NextResponse.redirect(new URL('/admin/', req.url));
        }

        else {
          return NextResponse.next(); // Allow access to login page
        }
      }
    }

    if (!adminJwtValue) {
      return NextResponse.redirect(new URL('/admin/login', req.url)); // Redirect to login if no token
    }

    const response = await fetch("http://localhost:8000/api/is-admin-login", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${adminJwtValue}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (response) {
      if (response.status == 200) {
        return NextResponse.next();
      }
      else {
        return NextResponse.redirect(new URL('/admin/login', req.url));
      }
    }

  } else {
    if (path === '/login') {
      if (!userJwtCookie) {
        return NextResponse.next(); // Allow access to login page
      }
      const response = await fetch("http://localhost:8000/api/is-user-login", {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${userJwtValue}`,
          'Content-Type': 'application/json',
        },
      });

      if (response) {

        if (response.status == 200) {
          // If token is valid, allow access
          return NextResponse.redirect(new URL('/', req.url));
        }

        else {
          return NextResponse.next(); // Allow access to login page
        }
      }
    }

    if (!userJwtValue) {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login if no token
    }

    const response = await fetch("http://localhost:8000/api/is-user-login", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userJwtValue}`,
        'Content-Type': 'application/json',
      },
    });

    if (response) {
      if (response.status == 200) {
        // If token is valid, allow access
        return NextResponse.next();
      }
      else {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }
  }
}

export const config = {
  matcher: ['/','/admin/:path*']
};