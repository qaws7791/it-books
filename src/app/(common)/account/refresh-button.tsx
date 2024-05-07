"use client";

export default function RefreshButton() {
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Refresh failed");
      }

      const json = await res.json();

      console.log("refresh res:", json);
    } catch (err) {
      console.error(err);
    }
  };
  return <button onClick={handleLogout}>Refresh</button>;
}
