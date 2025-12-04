"use client";
import { Bell, Menu } from "lucide-react";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
            <div className="flex items-center gap-3">
                {/* Nút mở sidebar chỉ hiện trên mobile */}
                <button
                    onClick={toggleSidebar}
                    className="md:hidden p-2 rounded-md hover:bg-gray-100 transition"
                >
                    <Menu className="w-5 h-5 text-gray-700" />
                </button>
            </div>

            <div className="flex items-center gap-4">
                <Bell className="text-gray-600 w-5 h-5 cursor-pointer hover:text-blue-600" />
                <img
                    src="https://i.pravatar.cc/40"
                    alt="admin"
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </header>
    );
}
