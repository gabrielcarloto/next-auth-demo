import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';
import parseUrl from '../lib/parseUrl';

export default async function handle(req: NextRequest, res: NextResponse) {
  const signInPage = '/login';
  const errorPage = '/login';
  const basePath = parseUrl(process.env.NEXTAUTH_URL).path;

  if (
    req.nextUrl.pathname.startsWith(basePath) ||
    [signInPage, errorPage].includes(req.nextUrl.pathname)
  ) {
    return;
  }

  const requestForNextAuth: any = {
    headers: {
      cookie: req.headers.get('cookie'),
    },
  };

  const session = await getSession({ req: requestForNextAuth });

  if (session) {
    return NextResponse.next();
  }

  const signInUrl = new URL(signInPage, req.nextUrl.origin);
  return NextResponse.redirect(signInUrl);
}
