"use client";
const handleLogout = async () => {
  try {
    const response = await fetch("http://localhost:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    window.location.href = "http://localhost:3000";
  } catch (error) {
    console.error(error);
  }
};

export default function LogoutButton() {
  return <button onClick={handleLogout}>Logout</button>;
}
