import { UserProfile } from "@/src/feature/user/types";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const user = await getUserProfile(token);

    if (!user.roles.includes("ADMIN")) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

async function getUserProfile(token: string) {
  const response = await fetch("http://localhost:4000/api/users/me", {
    headers: {
      Cookie: `access_token=${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const user = (await response.json()) as UserProfile;
  return user;
}
