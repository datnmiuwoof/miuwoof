"use client";

import { useState, useEffect } from "react";
import { CheckCircle, Home, Package, CreditCard, Clock } from "lucide-react";
import "@/app/styles/globals.css"

export default function ThankYouPage() {
    const [countdown, setCountdown] = useState(10);
    const [orderId] = useState("ORD-2024-" + Math.random().toString(36).substr(2, 9).toUpperCase());
    const [method] = useState("VNPay");

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    window.location.href = "/";
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleGoHome = () => {
        window.location.href = "/";
    };

    return (
        <div className="!min-h-screen !bg-gradient-to-br !from-green-50 !via-emerald-50 !to-teal-50 !flex !items-center !justify-center !p-4">
            <div className="!max-w-2xl !w-full">
                {/* Success Animation */}
                <div className="!text-center !mb-4 !animate-bounce">
                    <div className="!inline-block !bg-green-100 !rounded-full !p-3 !mb-3">
                        <CheckCircle className="!w-12 !h-12 !text-green-600" strokeWidth={2} />
                    </div>
                </div>

                {/* Main Card */}
                <div className="!bg-white !rounded-2xl !shadow-xl !overflow-hidden">
                    {/* Header */}
                    <div className="!bg-gradient-to-r !from-green-500 !to-emerald-600 !p-5 text-center">
                        <h1 className="!text-xl !md:text-2xl !font-bold !text-white !mb-1">
                            Thanh Toán Thành Công
                        </h1>
                        <p className="!text-green-50 !text-sm">
                            Cảm ơn bạn đã đặt hàng
                        </p>
                    </div>

                    {/* Content */}
                    <div className="!p-5 !md:p-6">
                        {/* Order Details */}
                        <div className="!space-y-3 !mb-5">
                            <div className="!flex !items-center !gap-3 p-3 !bg-gray-50 !rounded-lg">
                                <div className="!bg-blue-100 p-2 !rounded-lg">
                                    <Package className="!w-5 !h-5 !text-blue-600" />
                                </div>
                                <div className="!flex-1">
                                    <p className="!text-xs !text-gray-600">Mã đơn hàng</p>
                                    <p className="!text-sm !font-bold !text-gray-900">{orderId}</p>
                                </div>
                            </div>

                            <div className="!flex !items-center !gap-3 !p-3 !bg-gray-50 !rounded-lg">
                                <div className="!bg-purple-100 !p-2 !rounded-lg">
                                    <CreditCard className="!w-5 !h-5 !text-purple-600" />
                                </div>
                                <div className="!flex-1">
                                    <p className="!text-xs !text-gray-600">Phương thức thanh toán</p>
                                    <p className="!text-sm !font-bold !text-gray-900">{method}</p>
                                </div>
                            </div>

                            <div className="!flex !items-center !gap-3 p-3 !bg-gradient-to-r !from-orange-50 !to-amber-50 !rounded-lg !border !border-orange-200">
                                <div className="!bg-orange-100 !p-2 rounded-lg">
                                    <Clock className="!w-5 !h-5 !text-orange-600" />
                                </div>
                                <div className="!flex-1">
                                    <p className="!text-xs !text-orange-800">Tự động về trang chủ sau</p>
                                    <p className="!text-2xl !font-bold !text-orange-600">{countdown}s</p>
                                </div>
                            </div>
                        </div>

                        {/* Success Message */}
                        <div className="!bg-green-50 !border-l-4 !border-green-500 !p-3 !mb-4 !rounded-r-lg">
                            <p className="!text-green-800 !font-medium !text-sm">
                                Đơn hàng đã được xác nhận
                            </p>
                            <p className="!text-green-700 !text-xs !mt-1">
                                Chúng tôi sẽ gửi email xác nhận cho bạn
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={handleGoHome}
                            className="!w-full !bg-gradient-to-r !from-green-500 !to-emerald-600 hover:from-green-600 hover:to-emerald-700 !text-white !font-semibold !py-3 !px-4 !rounded-lg !shadow-lg !hover:shadow-xl !transform !hover:scale-105 !transition-all !duration-200 !flex items-center !justify-center !gap-2"
                        >
                            <Home className="!w-4 !h-4" />
                            <span>Quay về trang chủ</span>
                        </button>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="!text-center !text-gray-600 !mt-4 !text-xs">
                    Có thắc mắc? Liên hệ hotline hoặc email
                </p>
            </div>
        </div>
    );
}