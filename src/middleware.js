
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get('token')?.value;
  console.log("middleware token", token)

 
  //  console.log("middleware token ", token, path)

  // console.log(request.cookies.get('token')?.value, "mid")

 // Check if token exists and redirect accordingly
  if (token && (path.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!token && !(path.startsWith('/login'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  request.headers.set('Authorization', 'Bearer myAccessToken');
  //  const response = NextResponse.next();
  //  response.cookies.set('vercel', "data")

   return NextResponse.next();
    
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/movie_list/:path*',
    '/movie_details/:path*',

    
  ]
};


// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const publicPaths = ['/login', '/signup', ];

// function isPublicPath(path: string): boolean {
//   return publicPaths.includes(path);
// }

// export function middleware(request: NextRequest) {
//   const path = request.nextUrl.pathname
//   // Get the token from the cookies
//   const token = request.cookies.get('token')?.value || ''

//   // Redirect logic based on the path and token presence
//   if(isPublicPath(path) && token) {
//     // If trying to access a public path with a token, redirect to the home page
//     return NextResponse.redirect(new URL('/home', request.nextUrl))
//   }

//   // If trying to access a protected path without a token, redirect to the login page
//   if (!isPublicPath(path) && !token ) {
//     return NextResponse.redirect(new URL('/login', request.nextUrl))
//   }

//   // if (!token) {
//   //   return NextResponse.redirect(new URL('/api/auth/unauthorized', request.nextUrl));
//   // }

//   // return NextResponse.next();
    
// }

// export const config = {
//   matcher: [
//     '/',
//     '/home',
//     '/login',
//     '/signup',
//   ]
// }






