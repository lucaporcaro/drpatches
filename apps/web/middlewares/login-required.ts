import { NextRequest, NextResponse } from "next/server";
export const LoginRequired = {
  middleware(request: NextRequest) {
    if (!request.cookies.get("SESSION_TOKEN"))
      return NextResponse.redirect(new URL("/login", request.url));
  },
  matcher: /\/(create|profile|logout)/,
};
