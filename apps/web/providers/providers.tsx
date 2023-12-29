"use client";
import { montserrat } from "@app/app/[locale]/layout";
import ReduxProvider from "@app/providers/ReduxProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import UserProvider from "./UserProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const client = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <QueryClientProvider client={client}>
        <UserProvider>{children}</UserProvider>
        <ToastContainer
          autoClose={3000}
          closeOnClick
          position="bottom-right"
          theme="dark"
          toastClassName={montserrat.className}
        />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ReduxProvider>
  );
}
