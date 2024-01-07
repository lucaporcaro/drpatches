import { NextRequest, NextResponse } from "next/server";

export const NoLoginMiddleware = {
  middleware(request: NextRequest) {
    if (request.cookies.has("SESSION_TOKEN"))
      return NextResponse.redirect(new URL("/", request.url));
  },
  matcher: /(login|register)/,
};
