import DUMMY from "@/src/dummy";
import Footer from "@/src/feature/shared/components/layout/footer";
import Header from "@/src/feature/shared/components/layout/header";
import Sidebar from "@/src/feature/shared/components/layout/sidebar";
import React from "react";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden lg:flex transition-all fixed z-30">
        <Sidebar links={DUMMY.SIDEBAR_LINKS} />
      </div>

      <div className="h-full flex-auto pl-0 lg:pl-24 pt-16">
        <Header />
        <div>
          <main className="flex-auto flex">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
}
