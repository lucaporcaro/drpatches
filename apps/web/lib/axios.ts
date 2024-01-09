import axios from "axios";
import { filter, lastValueFrom, map, of } from "rxjs";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

httpClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);
