import { NextRequest } from "next/server";
import { updateSession } from "./action/lib";

export async function middleware(request: NextRequest) {
    const currentUser = request.cookies.get('session')?.value;
    
    const protectedRoutes = []

    if(!currentUser && (request.nextUrl.pathname.startsWith('/user/settings')
        || request.nextUrl.pathname.startsWith('/recipe/create')
        || request.nextUrl.pathname.startsWith('/recipe/edit')
        || request.nextUrl.pathname.startsWith('/signup/personal-info')
        || request.nextUrl.pathname.startsWith('/signup/finish')
        || request.nextUrl.pathname.startsWith('/admin/blog/edit')
        || request.nextUrl.pathname.startsWith('/admin/blog/create')
    )) {
        return Response.redirect(new URL('/login', request.url));
    }

    if (currentUser && request.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/user', request.url));
    }

    if(currentUser) {
        return updateSession(request);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}