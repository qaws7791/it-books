import { UserProfile } from "@/src/feature/user/types";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("access_token")?.value;
    console.log("middleware 1.token:", token);
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const user = await getUserProfile(token);
      console.log("middleware 2. user:", user);
      if (!user.roles.includes("ADMIN")) {
        return NextResponse.rewrite(new URL("/not-found", request.url));
      }
    } catch (error) {
      console.error("middleware 3. error:", error);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

async function getUserProfile(token: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL!}/api/users/me`,
    {
      headers: {
        Cookie: `access_token=${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  const user = (await response.json()) as UserProfile;
  return user;
}
