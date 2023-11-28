import { locales } from "@app/middleware";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function LanguageSelector() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (l: string) => {
    router.push(
      pathname.replace(new RegExp(`^/${locale}`), `/${l.toLowerCase()}`)
    );
  };

  return (
    <div className="relative w-max h-max">
      <span className="peer font-bold border-b-[.5px] border-b-white pb-1 cursor-pointer text-center">
        {locale.toUpperCase()}
      </span>
      <div className="hidden peer-hover:flex hover:flex absolute right-0 top-full w-max h-max bg-white flex-col rounded-sm py-0 overflow-hidden">
        {locales.map((l, i) => (
          <div
            key={`locale_${l}`}
            className="w-max h-max"
            onClick={() => changeLocale(l)}
          >
            <span
              className="text-black font-bold transition-colors duration-300 hover:bg-primary-1 cursor-pointer p-2"
              hidden={locale === l.toLowerCase()}
            >
              {l[0]?.toUpperCase() + l.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
