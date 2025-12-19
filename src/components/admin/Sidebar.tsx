"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { X, Home, ShoppingCart, Users, Ticket, Package, Settings, BookOpen, FolderTree, Image } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { LogOut } from "@/lib/userSlice";


export default function Sidebar({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
}) {
    const pathname = usePathname();
    const user: any = useSelector((state: RootState) => state.user.info);
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
    ];

    const router = useRouter();
    const dispatch = useDispatch();

    const handleLogOut = async () => {
        try {
            await fetch("http://localhost:3000/user/logout", {
                method: "POST",
                credentials: "include",
            });
            dispatch(LogOut())
            router.push('/')
        } catch (error) {
            console.error("Logout failed:", error);
        }
    }



    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div
                className={`fixed md:sticky top-0 left-0 !h-screen w-72 bg-gradient-to-b from-slate-50 via-white to-gray-50 text-gray-800 transition-transform duration-300 z-40 shadow-md
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Header Section - CỐ ĐỊNH */}
                    <div className="flex-shrink-0">
                        <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                                    <span className="text-xl font-bold text-white">M</span>
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                                        Miuwoof
                                    </h1>
                                    <p className="text-xs text-gray-500">Admin Dashboard</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                                            ? "bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 shadow-sm"
                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        }`}
                                >
                                    <Icon className={`w-5 h-5 ${isActive ? "text-cyan-600" : "group-hover:text-cyan-500"} transition-colors`} />
                                    <span className="font-medium">{item.label}</span>
                                    {isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Footer Section - CỐ ĐỊNH */}
                    <div className="flex-shrink-0 p-4 space-y-3">


                        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
                            onClick={handleLogOut}
                        >

                            <span className="font-medium">Đăng xuất</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}