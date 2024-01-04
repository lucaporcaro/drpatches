"use server";

import { httpClient } from "@app/lib/axios";
import { CreateProductState } from "@app/store/slices/createProduct";

export async function createProduct(
  type: "image" | "text"
): Promise<CreateProductState> {
  try {
    return (await httpClient.post("/v1/product", { type })).data;
  } catch (e: any) {
    console.dir(e.response.data);
    throw new Error();
  }
}

export async function getProduct(id: string) {
  try {
    return (await httpClient.get(`/v1/product/${id}`)).data;
  } catch (e: any) {
    console.dir(e.response.data);
    throw new Error();
  }
}

export async function getAllProducts(): Promise<CreateProductState[]> {
  try {
    return (await httpClient.get(`/v1/product/all`)).data;
  } catch (e: any) {
    console.dir(e.response.data);
    throw new Error();
  }
}
