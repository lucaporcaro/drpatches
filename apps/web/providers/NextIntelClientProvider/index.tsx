import {
  AbstractIntlMessages,
  NextIntlClientProvider as NCProvider,
} from "next-intl";

export default function NextIntelClientProvider({
  locale,
  timeZone,
  now,
  children,
  messages,
  ...reset
}: {
  locale: string;
  timeZone?: string;
  now: Date;
  children: React.ReactNode;
  messages: AbstractIntlMessages;
}) {
  return (
    <NCProvider locale={locale} messages={messages} now={now}>
      {children}
    </NCProvider>
  );
}
