"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const [profile, setProfile] = useState({
        fullName: "",
        email: "",
    });

    useEffect(() => {
        fetch("http://localhost:3000/profile", { credentials: "include" })
            .then(res => res.json())
            .then(data => {
                setProfile({
                    fullName: data.name,
                    email: data.email,
                });
            });
    }, []);

    return (
        <div className="main-content !min-h-screen !bg-gray-50 !p-6">
            <div className="!grid !grid-cols-12 !gap-6">
                <div className="!col-span-3">
                    <Sidebar profile={profile} />
                </div>

                <div className="!col-span-9">
                    {children}
                </div>
            </div>
        </div>
    );
}
