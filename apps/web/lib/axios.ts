import axios from "axios";
import { cookies } from "next/headers";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    let token: null | string = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

function getToken() {
  if (typeof document !== "undefined")
    return (document as any).cookie
      .split(";")
      .filter((c: any) => c.includes("jwt_token="))[0]
      .split("=")[1];
  else return cookies().get("jwt_token")?.value;
}
