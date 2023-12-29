import { NextRequest, NextResponse } from "next/server";
export const LoginRequired = {
  middleware(request: NextRequest) {
    if (!request.cookies.get("jwt_token"))
      return NextResponse.redirect(new URL("/login", request.url));
  },
  matcher: /\/(create|profile)/,
};
