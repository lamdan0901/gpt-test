import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  if (!req.nextUrl.href.includes('/?')) {
    return NextResponse.next();
  }

  req.nextUrl.href = req.nextUrl.href.replace('/?', '?');
  return NextResponse.rewrite(req.nextUrl);
}

export const config = {
  matcher: '/api/:path*',
};
