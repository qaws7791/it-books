import DUMMY from "@/src/dummy";
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
      <div className="w-0 lg:w-20 transition-all overflow-hidden">
        <Sidebar links={DUMMY.SIDEBAR_LINKS} />
      </div>
      <div className="h-full flex-auto">
        <Header />
        <main className="flex-auto flex md:p-4 md:pt-0 h-main">{children}</main>
      </div>
    </>
  );
}
