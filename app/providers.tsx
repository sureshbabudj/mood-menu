"use client";

import type { PropsWithChildren } from "react";
import { Provider } from "jotai";
import { HelmetProvider } from "react-helmet-async";

import { store } from "@/lib/store";
import { Auth } from "@/components/auth-provider";
import ErrorBoundary from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <ErrorBoundary>
          <Auth>
            {children}
            <Toaster />
          </Auth>
        </ErrorBoundary>
      </HelmetProvider>
    </Provider>
  );
}
