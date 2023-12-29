"use server";

import { httpClient } from "@app/lib/axios";

export async function getUser() {
  return (await httpClient.get("v1/user")).data;
}
