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
      <Header />
      <div className="flex h-full flex-auto">
        <div className="w-0 lg:w-20 transition-all overflow-hidden">
          <Sidebar links={DUMMY.ADMIN_SIDEBAR_LINKS} />
        </div>
        <main className="flex-auto flex p-4 pt-0 h-main">{children}</main>
      </div>
    </>
  );
}
