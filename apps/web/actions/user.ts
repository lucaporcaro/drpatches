"use server";

import { httpClient } from "@app/lib/axios";
import { UserState } from "@app/store/slices/user";
import { catchError, from, lastValueFrom, map, of, throwError } from "rxjs";

export async function getUser(jwt: string) {
  return lastValueFrom(
    from(
      httpClient.get("v1/user", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    ).pipe(
      map(({ data }) => data),
      catchError((e) => throwError(() => e))
    )
  );
}

export async function updateUser(payload: object): Promise<string | UserState> {
  return lastValueFrom(
    from(httpClient.patch("v1/user", payload)).pipe(
      map(({ data }) => data),
      catchError((e) =>
        of(
          (typeof e?.response?.data?.message === "string"
            ? e?.response?.data?.message
            : e?.response?.data?.message[0]) || e.message
        )
      )
    )
  );
}
