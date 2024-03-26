import { cookies } from "next/headers";
export default async function AccountPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("token", token);
  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  try {
    const user = await fetch("http://localhost:4000/account", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    }).then((res) => res.json());
    return (
      <div>
        <h1>Account</h1>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    );
  } catch (err) {
    console.error(err);
    return <div>Error</div>;
  }
}
