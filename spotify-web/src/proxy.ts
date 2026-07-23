import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const proxy = (req: NextRequest) => {
    const url = req.nextUrl.pathname;
    if(url.startsWith('/signup') || url.startsWith('/login')){
        return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
    matcher: [
        {
            source: '/(signup|login)',
            has: [{ type: 'cookie', key: 'refreshToken'}]
        },
        {
            source: '/(upload|dashboard)',
            missing: [{ type: 'cookie', key: 'refreshToken'}]
        },
        {
            source: '/genre/:genre*',
            missing: [{ type: 'cookie', key: 'refreshToken'}]
        }
    ]
}