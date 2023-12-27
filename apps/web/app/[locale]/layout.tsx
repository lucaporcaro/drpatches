import "./global.scss";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import NextIntelClientProvider from "@app/providers/NextIntelClientProvider";
import { getLocalMessages } from "@app/utils/messages";
import Navbar from "@app/components/Navbar";
import Footer from "@app/components/Footer";
import ReduxProvider from "@app/providers/ReduxProvider";
import { ToastContainer } from "react-toastify";
import { locales } from "@app/middlewares/language.middleware";

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
  if (!locales.map((l) => l.code).includes(locale)) notFound();
  const messages = await getLocalMessages(locale);
  return (
    <html lang={locale}>
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
          <ReduxProvider>
            <Navbar />
            {children}
            <Footer />
          </ReduxProvider>
          <ToastContainer
            autoClose={3000}
            closeOnClick
            position="bottom-right"
            theme="dark"
            toastClassName={montserrat.className}
          />
        </NextIntelClientProvider>
      </body>
    </html>
  );
}
