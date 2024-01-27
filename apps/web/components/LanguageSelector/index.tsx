import {locales} from "@app/middlewares/language.middleware";
import {useLocale} from "next-intl";
import ReactCountryFlag from "react-country-flag";
import {useEffect, useMemo, useState} from "react";
import useLanguageChanger from "@app/hooks/useLanguageChanger";
import {catchError, filter, from, map, of, take, throwIfEmpty} from "rxjs";

export default function LanguageSelector() {
    // States
    const [lang, setLang] = useState<string | null>(null);

    // Hooks
    const locale = useLocale();
    useLanguageChanger(lang, locale)

    // Memos
    const selectedLang = useMemo(() => {
        let lang = '';
        const selectedLocal$ = from(locales).pipe(
            filter(({code}) => code === locale),
            throwIfEmpty(() => new Error),
            map(({label}) => label),
            take(1),
            catchError(() => of(null))
        )

        selectedLocal$.subscribe((selectedLang) => {
            if (selectedLang)
                lang = selectedLang;
        })

        return lang;
    }, [locale])

    // Effects
    useEffect(() => {
        if (!lang)
            setLang(locale)
    }, [locale])
    return (
        <div className="relative w-max h-max">
      <span className="peer font-bold border-b-[.5px] border-b-white pb-1 cursor-pointer text-center">
        {selectedLang}
      </span>
            <div
                className="hidden peer-hover:flex hover:flex absolute right-0 top-full w-max h-max bg-white flex-col rounded-sm py-0 overflow-hidden">
                {locales.map((l) => (
                    <div
                        key={`locale_${l.code}`}
                        className="w-full h-max flex items-center justify-around gap-1 transition-colors duration-300 hover:bg-primary-1 cursor-pointer px-2 py-1.5"
                        onClick={() => setLang(l.code)}
                        hidden={locale === l.code.toLowerCase()}
                    >
                        <ReactCountryFlag countryCode={l.flag} svg/>
                        <span className="text-black font-medium text-xs uppercase">
              {l.label}
            </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
