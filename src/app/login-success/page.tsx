"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // nếu dùng Next.js App Router

export default function LoginSuccess() {
    const router = useRouter();

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await fetch("http://localhost:3000/user/me", {
                    method: "GET",
                    credentials: "include", // Quan trọng: gửi cookie kèm request
                });

                if (res.ok) {
                    const user = await res.json();
                    console.log("Đăng nhập thành công:", user);
                    router.push("/"); // hoặc window.location.href = "/"
                } else {
                    router.push("/login");
                }
            } catch (error) {
                console.error("Lỗi kiểm tra login:", error);
                router.push("/login");
            }
        };

        checkLogin();
    }, [router]);

    return <p>Đang xử lý đăng nhập Google...</p>;
}