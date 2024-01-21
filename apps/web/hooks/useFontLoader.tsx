import { useState, useEffect } from "react";
import { catchError, from, of, switchMap, tap } from "rxjs";

const useFontLoader = (fontUrl: string | undefined) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (!fontUrl) return;
    const subscription = from(fetch(fontUrl))
      .pipe(
        switchMap((response) => from(response.blob())),
        switchMap((fontBlob) => {
          const fontData = URL.createObjectURL(fontBlob);
          const fontFace = new FontFace("CustomFont", `url(${fontData})`);
          return from(fontFace.load());
        }),
        tap((loadedFont) => {
          document.fonts.add(loadedFont);
          setFontLoaded(true);
        }),
        catchError((error) => {
          console.error("Font loading failed:", error);
          setFontLoaded(false);
          return of(undefined);
        })
      )
      .subscribe();

    return () => subscription.unsubscribe();
  }, [fontUrl]);

  return fontLoaded;
};

export default useFontLoader;
