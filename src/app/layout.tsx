import type { Metadata } from "next";
import "./globals.css";
// import "@material-design-icons/font";
import { GoogleLoginProvider } from "@/src/auth/hooks/use-google-login";
import QueryProvider from "@/src/shared/components/query-provider";
import { ThemeProvider } from "@/src/shared/components/theme-provider";
import SonnerToaster from "@/src/shared/components/ui/sonner-toaster";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/src/shared/constants/site-config.constant";
import Head from "next/head";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      <body className="bg-surface min-h-screen flex text-on-background">
        <ErrorBoundary fallback={<div>Something went wrong</div>}>
          <ThemeProvider>
            <QueryProvider>
              <GoogleLoginProvider>
                <Suspense fallback="loading...">
                  <SonnerToaster />
                  {children}
                </Suspense>
              </GoogleLoginProvider>
            </QueryProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
