import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/layouts/AppLayout";

// Define routes that don’t need layout or auth
const publicRoutes = ["/", "/auth", "/auth/callback", "/404"];

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const isPublic = publicRoutes.includes(router.pathname);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      router.push("/auth");
    }
  }, [user, loading, isPublic, router]);

  if (!user && !isPublic) {
    return null; // Or a spinner/loading indicator
  }

  return <>{children}</>;
}

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublic = publicRoutes.includes(router.pathname);
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false,
      },
    },
  }));

  const content = isPublic ? (
    <Component {...pageProps} />
  ) : (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <AuthGuard>
            {content}
            <Toaster />
          </AuthGuard>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
