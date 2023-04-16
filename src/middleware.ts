import { NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';

import { FILE_EXTENSIONS } from '@/constants';
import { LOCALE_DEFAULT, LOCALES } from '@/constants/i18n';

acceptLanguage.languages([...LOCALES]);

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};

export function middleware(req: NextRequest) {
  const ext = req.url.split('.').pop();
  if (ext && FILE_EXTENSIONS.includes(ext)) return NextResponse.next();

  let lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  if (!lng) lng = LOCALE_DEFAULT;

  // Redirect if lng in path is not supported
  if (
    !LOCALES.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith(`/cover`) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url));
  }

  return NextResponse.next();
}
