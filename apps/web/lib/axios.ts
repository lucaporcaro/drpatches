import axios from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

httpClient.interceptors.request.use(
  async (config) => {
    let token: null | string = await getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

async function getToken() {
  if (typeof document !== "undefined")
    return (document as any).cookie
      .split(";")
      .filter((c: any) => c.includes("jwt_token="))[0]
      .split("=")[1];
  else return await import("next/headers").then(({ cookies }) => cookies().get("jwt_token")?.value);
}
