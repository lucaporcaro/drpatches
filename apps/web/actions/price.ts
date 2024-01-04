"use server";

import { httpClient } from "@app/lib/axios";

export async function getPrices(): Promise<
  Record<string, Record<string | number, number>>
> {
  return (await httpClient.get("v1/prices")).data;
}
