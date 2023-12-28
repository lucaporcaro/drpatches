import { NextRequest, NextResponse } from "next/server";

export const NoLoginMiddleware = {
  middleware(request: NextRequest) {
    if (request.cookies.has("jwt_token"))
      return NextResponse.redirect(new URL("/", request.url));
  },
  matcher: /(login|register)/,
};
