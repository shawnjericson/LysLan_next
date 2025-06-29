// middleware.js (chính xác 100%)
import { NextResponse } from 'next/server';

const routeRewriteMap = {
    vi: {
        '/vi/about': '/vi/gioi-thieu',
        '/vi/products': '/vi/san-pham',
        '/vi/contact': '/vi/lien-he',
        '/vi/news': '/vi/tin-tuc',
    },
    en: {
        // Nếu muốn rewrite ngược lại
        '/en/about': '/en/about-us',
        // ...
    }
};

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const locales = ['en', 'vi'];
    const defaultLocale = 'vi';
    console.log('💡 Middleware triggered:', request.nextUrl.pathname);
    const pathnameHasLocale = locales.some(
        (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );

    if (!pathnameHasLocale) {
        return NextResponse.redirect(new URL(`/${defaultLocale}${pathname}`, request.url));
    }

    const locale = pathname.split('/')[1]; // vi or en
    const redirectMap = routeRewriteMap[locale];

    if (redirectMap && redirectMap[pathname]) {
        const target = redirectMap[pathname];
        return NextResponse.redirect(new URL(target, request.url));
    }


    return NextResponse.next();
}


export const config = {
    matcher: [
        '/((?!api|_next|favicon.ico|.*\\.).*)', // đúng cú pháp
    ],
};