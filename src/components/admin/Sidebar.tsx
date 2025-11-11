"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

export default function Sidebar({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}) {
    const pathname = usePathname();

    // Khi đổi route → tự ẩn sidebar (mobile)
    useEffect(() => {
        setIsOpen(false);
    }, [pathname, setIsOpen]);

    return (
        <>
            {/* Nền mờ khi mở sidebar trên mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 z-40
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                {/* Sidebar container chia trên/dưới */}
                <div className="flex flex-col justify-between h-full">
                    {/* --- Phần trên: Logo + Menu --- */}
                    <div>
                        {/* Logo + nút đóng */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <div>
                                <h1 className="text-xl font-semibold">Miuwoof</h1>
                                <p className="text-sm text-gray-400">Quản lý hệ thống</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="md:hidden p-1 rounded hover:bg-gray-800"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Menu */}
                        <nav className="mt-4 flex flex-col space-y-1">
                            <Link href="/admin" className="px-4 py-3 hover:bg-gray-800 text-gray-300">🏠 Tổng quan</Link>
                            <Link href="/admin/orders" className="px-4 py-3 hover:bg-gray-800 text-gray-300">🛒 Đơn hàng</Link>
                            <Link href="#" className="px-4 py-3 hover:bg-gray-800 text-gray-300">👥 Khách hàng</Link>
                            <Link href="#" className="px-4 py-3 hover:bg-gray-800 text-gray-300">📦 Sản phẩm</Link>
                            <Link href="#" className="px-4 py-3 hover:bg-gray-800 text-gray-300">⚙️ Cài đặt</Link>
                        </nav>
                    </div>

                    {/* --- Phần dưới: Thông tin tài khoản --- */}
                    <div className="p-4 border-t border-gray-700">
                        <div className="flex items-center">
                            <span className="text-cyan-400 mr-2">👤</span>
                            <div>
                                <p className="text-sm font-medium">Admin User</p>
                                <p className="text-xs text-gray-400">admin@example.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}