'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ShoppingCart, MessageCircle, Trash2, Search, X, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
// import {
//     IoChevronBack,
//     IoDocumentTextOutline,
//     IoWalletOutline,
//     IoCarOutline,
//     IoCubeOutline,
//     IoStarOutline,
//     IoChatbubbleEllipsesOutline,
//     IoStorefrontOutline
// } from "react-icons/io5";

export default function OrderTrackingPage() {

    const [activeTab, setActiveTab] = useState("all");
    const [order, setOrder] = useState<any>(null);
    // const [orderDetail, setOrderDetail] = useState<any>([])
    const tabs = [
        { key: "all", label: "Tất cả" },
        { key: "pending", label: "Chờ xác nhận" },
        { key: "confirmed", label: "Chờ giao hàng" },
        { key: "shipping", label: "Vận chuyển" },
        { key: "completed", label: "Hoàn thành" },
        { key: "cancelled", label: "Đã hủy" },
        { key: "refund", label: "Trả hàng/Hoàn tiền" }
    ];
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');

    console.log(rating)

    const SunmitComment = async (e: React.FormEvent, orderId: any) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/comment/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: 'include',
                body: JSON.stringify({
                    orderId,
                    rating,
                    content: comment,
                }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            console.log("Comment sent:", data.comment);

            // reset form
            setIsOpen(false);
            setRating(0);
            setComment("");
        } catch (err: any) {
            console.error("Error submitting comment:", err.message);
        }
    };


    const router = useRouter()

    const [searchQuery, setSearchQuery] = useState('');

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

            console.log(result.data)
        }

        fetchOrders();
    }, [activeTab]);

    useEffect(() => {
        if (isOpen) {
            // Lock scroll khi mở popup
            document.body.style.overflow = 'hidden';
        } else {
            // Unlock scroll khi đóng popup
            document.body.style.overflow = 'unset';
        }

        // Cleanup khi component unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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
                                    // <Link key={o.id} href={`/order/${o.id}`}>
                                    <div key={o.id} className="p-5 !border-b !border-gray-200">
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


                                                {/* <div className="flex items-center justify-between">
                                                    <span className="text-gray-600 font-medium">x{o.quantity}</span>

                                                    <div className='flex flex-col items-end'>
                                                        <span className="text-xl mb-4 !font-bold text-red-600">
                                                            {formatPrice(o.price)}
                                                        </span>
                                                        {item.order_status === "completed" && (
                                                            <button className="px-4 py-3 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 active:scale-95 transition whitespace-nowrap text-sm">
                                                                Đánh giá
                                                            </button>
                                                        )}
                                                    </div>
                                                </div> */}

                                                <div className="p-8">
                                                    {/* Button trigger */}
                                                    <div className="flex items-center justify-between p-4 bg-white shadow-sm">
                                                        <span className="text-gray-600 font-medium">x{o.quantity}</span>
                                                        <div className="flex flex-col items-end">
                                                            <span className="text-xl mb-4 font-bold text-red-600">
                                                                {formatPrice(o.price)}
                                                            </span>
                                                            {item.order_status === "completed" && (
                                                                <button
                                                                    onClick={() => setIsOpen(true)}
                                                                    className="px-4 py-3 bg-yellow-500 text-white font-medium rounded hover:bg-yellow-600 active:scale-95 transition whitespace-nowrap text-sm"
                                                                >
                                                                    Đánh giá
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Popup Modal */}
                                                    {isOpen && (
                                                        <div className="fixed inset-0 !bg-black !bg-opacity-50 flex items-center justify-center !z-[9999] !p-4">
                                                            <div className="!bg-white !rounded-lg !max-w-2xl !w-full !max-h-[90vh] !overflow-y-auto">
                                                                {/* Header */}
                                                                <div className="flex items-center justify-between !p-6 !border-b sticky !top-0 !bg-white">
                                                                    <h2 className="!text-2xl !font-bold !text-gray-800 !m-0">Đánh giá sản phẩm</h2>
                                                                    <button
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="!text-gray-500 hover:!text-gray-700 !transition !border-0 !bg-transparent !p-0"
                                                                    >
                                                                        <X size={24} />
                                                                    </button>
                                                                </div>

                                                                {/* Content */}
                                                                <div className="!p-6">
                                                                    {/* Product Info */}
                                                                    <div className="flex items-center !gap-4 !mb-6 !pb-6 !border-b">
                                                                        <img
                                                                            src={o.image}
                                                                            alt={o.name}
                                                                            className="!w-20 !h-20 !object-cover !rounded"
                                                                        />
                                                                        <div>
                                                                            <h3 className="!font-medium !text-gray-800 !m-0 !mb-1">
                                                                                {o.name}
                                                                            </h3>
                                                                            <p className="!text-gray-500 !text-sm !m-0">
                                                                                Số lượng: x{o.quantity}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    {/* Rating Stars */}
                                                                    <div className="!mb-6">
                                                                        <label className="!block !text-gray-700 !font-medium !mb-3">
                                                                            Đánh giá của bạn <span className="!text-red-500">*</span>
                                                                        </label>
                                                                        <div className="flex !gap-2">
                                                                            {[1, 2, 3, 4, 5].map((star) => (
                                                                                <button
                                                                                    key={star}
                                                                                    type="button"
                                                                                    onClick={() => setRating(star)}
                                                                                    onMouseEnter={() => setHoverRating(star)}
                                                                                    onMouseLeave={() => setHoverRating(0)}
                                                                                    className="!transition-transform hover:!scale-110 !border-0 !bg-transparent !p-0"
                                                                                >
                                                                                    <Star
                                                                                        size={40}
                                                                                        className={`${star <= (hoverRating || rating)
                                                                                            ? '!fill-yellow-400 !text-yellow-400'
                                                                                            : '!text-gray-300'
                                                                                            } !transition-colors`}
                                                                                    />
                                                                                </button>
                                                                            ))}
                                                                        </div>
                                                                        {rating > 0 && (
                                                                            <p className="!text-sm !text-gray-600 !mt-2 !mb-0">
                                                                                {rating === 1 && 'Rất tệ'}
                                                                                {rating === 2 && 'Tệ'}
                                                                                {rating === 3 && 'Bình thường'}
                                                                                {rating === 4 && 'Tốt'}
                                                                                {rating === 5 && 'Rất tốt'}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {/* Comment */}
                                                                    <div className="!mb-6">
                                                                        <label className="!block !text-gray-700 !font-medium !mb-3">
                                                                            Nhận xét của bạn
                                                                        </label>
                                                                        <textarea
                                                                            value={comment}
                                                                            onChange={(e) => setComment(e.target.value)}
                                                                            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm..."
                                                                            className="!w-full !border !border-gray-300 !rounded-lg !p-3 focus:!outline-none focus:!ring-2 focus:!ring-yellow-500 focus:!border-transparent !resize-none"
                                                                            rows={5}
                                                                        />
                                                                        <p className="!text-sm !text-gray-500 !mt-2 !mb-0">
                                                                            {comment.length} / 500 ký tự
                                                                        </p>
                                                                    </div>

                                                                    {/* Actions */}
                                                                    <div className="flex !gap-3 justify-end !pt-4 !border-t">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => setIsOpen(false)}
                                                                            className="!px-6 !py-3 !border !border-gray-300 !text-gray-700 !font-medium !rounded-lg hover:!bg-gray-50 !transition"
                                                                        >
                                                                            Hủy
                                                                        </button>
                                                                        <button
                                                                            onClick={(e) => SunmitComment(e, o.id)}
                                                                            disabled={rating === 0}
                                                                            className="!px-6 !py-3 !bg-yellow-500 !text-white !font-medium !rounded-lg hover:!bg-yellow-600 disabled:!bg-gray-300 disabled:!cursor-not-allowed !transition !border-0"
                                                                        >
                                                                            Gửi đánh giá
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                ))}

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
                                                        {item.total_amount.toLocaleString()} đ
                                                    </p>
                                                </div>

                                            </div>

                                            {/* 2 nút cố định cùng hàng, thu nhỏ chữ nếu màn hình quá bé */}
                                            <div className="flex items-center justify-between gap-4 min-w-0">
                                                <div className="flex items-center justify-end gap-4 min-w-0">
                                                    {/* Liên hệ – luôn có */}
                                                    <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded hover:bg-gray-100 active:scale-95 transition whitespace-nowrap text-sm">
                                                        Liên hệ người bán
                                                    </button>

                                                    {/* Hủy đơn – chỉ khi chưa giao */}
                                                    {(item.order_status === "pending" || item.order_status === "confirmed") && (
                                                        <button className="px-4 py-3 bg-red-600 text-white font-medium rounded hover:bg-red-700 active:scale-95 transition whitespace-nowrap text-sm"
                                                            onClick={() => router.push(`/order/cancel/${item.id}`)}
                                                        >
                                                            Hủy đơn hàng
                                                        </button>
                                                    )}
                                                </div>

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