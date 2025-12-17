"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Home, ShoppingCart, Users, Ticket, Package, Settings, LogOut, BookOpen, FolderTree, Image } from "lucide-react";

export default function Sidebar({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}) {
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname, setIsOpen]);

    const menuItems = [
        { href: "/admin", icon: Home, label: "Tổng quan" },
        { href: "/admin/category", icon: FolderTree, label: "Loại Sản phẩm" },
        { href: "/admin/products", icon: Package, label: "Sản phẩm" },
        { href: "/admin/order", icon: ShoppingCart, label: "Đơn hàng" },
        { href: "/admin/user", icon: Users, label: "Khách hàng" },
        { href: "/admin/voucher", icon: Ticket, label: "Giảm giá" },
        { href: "/admin/post", icon: BookOpen, label: "Bài viết" },
        { href: "/admin/banner", icon: Image, label: "Banner" },
        { href: "/admin/settings", icon: Settings, label: "Cài đặt" },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed md:sticky top-0 left-0 !h-screen w-72 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-white transition-transform duration-300 z-40 shadow-2xl
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Header Section - CỐ ĐỊNH */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-between p-6 border-b border-gray-800/50">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-xl font-bold">M</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                        Miuwoof
                                    </h1>
                                    <p className="text-xs text-gray-400">Admin Dashboard</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Menu - CHỈ PHẦN NÀY SCROLL */}
                    <nav className="flex-1 overflow-y-auto mt-6 px-3 space-y-1 scrollbar-hide"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none'
                        }}>
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                                            ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10"
                                            : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"} transition-colors`} />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Section - CỐ ĐỊNH */}
                    <div className="flex-shrink-0 p-4 space-y-3">
                        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-red-400 transition-all duration-200 group">
                            <LogOut className="w-5 h-5 group-hover:text-red-400 transition-colors" />
                            <span className="font-medium">Đăng xuất</span>
                        </button>
                        <div className="p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-800/50 backdrop-blur-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center font-bold shadow-lg">
                                    A
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">Admin User</p>
                                    <p className="text-xs text-gray-400 truncate">admin@example.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}