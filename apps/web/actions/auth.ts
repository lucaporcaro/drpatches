"use server";

import { httpClient } from "@app/lib/axios";
import { cookies } from "next/headers";
import { add } from "date-fns";

export async function login(email: string, password: string): Promise<boolean> {
  try {
    const { status, data } = await httpClient.post("v1/authentication/login", {
      email,
      password,
    });
    if (status !== 201) throw new Error();
    cookies().set("SESSION_TOKEN", data.token, {
      expires: add(new Date(), { days: 7 }),
      sameSite: "strict",
      secure: true,
      name: "SESSION_TOKEN",
      priority: "high",
      value: data.token,
    });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function register(payload: object) {
  try {
    const { status, data } = await httpClient.post(
      "v1/authentication/register",
      payload
    );
    if (status !== 201) throw new Error();
    cookies().set("SESSION_TOKEN", data.token);
    return true;
  } catch (e: any) {
    console.error(e);
    return e.response?.data.message[0] || "Request faild";
  }
}
