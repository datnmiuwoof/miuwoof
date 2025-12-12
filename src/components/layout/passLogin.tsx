"use client"

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export default function PassLogin({ logOut }: any) {
    const user: any = useSelector((state: RootState) => state.user.info);
    return (
        <div className="bg-white rounded-lg shadow-xl w-[260px] md:w-[260px] max-md:w-full max-md:h-full max-md:rounded-none overflow-hidden border border-gray-100">
            <ul className="py-1">
                {/* Header */}
                <li className="!px-5 !py-4 bg-gradient-to-br from-amber-100 to-orange-100 border-b border-amber-200">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-xs text-gray-600">Xin chào,</p>
                            <h3 className="font-bold text-gray-800">{user.name}</h3>
                        </div>
                    </div>
                </li>

                {/* Menu items với icon */}
                <li className="!py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50">
                    <a href="/Profile" className="px-5 py-3 flex items-center gap-3 text-gray-700 text-sm">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        Xem hồ sơ
                    </a>
                </li>

                <li className="!py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50">
                    <a href="/favorite" className="px-5 py-3 flex items-center gap-3 text-gray-700 text-sm">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        Sản phẩm yêu thích
                    </a>
                </li>

                <li className="!py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50">
                    <a href="/order" className="px-5 py-3 flex items-center gap-3 text-gray-700 text-sm">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                        </svg>
                        Xem đơn hàng
                    </a>
                </li>

                <li className="!py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50">
                    <a href="/account/changePassword" className="px-5 py-3 flex items-center gap-3 text-gray-700 text-sm">
                        <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Đổi mật khẩu
                    </a>
                </li>

                {user.role === "admin" && (
                    <li className="!py-3 hover:bg-gray-50 transition-all duration-200 cursor-pointer border-b border-gray-50">
                        <a href="/admin" className="px-5 py-3 flex items-center gap-3 text-gray-700 text-sm">
                            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Chuyển sang Admin
                        </a>
                    </li>
                )}

                <li
                    className="!px-4 !py-4 hover:bg-red-50 transition-all duration-200 cursor-pointer group"
                    onClick={logOut}
                >
                    <div className="!px-4 !py-4 flex items-center gap-3 text-gray-700 group-hover:text-red-600 text-sm">
                        <svg className="w-5 h-5 text-gray-500 group-hover:text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                        </svg>
                        Đăng xuất
                    </div>
                </li>
            </ul>
        </div>
    )
}