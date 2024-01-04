import "./global.scss";

import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import NextIntelClientProvider from "@app/providers/NextIntelClientProvider";
import { getLocalMessages } from "@app/utils/messages";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import { locales } from "@app/middlewares/language.middleware";
import Providers from "../../providers/providers";
import UserProvider from "@app/providers/UserProvider";
import PriceProvider from "@app/providers/PriceProvider";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  if (!locales.map((l) => l.code).includes(locale)) notFound();
  const messages = await getLocalMessages(locale);

  return (
    <html lang={locale}>
      <head>
        <title>Dr.Patch</title>
      </head>
      <body
        className={[
          montserrat.className,
          "flex flex-col items-center justify-center",
        ].join(" ")}
      >
        <NextIntelClientProvider
          locale={locale}
          messages={messages}
          now={new Date()}
        >
          <Providers>
            <Navbar />
            {children}
            <Footer />
          </Providers>
        </NextIntelClientProvider>
      </body>
    </html>
  );
}
