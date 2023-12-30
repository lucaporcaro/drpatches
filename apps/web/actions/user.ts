"use server";

import { httpClient } from "@app/lib/axios";
import { UserState } from "@app/store/slices/user";

export async function getUser() {
  return (await httpClient.get("v1/user")).data;
}

export async function updateUser(payload: object): Promise<string | UserState> {
  try {
    const { status, data } = await httpClient.patch('v1/user', payload);
    if (status !== 200)
      throw new Error('Updating the user faild');
    return data;
  } catch (e: any) {
    console.dir(e)
    return (typeof e?.response?.data?.message === "string" ? e?.response?.data?.message : e?.response?.data?.message[0]) || e.message
  }
}
