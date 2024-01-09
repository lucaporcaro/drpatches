"use server";

import { httpClient } from "@app/lib/axios";
import { cookies } from "next/headers";
import { add } from "date-fns";
import { catchError, from, lastValueFrom, map, of } from "rxjs";

export async function login(email: string, password: string) {
  return lastValueFrom(
    from(
      httpClient.post("v1/authentication/login", {
        email,
        password,
      })
    ).pipe(
      map(({ data: { token } }) => token as string),
      catchError(() => of(false))
    )
  );
}

export async function register(payload: object) {
  return lastValueFrom(
    from(httpClient.post("v1/authentication/register", payload)).pipe(
      map(({ data: { token } }) => token as string),
      catchError((e) =>
        of({
          error: (e.response?.data.message[0] as string) || "Request faild",
        })
      )
    )
  );
}
