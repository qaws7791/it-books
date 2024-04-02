import AdminSideBar from "@web/src/app/admin/_components/AdminSideBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSideBar />
      <div>{children}</div>
    </div>
  );
}
