"use client";
const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:4000/auth/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Refresh failed");
    }
  } catch (error) {
    console.error(error);
  }
};

export default function RefreshButton() {
  return <button onClick={handleLogout}>Refresh</button>;
}
