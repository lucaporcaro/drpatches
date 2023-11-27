import Image from "next/image";
import { useTranslations } from "next-intl";

export default function Page(): JSX.Element {
  const t = useTranslations("pages.home");
  return (
    <main>
      <span>{t("title")}</span>
    </main>
  );
}
