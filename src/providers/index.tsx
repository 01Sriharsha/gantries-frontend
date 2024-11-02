"use client";

import { Fragment, PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import AuthProvider from "./auth-provider";

const queryClient = new QueryClient();

/** Every providers goes here */
export default function AppProvider({ children }: PropsWithChildren) {
  return (
    <Fragment>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster richColors closeButton position="bottom-right" />
      </QueryClientProvider>
    </Fragment>
  );
}
