import {usePathname, useRouter} from "next/navigation";
import {useEffect} from "react";
import {concatMap, from, map, timer} from "rxjs";

export default function useLanguageChanger(lang: string | null, locale: string) {
    // Hooks
    const pathname = usePathname();
    const router = useRouter();

    // Effects
    useEffect(() => {
        if (lang !== null) {
            from(fetch("/api/language", {
                method: "POST",
                body: JSON.stringify({
                    language: lang.toLowerCase(),
                }),
            })).pipe(
                map(() => {
                    router.replace(
                        pathname.replace(new RegExp(`^/${locale}`), `/${lang.toLowerCase()}`)
                    );
                }),
                concatMap(() => timer(1000)),
                map(() => {
                    router.refresh();
                })
            ).subscribe()
        }
    }, [lang])
}