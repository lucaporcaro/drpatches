import { catchError, from, lastValueFrom, map, throwError } from "rxjs";

export async function getLocalMessages(locale: string) {
  return lastValueFrom(
    from(import(`../messages/${locale}`)).pipe(
      map((locale) => locale.default),
      catchError((e) => throwError(() => e))
    )
  );
}
