import AdminSideBar from "@web/src/app/admin/_components/AdminSideBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-auto gap-4">
      <aside>
        <nav className="h-full">
          <AdminSideBar />
        </nav>
      </aside>
      <div className="flex-auto">{children}</div>
    </div>
  );
}
