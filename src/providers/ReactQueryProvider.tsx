"use client";

import { QueryClient, QueryClientProvider, type QueryClientConfig } from "@tanstack/react-query";
import { type ReactNode, useMemo } from "react";

interface ReactQueryProviderProps {
  readonly children: ReactNode;
}

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
    mutations: {
      retry: 1,
    },
  },
};

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderProps): JSX.Element {
  const queryClient = useMemo(
    () => new QueryClient(queryClientConfig),
    []
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
