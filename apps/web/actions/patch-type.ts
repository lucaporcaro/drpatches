"use server";

import { httpClient } from "@app/lib/axios";
import { catchError, from, lastValueFrom, map, throwError } from "rxjs";

export type PatchTypeT = {
  id: string;
  image: string;
};

export async function getPatchTypes(): Promise<PatchTypeT[]> {
  return lastValueFrom(
    from(httpClient.get("v1/patch-type")).pipe(
      map(({ data: { image, ...data } }) => ({
        image: httpClient.defaults.baseURL + image,
        ...data,
      })),
      catchError((e) => throwError(() => e))
    )
  );
}
