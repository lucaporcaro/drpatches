"use server";

import { httpClient } from "@app/lib/axios";
import { catchError, from, lastValueFrom, map, throwError } from "rxjs";

export type PatchTypeT = {
  id: string;
  image: string;
};

export async function getPatchTypes() {
  return lastValueFrom(
    from(httpClient.get<PatchTypeT[]>("v1/patch-type")).pipe(
      map(({ data }) =>
        data.map(({ image, ...data }) => ({
          ...data,
          image: httpClient.defaults.baseURL + image,
        }))
      ),
      catchError((e) => throwError(() => e))
    )
  );
}
