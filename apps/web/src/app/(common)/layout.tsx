import Sidebar from "@web/src/components/layout/Sidebar";
import DUMMY from "@web/src/dummy";
import React from "react";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full flex-auto">
      <div className="w-0 xl:w-sidebar transition-all">
        <Sidebar links={DUMMY.SIDEBAR_LINKS} />
      </div>
      <main className="flex-auto flex p-4 pt-0 h-main">{children}</main>
    </div>
  );
}
