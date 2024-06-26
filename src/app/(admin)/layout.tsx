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
      <div className="hidden lg:flex transition-all fixed z-30">
        <Sidebar links={DUMMY.ADMIN_SIDEBAR_LINKS} />
      </div>
      <div className="h-full flex-auto pl-0 lg:pl-22">
        <Header />
        <main className="flex-auto flex">{children}</main>
      </div>
    </>
  );
}
