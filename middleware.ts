import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// this middleware function is a workaround to get the url pathname in server components.
// this is done by accessing the pathname in middleware and adding a header 'current-path' to the request
// now server components can access the pathname using:
//   const headerList = await headers();
//   const pathname = headerList.get("current-path");

export function middleware(request: NextRequest) {
  // add a new header 'current-path' which passes the path to downstream components
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: [
    // match all routes except static files and APIs
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
