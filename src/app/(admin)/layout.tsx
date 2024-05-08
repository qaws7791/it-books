import Sidebar from "@/src/shared/components/layout/Sidebar";
import DUMMY from "@/src/dummy";
import React from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-auto">
      <div className="w-0 2xl:w-sidebar transition-all">
        <Sidebar links={DUMMY.ADMIN_SIDEBAR_LINKS} />
      </div>
      <main className="flex-auto flex p-4 pt-0 h-main">{children}</main>
    </div>
  );
}
