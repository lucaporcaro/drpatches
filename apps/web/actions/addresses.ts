"use server";

import { httpClient } from "@app/lib/axios";
import { catchError, from, lastValueFrom, map, of, throwError } from "rxjs";

export async function getAllAddresses(jwtToken: string): Promise<AddressT[]> {
  return lastValueFrom(
    from(
      httpClient.get("v1/addresses/all", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    ).pipe(
      map(({ data }) => data),
      catchError((e) => throwError(() => e))
    )
  );
}

export async function getAddress(
  id: string,
  jwtToken: string
): Promise<AddressT> {
  return lastValueFrom(
    from(
      httpClient.get(`v1/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    ).pipe(
      map(({ data }) => data),
      catchError((e) => throwError(() => e))
    )
  );
}

export async function createAddress(
  payload: object,
  jwtToken: string
): Promise<true | string> {
  return lastValueFrom(
    from(
      httpClient.post("v1/addresses", payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    ).pipe(
      map(() => true),
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

export async function updateAddress(
  payload: object,
  id: string,
  jwtToken: string
): Promise<true | string> {
  return lastValueFrom(
    from(
      httpClient.patch(`v1/addresses/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    ).pipe(
      map(() => true),
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

export async function deleteAddress(
  id: string,
  jwtToken: string
): Promise<true | string> {
  return lastValueFrom(
    from(
      httpClient.delete(`v1/addresses/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    ).pipe(
      map(() => true),
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

export type AddressT = {
  id: string;
  receiverName: string;
  receiverPhone: string;
  country: string;
  province: string;
  city: string;
  zipCode: string;
  location: string;
};
