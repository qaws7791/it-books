import type { Metadata } from "next";
import "./globals.css";
// import "@material-design-icons/font";
import { Suspense } from "react";
import QueryProvider from "@web/src/components/QueryProvider";
import { ErrorBoundary } from "react-error-boundary";
import SonnerToaster from "@web/src/components/ui/SonnerToaster";
import Header from "@web/src/components/layout/Header";
import Sidebar from "@web/src/components/layout/Sidebar";
import DUMMY from "@web/src/dummy";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface-container min-h-screen flex flex-col text-on-background">
        <QueryProvider>
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Suspense fallback="loading...">
              <SonnerToaster />
              <Header />
              {children}
            </Suspense>
          </ErrorBoundary>
        </QueryProvider>
      </body>
    </html>
  );
}