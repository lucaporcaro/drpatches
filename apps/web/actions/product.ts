/** @format */

"use server";

import { httpClient } from "@app/lib/axios";
import { CreateProductState } from "@app/store/slices/createProduct";
import { catchError, from, lastValueFrom, map, throwError } from "rxjs";
import { json } from "stream/consumers";

export async function createProduct(
  type: "image" | "text",
  jwt: string
): Promise<CreateProductState> {
  return lastValueFrom(
    from(
      httpClient.post(
        "/v1/product",
        { type },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
    ).pipe(
      map(({ data }) => data),
      catchError((e) => throwError(() => e))
    )
  );
}

export async function getProduct(
  id: string,
  jwt: string | null = null
): Promise<CreateProductState> {
  return lastValueFrom(
    from(
      httpClient.get(`/v1/product/${id}`, {
        headers: {
          Authorization: !jwt ? undefined : `Bearer ${jwt}`,
        },
      })
    ).pipe(
      map(({ data }) => data),
      catchError((e) => throwError(() => e))
    )
  );
}

export async function getCart(jwt: string) {
  return lastValueFrom(
    from(
      httpClient.get(`/v1/cart`, {
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

export async function getProductinDB(listl: any) {
  const data = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}v1/product/select`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      products: listl,
    }),
  }).then((res) => {
    return res.json();
  });

  return data;
}
export async function getAllProducts(
  jwt: string
): Promise<CreateProductState[]> {
  return lastValueFrom(
    from(
      httpClient.get(`/v1/product/all`, {
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
