import { NextRequest } from "next/server";
import middlewares from "./middlewares";

export default function middleware(request: NextRequest) {
  const key = request.url;
  const matchedMiddlewares = middlewares
    .filter((middleware) => middleware.matcher.test(request.url))
    .map((m) => m.middleware);
  for (const middleware of matchedMiddlewares) {
    const result = middleware(request);
    if (result) return result;
  }
}

export const config = {
  matcher: "/((?!api|_next|.*\\..*).*)",
};

export const runtime = "nodejs";
