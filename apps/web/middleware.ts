import createMiddleware from "next-intl/middleware";

export const locales = ["en"];

export default createMiddleware({
  locales: locales,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en)/:path*"],
};
