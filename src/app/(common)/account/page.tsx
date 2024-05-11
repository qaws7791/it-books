import LogoutButton from "@/src/app/(common)/account/logout-button";
import RefreshButton from "@/src/app/(common)/account/refresh-button";
import { getProfile } from "@/src/user/api";
import { cookies } from "next/headers";
export default async function AccountPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");

  if (!token) {
    return <div>Not authorized</div>;
  }
  try {
    const profile = await getProfile();

    return (
      <div>
        <h1>Account</h1>
        <p>Username: {profile.name}</p>
        <p>Email: {profile.email}</p>
        <LogoutButton />
        <RefreshButton />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error</div>;
  }
}
