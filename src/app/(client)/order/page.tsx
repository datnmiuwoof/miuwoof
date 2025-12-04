'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Trash2, Search } from 'lucide-react';
import {
    IoChevronBack,
    IoDocumentTextOutline,
    IoWalletOutline,
    IoCarOutline,
    IoCubeOutline,
    IoStarOutline,
    IoChatbubbleEllipsesOutline,
    IoStorefrontOutline
} from "react-icons/io5";

export default function OrderTrackingPage() {

    const [activeTab, setActiveTab] = useState("all");
    const [order, setOrder] = useState<any>(null);
    const [orderDetail, setOrderDetail] = useState<any>([])
    const tabs = [
        { key: "all", label: "Tất cả" },
        { key: "pending", label: "Chờ xác nhận" },
        { key: "confirmed", label: "Chờ giao hàng" },
        { key: "shipping", label: "Vận chuyển" },
        { key: "completed", label: "Hoàn thành" },
        { key: "cancelled", label: "Đã hủy" },
        { key: "refund", label: "Trả hàng/Hoàn tiền" }
    ];
    const [cart, setCart] = useState([
        {
            id: 1,
            name: 'Combo 10 gói đào giòn chua ngọt, đào vàng nguyên trái, đào tươi, đồ ăn vặt nội địa TQ',
            category: 'Combo 10gói',
            price: 25900,
            originalPrice: 35000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1629828874514-d5e6e0e94d3f?w=100&h=100&fit=crop'
        },
        {
            id: 2,
            name: 'Bột Cũ Sen Mix Hạt Dinh Dưỡng, Ngũ Cốc Giảm Cân, Ăn Kiêng, Eat Clean Healthy Dưỡng Nhan',
            category: 'C/Sen HoaHồng M11',
            price: 76350,
            originalPrice: 120000,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1526318472351-c75fcf070305?w=100&h=100&fit=crop'
        }
    ]);

    const [searchQuery, setSearchQuery] = useState('');


    const calculateTotal = () => {
        return cart.reduce((total: any, item: any) => total + (item.price * item.quantity), 0);
    };

    const formatPrice = (price: any) => {
        return price.toLocaleString('vi-VN') + 'đ';
    };

    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch(`http://localhost:3000/api/order/check/${activeTab}`, {
                credentials: "include",
                method: "GET",
            });
            const result = await res.json();
            setOrder(result.data)
        }

        fetchOrders();
    }, [activeTab]);

    return (
        <div className="!bg-[#f5f5f5] !min-h-screen !pt-4 !font-sans !text-[#333] !pb-10">

            <div className="main-content">

                <div className="!w-full !mb-4  !bg-white !border-b !border-[#e0e0e0]">
                    <div className="!w-full !mx-auto !px-[1.6rem] !py-[1rem]">

                        {/* GRID responsive */}
                        <div className="grid grid-cols-2 !bg-white sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
                            {tabs.map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`
                                      !text-[1.3rem] !bg-transparent !border-0 !cursor-pointer !py-[1rem] 
                                      !relative hover:!text-[#e10600]
                                      ${activeTab === tab.key ? "!text-[#e10600] !font-medium" : "!text-[#333]"}
                                    `}
                                >
                                    {tab.label}

                                    {activeTab === tab.key && (
                                        <span className="!absolute !bottom-0 !left-1/2 -translate-x-1/2 
                                        !w-[60%] !h-[0.2rem] !bg-[#e10600]"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>


                {/* Header */}
                <div className="bg-white shadow-sm sticky top-0 z-10">
                    <div className="w-full mx-auto px-4 py-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="!w-full mx-auto mt-4 py-6">
                    <div className="bg-[#f5f5f5] rounded-lg shadow-sm mb-4">
                        {/* Shop Header */}
                        <div className="p-4 border-b !bg-white border-gray-200 !mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                        Yêu thích+
                                    </span>
                                    <span className="font-semibold text-gray-800">Đơn hàng của bạn</span>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Chat</span>
                                    </button>
                                    <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition">
                                        Xem Shop
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Cart Items */}

                        {order && order.map((item: any) => (
                            <div key={item.id} className="!border-b !bg-white !border-gray-100 !last:border-b-0 !mb-4">
                                <div className="!p-4 !font-bold">
                                    đơn hang của ban: <span className='!text-red-400 !text-[16px]'>Đang giao hàng</span>
                                </div>
                                {/* Phần sản phẩm */}
                                {item.OrderDetails.map((o: any) => (
                                    <Link key={o.id} href={`/order/${o.id}`}>
                                        <div className="p-5 !border-b !border-gray-200">
                                            <div className="flex gap-5">
                                                <img
                                                    src={o.image}
                                                    alt={o.name}
                                                    className="w-34 h-34 object-cover rounded border border-gray-200 shadow-sm flex-shrink-0"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="!font-medium text-gray-900 !mb-2">
                                                        {o.name}
                                                    </h3>

                                                    <p className="text-sm text-gray-500 mb-3">
                                                        Phân loại hàng:
                                                        {o.ProductVariant.size && ` Size: ${o.ProductVariant.size} `}
                                                        {o.ProductVariant.style && ` - Style: ${o.ProductVariant.style} `}
                                                        {o.ProductVariant.unit && ` - Quy cách: ${o.ProductVariant.unit} `}
                                                        {o.ProductVariant.flavor && ` - Vị: ${o.ProductVariant.flavor} `}
                                                    </p>


                                                    <div className="flex items-center justify-between">
                                                        <span className="text-gray-600 font-medium">x{o.quantity}</span>
                                                        <span className="text-xl !font-bold text-red-600">
                                                            {formatPrice(o.price)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}

                                {/* Footer – đã fix không bị xuống hàng */}
                                <div className="px-5 py-5 bg-white border-t border-gray-200">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                        {/* Ngày giao hàng */}
                                        <p className="text-sm text-gray-600 flex-shrink-0">

                                        </p>

                                        {/* Tổng tiền + 2 nút (luôn nằm chung 1 hàng) */}
                                        <div className="">
                                            <div className="flex flex-row-reverse">
                                                <div className='items-center flex !my-[15px]'>
                                                    <span className=" block text-sm text-gray-600">Thành tiền: </span>
                                                    <p className="!text-[24px] !ml-2 !font-medium !text-red-500">
                                                        {formatPrice(calculateTotal())}
                                                    </p>
                                                </div>

                                            </div>

                                            {/* 2 nút cố định cùng hàng, thu nhỏ chữ nếu màn hình quá bé */}
                                            <div className="flex items-center justify-between gap-4 min-w-0">
                                                <button className="px-4 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 active:scale-95 transition whitespace-nowrap text-sm">
                                                    Liên hệ người bán
                                                </button>
                                                <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-100 active:scale-95 transition whitespace-nowrap text-sm">
                                                    Hủy đơn hàng
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>


                </div>
            </div>
        </div>

    );
}