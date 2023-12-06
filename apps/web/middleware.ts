import createMiddleware from "next-intl/middleware";

export const locales = [
  { code: "en", label: "English" },
  { code: "ara", label: "Arabic" },
  { code: "chi", label: "Chinese" },
  { code: "deu", label: "German" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "it", label: "Italian" },
  { code: "por", label: "Portuguese" },
  { code: "rus", label: "Russian" },
];

const localesCode = locales.map((locale) => locale.code);

export default createMiddleware({
  locales: localesCode,
  defaultLocale: "en",
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
