import DUMMY from "@/src/dummy";
import Header from "@/src/feature/shared/components/layout/header";
import Sidebar from "@/src/feature/shared/components/layout/sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="w-0 lg:w-24 transition-all overflow-hidden fixed">
        <Sidebar links={DUMMY.ADMIN_SIDEBAR_LINKS} />
      </div>
      <div className="h-full flex-auto ml-0 lg:ml-24">
        <Header />
        <main className="flex-auto flex">{children}</main>
      </div>
    </>
  );
}
