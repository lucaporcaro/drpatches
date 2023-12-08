import { locales } from "@app/middleware";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (l: string) => {
    fetch("/api/language", {
      method: "POST",
      body: JSON.stringify({
        language: l.toLowerCase(),
      }),
    }).then(() => {
      router.push(
        pathname.replace(new RegExp(`^/${locale}`), `/${l.toLowerCase()}`)
      );
      router.refresh();
    });
  };

  return (
    <div className="relative w-max h-max">
      <span className="peer font-bold border-b-[.5px] border-b-white pb-1 cursor-pointer text-center">
        {locales.filter((l) => l.code === locale)[0]?.label || ""}
      </span>
      <div className="hidden peer-hover:flex hover:flex absolute right-0 top-full w-max h-max bg-white flex-col rounded-sm py-0 overflow-hidden">
        {locales.map((l) => (
          <div
            key={`locale_${l.code}`}
            className="w-max h-max"
            onClick={() => changeLocale(l.code)}
          >
            <span
              className="text-black font-bold transition-colors duration-300 hover:bg-primary-1 cursor-pointer p-2"
              hidden={locale === l.code.toLowerCase()}
            >
              {l.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
