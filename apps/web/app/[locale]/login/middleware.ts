import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  console.log("Matched");
  if (!request.cookies.has("jwt_token")) return NextResponse.redirect("/");
}

// export const config = {
//   matcher: ["/(login|register)"],
// };
