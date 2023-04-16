import Negotiator from 'negotiator';
import { NextRequest, NextResponse } from 'next/server';

import { LOCALES, LOCALE_DEFAULT } from '@/constants/i18n';

function getBestLocale(request: NextRequest) {
  let locale: string | undefined;
  try {
    /* @ts-expect-error weird headers */
    locale = new Negotiator({ headers: request.headers }).language(LOCALES);
  } catch (err) {
    console.error(err);
    locale = undefined;
  }
  return locale || LOCALE_DEFAULT;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const isFile = !pathname.split('.').pop()?.startsWith('/');
  if (isFile) return NextResponse.next();

  const pathnameIsMissingLocale = LOCALES.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  if (!pathnameIsMissingLocale) return NextResponse.next();

  const locale = getBestLocale(request);
  return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
};
