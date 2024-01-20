"use server";

import { httpClient } from "@app/lib/axios";
import { catchError, from, lastValueFrom, map, throwError } from "rxjs";

export type Font = {
  id: string;
  name: string;
  image: string;
};

export async function getFonts(): Promise<Font[]> {
  return await lastValueFrom(
    from(httpClient.get<Font[]>("v1/font")).pipe(
      map(({ data }) =>
        data.map(({ image, ...font }) => ({
          ...font,
          image: `${httpClient.defaults.baseURL}${image}`,
        }))
      ),
      catchError((e) => throwError(() => e))
    )
  );
}
