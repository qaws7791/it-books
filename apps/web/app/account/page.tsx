import { cookies } from "next/headers";
export default async function AccountPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token");
  console.log("token", token);
  if (!token) {
    return <div>Not authorized</div>;
  }
  try {
    const res = await fetch("http://localhost:4000/profile", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    console.log("res", res);
    if (!res.ok) {
      throw new Error("Not authorized");
    }
    const profile = await res.json();
    console.log("profile", profile);
    return (
      <div>
        <h1>Account</h1>
        <pre>{JSON.stringify(profile, null, 2)}</pre>
      </div>
    );
  } catch (err) {
    console.error(err);
    return <div>Error</div>;
  }
}
