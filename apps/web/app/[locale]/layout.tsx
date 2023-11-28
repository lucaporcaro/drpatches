import "./global.scss";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { locales } from "@app/middleware";
import { notFound } from "next/navigation";
import NextIntelClientProvider from "@app/providers/NextIntelClientProvider";
import { getLocalMessages } from "@app/utils/messages";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import ReduxProvider from "@app/providers/ReduxProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Dr.Patch",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}) {
  if (!locales.includes(locale)) notFound();
  const messages = await getLocalMessages(locale);
  return (
    <html lang={locale}>
      <body className={montserrat.className}>
        <NextIntelClientProvider
          locale={locale}
          messages={messages}
          now={new Date()}
        >
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
        </NextIntelClientProvider>
      </body>
    </html>
  );
}
