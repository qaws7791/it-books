import LogoutButton from "@/src/app/(common)/account/logout-button";
import RefreshButton from "@/src/app/(common)/account/refresh-button";
import { cookies } from "next/headers";
export default async function AccountPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return <div>Not authorized</div>;
  }
  try {
    const res = await fetch("http://localhost:4000/api/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    if (!res.ok) {
      throw new Error("Not authorized");
    }
    const profile = await res.json();

    return (
      <div>
        <h1>Account</h1>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
        <LogoutButton />
        <RefreshButton />
      </div>
    );
  } catch (err) {
    console.error(err);
    return <div>Error</div>;
  }
}
