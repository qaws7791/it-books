import type { Metadata } from "next";
import "./globals.css";
// import "@material-design-icons/font";
import { GoogleLoginProvider } from "@/src/feature/auth/hooks/use-google-login";
import QueryProvider from "@/src/feature/shared/components/query-provider";
import { ThemeProvider } from "@/src/feature/shared/components/theme-provider";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/src/feature/shared/constants/site-config.constant";
import SonnerToaster from "@/src/ui/components/sonner-toaster";
import { ScrollbarMarginProvider } from "@/src/ui/hooks/use-scrollbar-margin";
import Head from "next/head";
import { Suspense } from "react";

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
    <html lang="ko" suppressHydrationWarning className="scrollbar">
      <Head>
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </Head>
      <body className="bg-surface min-h-screen text-on-background relative">
        <ThemeProvider>
          <QueryProvider>
            <GoogleLoginProvider>
              <Suspense fallback="loading...">
                <SonnerToaster />
                <ScrollbarMarginProvider>{children}</ScrollbarMarginProvider>
              </Suspense>
            </GoogleLoginProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
