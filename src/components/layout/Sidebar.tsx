"use client";

import { User, Package, MapPin, LogOut, Heart } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Sidebar({ profile }: { profile: any }) {
    const router = useRouter();
    const pathname = usePathname();

    const getInitials = (name = "") => {
        const parts = name.split(" ");
        if (parts.length >= 2) return parts[0][0] + parts.at(-1)[0];
        return name.slice(0, 2);
    };

    const isActive = (path: string) => pathname === path;

    return (
        <div className="!bg-white !rounded-2xl !shadow-sm !p-6">
            {/* User Info */}
            <div className="!flex !items-center !gap-4 !mb-8">
                <div className="!w-16 !h-16 !rounded-full !bg-pink-100 !flex !items-center !justify-center">
                    <span className="!text-pink-600 !text-xl !font-bold">
                        {getInitials(profile.fullName).toUpperCase()}
                    </span>
                </div>
                <div>
                    <h3 className="!font-semibold !text-gray-900 !text-lg">
                        {profile.fullName}
                    </h3>
                    <p className="!text-gray-500 !text-sm">{profile.email}</p>
                </div>
            </div>

            {/* Menu */}
            <nav className="!space-y-2">
                <Menu
                    active={isActive("/Profile")}
                    onClick={() => router.push("/Profile")}
                    icon={<User />}
                    label="Thông tin tài khoản"
                />
                <Menu
                    active={isActive("/Profile/address")}
                    onClick={() => router.push("/Profile/address")}
                    icon={<MapPin />}
                    label="Địa chỉ giao hàng"
                />
                <Menu
                    active={isActive("/order")}
                    onClick={() => router.push("/order")}
                    icon={<Package />}
                    label="Đơn hàng của bạn"
                />
                <Menu
                    active={isActive("/favorite")}
                    onClick={() => router.push("/favorite")}
                    icon={<Heart />}
                    label="Yêu thích"
                />
            </nav>
        </div>
    );
}

function Menu({ active, onClick, icon, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`!w-full !flex !items-center !gap-3 !px-4 !py-3 !rounded-xl !font-medium !border-0
        ${active
                    ? "!bg-red-500 !text-white !shadow-md"
                    : "!bg-gray-100 !text-gray-700 hover:!bg-gray-200"
                }`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}
