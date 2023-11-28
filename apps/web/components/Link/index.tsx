import { useLocale } from "next-intl";
import L, { LinkProps } from "next/link";

export default function Link({
  children,
  ...props
}: LinkProps & { children: React.ReactNode }) {
  const locale = useLocale();
  return (
    <L locale={locale} {...props}>
      {children}
    </L>
  );
}
