"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      const json = await res.json();

      console.log(json);

      window.location.href = "http://localhost:3000/login";
    } catch (err) {
      console.error(err);
    }
  };
  return <button onClick={handleLogout}>Logout</button>;
}
