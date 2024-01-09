import axios from "axios";
import { filter, lastValueFrom, map, of } from "rxjs";

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
  return lastValueFrom(
    of(document).pipe(
      filter((document) => typeof document !== "undefined"),
      map(({ cookie }) => cookie.split(";")),
      filter((cookies) => Boolean(cookies.length)),
      map((cookies) => {
        const sessionCookie = cookies.filter((c: any) =>
          c.includes("SESSION_TOKEN=")
        )[0];
        return sessionCookie ? sessionCookie.split("=")[1] : null;
      })
    )
  );
}
