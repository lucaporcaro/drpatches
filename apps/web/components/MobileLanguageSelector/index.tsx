import {useLocale, useTranslations} from "next-intl";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {locales} from "@app/middlewares/language.middleware";
import useOutsideEvent from "@app/hooks/useOutsideEvent";
import useLanguageChanger from "@app/hooks/useLanguageChanger";
import {catchError, filter, from, map, of, take, throwIfEmpty} from "rxjs";

export default function MobileLanguageSelector() {
    // Refs
    const containerRef = useRef(null)

    // States
    const [open, setOpen] = useState(false)
    const [lang, setLang] = useState<string | null>(null);

    // Callbacks
    const toggle = useCallback(() => {
        setOpen(open => !open)
    }, [open])

    // Hooks
    const t = useTranslations("components.navbar");
    const locale = useLocale();
    useOutsideEvent({
        ref: containerRef, callback() {
            toggle()
        }
    })
    useLanguageChanger(lang, locale)

    // Effects
    useEffect(() => {
        if (!lang)
            setLang(locale)
    }, [locale])

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

    return <div ref={containerRef}
                className="text-white font-bold text-xs flex items-center justify-center gap-2 mt-auto relative">
        <span>{t("language")}:</span>
        <span className="border-b-[.5px] border-b-white pb-1" onClick={toggle}>{selectedLang}</span>
        {open ? <div
            className='absolute bottom-8 right-0 w-max h-max flex flex-col items-center justify-center bg-gray-800 rounded-md overflow-hidden'>
            {locales.map(({label, code}) =>
                <div key={`mobile_lang_selector_${code}`}
                     className="w-full py-2 px-2 bg-transparent active:bg-primary-1 active:text-black transition-colors duration-150 text-center"
                     onClick={() => {
                         setLang(code)
                         toggle()
                     }}
                >
                    <span className="font-semibold text-xs">{label}</span>
                </div>
            )}
        </div> : null}
    </div>
}