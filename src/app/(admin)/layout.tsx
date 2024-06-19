import DUMMY from "@/src/dummy";
import Header from "@/src/feature/shared/components/layout/header";
import Sidebar from "@/src/feature/shared/components/layout/sidebar";
import { getProfile } from "@/src/feature/user/api";
import { notFound } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const user = await getProfile();
    if (!user.roles.includes("ADMIN")) {
      return notFound();
    }
  } catch {
    return notFound();
  }

  return (
    <>
      <div className="hidden lg:flex transition-all fixed z-30">
        <Sidebar links={DUMMY.ADMIN_SIDEBAR_LINKS} />
      </div>
      <div className="h-full flex-auto pl-0 lg:pl-24 pt-16">
        <Header />
        <main className="flex-auto flex">{children}</main>
      </div>
    </>
  );
}
