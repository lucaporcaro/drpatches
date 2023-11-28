import createMiddleware from "next-intl/middleware";

export const locales = ["en", "fa"];

export default createMiddleware({
  locales: locales,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
