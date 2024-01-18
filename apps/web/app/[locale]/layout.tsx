import "./global.scss";

import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import NextIntelClientProvider from "@app/providers/NextIntelClientProvider";
import { getLocalMessages } from "@app/utils/messages";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import Cookies from "@app/components/Cookies";
import { locales } from "@app/middlewares/language.middleware";
import Providers from "../../providers/providers";

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
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
        <title>Dr.Patches</title>
        {/* <link rel="icon" href="/favicon_logo.ico" /> */}
         <link rel="icon" type="image/x-icon" href="../favicon_1.ico" />
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
            <Cookies />
          </Providers>
        </NextIntelClientProvider>
      </body>
    </html>
  );
}
