"use client";
import { ReactNode } from "react";
import '@/app/styles/globals.css';
import { Provider } from "react-redux";
import { store } from "@/lib/store";
import { AuthProvider } from "@/context/AuthContext";

export default function CheckoutLayout({ children }: { children: ReactNode }) {
    return (
        <Provider store={store}>
            <html lang="en">
                <body className="bg-gray-100 min-h-screen">
                    <AuthProvider>{children}</AuthProvider>
                </body>
            </html>
        </Provider>

    );
}
