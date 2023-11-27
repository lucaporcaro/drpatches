import { getRequestConfig } from "next-intl/server";

module.exports = getRequestConfig(async ({ locale }) => ({
  messages: (await import(`messages/${locale}`)).default,
}));
