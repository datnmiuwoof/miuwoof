"use client";
import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import "@/app/(admin)/admin/styles/admin.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <html lang="vi">
            <body className="bg-gray-50">
                <div className="!flex">
                    {/* Sidebar */}
                    <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

                    {/* Main layout */}
                    <div className="flex flex-col flex-1 transition-all">
                        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                        <main className="">{children}</main>
                    </div>
                </div>
            </body>
        </html>
    );
}