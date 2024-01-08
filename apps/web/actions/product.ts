"use server";

import { httpClient } from "@app/lib/axios";
import { CreateProductState } from "@app/store/slices/createProduct";

export async function createProduct(
  type: "image" | "text",
  jwt: string
): Promise<CreateProductState> {
  try {
    return (
      await httpClient.post(
        "/v1/product",
        { type },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
    ).data;
  } catch (e: any) {
    console.dir(e.response.data);
    throw new Error();
  }
}

export async function getProduct(
  id: string,
  jwt: string
): Promise<CreateProductState> {
  try {
    return (
      await httpClient.get(`/v1/product/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    ).data;
  } catch (e: any) {
    console.dir(e.response.data);
    throw new Error();
  }
}

export async function getAllProducts(
  jwt: string
): Promise<CreateProductState[]> {
  try {
    return (
      await httpClient.get(`/v1/product/all`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    ).data;
  } catch (e: any) {
    console.dir(e.response.data);
    throw new Error();
  }
}
