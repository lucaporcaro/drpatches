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
