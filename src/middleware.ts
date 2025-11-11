import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
//   const isAdmin = req.cookies.get("role")?.value === "admin";

//   if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

  return NextResponse.next();
}
