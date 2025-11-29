import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  // Các route yêu cầu đăng nhập
  const needAuth =
    req.nextUrl.pathname.startsWith("/profile") ||
    req.nextUrl.pathname.startsWith("/orders") ||
    req.nextUrl.pathname.startsWith("/changepassword") ||
    req.nextUrl.pathname.startsWith("/admin");

  // Không có token mà đang truy cập trang cần đăng nhập
  if (!token && needAuth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Nếu có token
  if (token) {
    try {
      // ✅ Middleware không chạy Node Buffer, nên dùng atob
      const base64Payload = token.split(".")[1];
      const payloadString = typeof window === "undefined"
        ? Buffer.from(base64Payload, "base64").toString("utf-8")
        : atob(base64Payload);
      const payload = JSON.parse(payloadString);

      // Nếu token hết hạn
      if (payload.exp && Date.now() >= payload.exp * 1000) {
        const res = NextResponse.redirect(new URL("/login", req.url));
        res.cookies.delete("token");
        return res;
      }

      // Nếu truy cập admin mà không phải admin
      if (req.nextUrl.pathname.startsWith("/admin") && payload.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("Invalid token:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Áp dụng cho các route được bảo vệ
export const config = {
  matcher: [
    "/profile/:path*",
    "/orders/:path*",
    "/changepassword/:path*",
    "/admin/:path*",
  ],
};
