import axios, { AxiosError } from "axios";

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

httpClient.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
