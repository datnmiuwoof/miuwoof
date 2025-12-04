'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
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
    const { id } = useParams();
    const [orderData, setOrderData] = useState<any>(null)
    const orderId = `${Date.now()}${orderData?.Order.id}`;
    const orderDate = "29-11-2025";
    const statusSteps = [
        { label: "Đơn Hàng Đã Đặt", time: "14:52 29-11-2025", active: true, icon: IoDocumentTextOutline },
        { label: "Đã Xác Nhận Thông Tin", time: "14:57 29-11-2025", active: true, icon: IoWalletOutline },
        { label: "Đã Giao Cho ĐVVC", time: "16:03 29-11-2025", active: true, icon: IoCarOutline },
        { label: "Đang Giao Hàng", time: "", active: true, current: true, icon: IoCubeOutline },
        { label: "Đánh Giá", time: "", active: false, icon: IoStarOutline },
    ];

    useEffect(() => {
        async function fetchOrders() {
            const res = await fetch(`http://localhost:3000/api/order/check/detail/${id}`, {
                credentials: 'include',
                method: "GET",
            });
            const result = await res.json();
            setOrderData(result)
            console.log("DATA:", result);
        }

        fetchOrders();
    }, []);

    return (
        <div className="!bg-[#f5f5f5] !min-h-screen !pt-4 !font-sans !text-[#333] !pb-10">

            <div className="main-content">
                {/* 1. HEADER TRẮNG */}
                <div className="!w-full !bg-white !border-b !border-[#e5e5e5]">
                    <div className="!w-full !mx-auto !px-4 !py-4 !flex !justify-between !items-center">
                        <a href="/order" className="!flex !font-bold !items-center !text-[#666] hover:!text-[#e10600] !text-[12px] !uppercase !no-underline">
                            <IoChevronBack className="!mr-1" /> TRỞ LẠI
                        </a>
                        <div className="!flex !items-center !space-x-4 !text-[12px]">
                            <span className="!uppercase">MÃ ĐƠN HÀNG. {orderId && orderId}</span>
                            <span className="!text-[#e10600] !font-bold !uppercase !border-l !border-[#ddd] !pl-4">
                                ĐƠN HÀNG ĐANG GIAO ĐẾN BẠN
                            </span>
                        </div>
                    </div>
                </div>

                <div className="!w-full !mx-auto !px-4 !mt-6 !space-y-4">

                    {/* 2. THANH TRẠNG THÁI (STEPPER) - GIỐNG SHOPEE */}
                    <div className="!bg-white !p-8 !rounded-sm !shadow-sm">
                        <div className="!relative !flex !justify-between !items-start !z-0">

                            {/* Đường kẻ nền xám */}
                            <div className="!absolute !top-[25px] !left-0 !w-full !h-[3px] !bg-[#e0e0e0] !-z-10"></div>

                            {/* Đường kẻ xanh (Progress) - Chạy đến bước thứ 4 */}
                            <div className="!absolute !top-[25px] !left-0 !w-[75%] !h-[3px] !bg-[#26aa99] !-z-10"></div>

                            {/* Các bước */}
                            {statusSteps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div key={index} className="!flex !flex-col !items-center !w-[140px] !text-center">
                                        {/* Icon Circle */}
                                        <div className={`
                                !w-[60px] !h-[60px] !rounded-full !border-4 !flex !items-center !justify-center !bg-white !mb-4
                                ${step.active ? '!border-[#26aa99] !text-[#26aa99]' : '!border-[#e0e0e0] !text-[#ccc]'}
                            `}>
                                            <Icon size={30} />
                                        </div>
                                        {/* Label */}
                                        <p className="!text-[13px] !font-medium !mb-1 !m-0">{step.label}</p>
                                        {/* Time */}
                                        {step.time && <p className="!text-[11px] !text-[#999] !m-0">{step.time}</p>}
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* 3. THÔNG BÁO VẬN CHUYỂN & ĐỊA CHỈ */}
                    <div className="!bg-[#fffefb] !border !border-[#ffbf88] !p-4 !flex !justify-between !items-center !rounded-sm">
                        <div className="!text-sm !text-[#333]">
                            Đơn hàng đã được bàn giao cho đơn vị vận chuyển. Vui lòng chú ý điện thoại nhận hàng.
                        </div>
                        <button className="!bg-[#e0e0e0] !text-[#999] !px-6 !py-2 !text-sm !rounded-sm !cursor-not-allowed !border-0">
                            Đã Nhận Hàng
                        </button>
                    </div>

                    {/* 4. ĐỊA CHỈ & TIMELINE CHI TIẾT */}
                    <div className="!bg-white !p-6 !rounded-sm !shadow-sm !relative !overflow-hidden">
                        {/* Đường kẻ sọc trang trí giống Shopee */}
                        <div className="!absolute !top-0 !left-0 !w-full !h-[3px] !bg-[repeating-linear-gradient(45deg,#6fa6d6,#6fa6d6_30px,transparent_0,transparent_60px,#f18d9b_0,#f18d9b_90px,transparent_0,transparent_120px)] !opacity-60"></div>

                        <div className="!flex !flex-col md:!flex-row !gap-10 !mt-4">
                            {/* Cột Trái: Địa chỉ */}
                            <div className="md:!w-1/3 !border-r !border-[#f1f1f1] !pr-6">
                                <h3 className="!text-[15px] !font-bold !mb-3 !text-[#333] !mt-0 !leading-[1.4]">Địa Chỉ Nhận Hàng</h3>
                                <div className="!text-[13px] !text-[#333] !space-y-1">
                                    <p className="!font-bold !m-0 !leading-[1.5]">Dương Tấn Lộc</p>
                                    <p className="!text-[#888] !m-0 !leading-[1.5]">(+84) 0988 004 089</p>
                                    <p className="!text-[#666] !m-0 !leading-[1.5]">
                                        136 Huỳnh Văn Bánh, Phường 11<br />
                                        Quận Phú Nhuận, TP. Hồ Chí Minh
                                    </p>
                                </div>
                            </div>

                            {/* Cột Phải: Timeline Dọc */}
                            <div className="md:!w-2/3">
                                <h3 className="!text-[15px] !font-bold !mb-3 !text-[#333] !flex !justify-between !mt-0 !leading-[1.4]">
                                    <span>Trạng thái vận chuyển</span>
                                    <span className="!text-[#26aa99] !text-[13px] !font-normal">Mozzi Express - MZ889922</span>
                                </h3>

                                <div className="!space-y-4 !border-l-2 !border-[#e0e0e0] !ml-2 !pl-5 !relative">
                                    {/* Event 1 (Mới nhất - Màu xanh) */}
                                    <div className="!relative">
                                        <div className="!absolute !-left-[26px] !top-0 !w-3 !h-3 !rounded-full !bg-[#26aa99] !border-2 !border-white !shadow-sm"></div>
                                        <p className="!text-[#26aa99] !font-bold !text-[13px] !m-0 !mb-1 !leading-[1.4]">11:09 {orderDate}</p>
                                        <p className="!text-[#333] !text-[13px] !font-medium !m-0 !mb-1 !leading-[1.4]">Đang vận chuyển</p>
                                        <p className="!text-[#666] !text-[12px] !m-0 !leading-[1.5]">Đơn hàng đang trên đường giao đến bạn. Shipper đang ở khu vực Quận Phú Nhuận.</p>
                                    </div>

                                    {/* Event 2 */}
                                    <div className="!relative">
                                        <div className="!absolute !-left-[26px] !top-0 !w-2.5 !h-2.5 !rounded-full !bg-[#e0e0e0]"></div>
                                        <p className="!text-[#888] !text-[12px] !m-0 !mb-1 !leading-[1.4]">{orderDate} 08:30</p>
                                        <p className="!text-[#666] !text-[12px] !m-0 !leading-[1.5]">Đơn hàng đã đến kho Phú Nhuận SOC.</p>
                                    </div>

                                    {/* Event 3 */}
                                    <div className="!relative">
                                        <div className="!absolute !-left-[26px] !top-0 !w-2.5 !h-2.5 !rounded-full !bg-[#e0e0e0]"></div>
                                        <p className="!text-[#888] !text-[12px] !m-0 !mb-1 !leading-[1.4]">{orderDate} 05:29</p>
                                        <p className="!text-[#666] !text-[12px] !m-0 !leading-[1.5]">Đơn hàng đã được bàn giao cho đơn vị vận chuyển.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. DANH SÁCH SẢN PHẨM */}
                    <div className="!bg-white !p-6 !rounded-sm !shadow-sm">
                        <div className="!flex !items-center !gap-2 !mb-4 !pb-4 !border-b !border-[#f1f1f1]">
                            <IoStorefrontOutline />
                            <span className="!font-bold !text-sm">Mozzi Pet Shop</span>
                            <button className="!bg-[#e10600] !text-white !text-[10px] !px-2 !py-0.5 !rounded-sm !border-0">Chat</button>
                            <button className="!border !border-[#ddd] !text-[#555] !text-[10px] !px-2 !py-0.5 !rounded-sm !bg-white">Xem Shop</button>
                        </div>

                        {/* Item 1 */}

                        {orderData && (
                            <>
                                <div className="!flex !items-start !gap-4 !mb-4">
                                    <img
                                        src={orderData.image}
                                        className="!w-40 !h-40 !object-cover !border !border-[#eee]"
                                        alt={orderData.name}
                                    />
                                    <div className="!flex-1">
                                        <h3 className="!text-[16px] !text-[#333] !mb-3 !mt-0 !font-bold">{orderData.name}</h3>
                                        <p className="!text-[12px] !text-[#888] !mt-2">
                                            {orderData?.ProductVariant && (
                                                <>
                                                    Phân loại hàng:
                                                    {orderData.ProductVariant.size && ` Size: ${orderData.ProductVariant.size} `}
                                                    {orderData.ProductVariant.style && ` - Style: ${orderData.ProductVariant.style} `}
                                                    {orderData.ProductVariant.unit && ` - Quy cách: ${orderData.ProductVariant.unit} `}
                                                    {orderData.ProductVariant.flavor && ` - Vị: ${orderData.ProductVariant.flavor} `}
                                                </>

                                            )}
                                        </p>
                                        <p className="!text-[12px] !text-[#333] !mt-1 !mb-0">X{orderData.quantity}</p>
                                    </div>
                                    <div className="!text-[#e10600] !font-bold !text-[18px]">{orderData.price.toLocaleString()}đ</div>
                                </div>

                                <div className="!bg-[#fffefb] !mt-3 !p-4 !text-right !space-y-1.5">
                                    <div className="!flex !justify-end !gap-10 !text-[12px] !text-[#888] !leading-[1.5]">
                                        <span>Tổng tiền hàng</span>
                                        <span>{(orderData.price * orderData.quantity).toLocaleString()}đ</span>
                                    </div>
                                    <div className="!flex !justify-end !gap-10 !text-[12px] !text-[#888] !leading-[1.5]">
                                        <span>Phí vận chuyển</span>
                                        <span>16.500₫</span>
                                    </div>
                                    <div className="!flex !justify-end !gap-10 !text-[12px] !text-[#888] !leading-[1.5]">
                                        <span>Voucher từ Mozzi</span>
                                        <span>-0₫</span>
                                    </div>
                                    <div className="!flex !justify-end !items-center !gap-10 !pt-2">
                                        <span className="!text-[13px] !text-[#333]">Thành tiền</span>
                                        <span className="!text-[22px] !font-bold !text-[#e10600]">{(orderData.price * orderData.quantity).toLocaleString()}đ</span>
                                    </div>
                                </div>
                            </>

                        )}

                    </div>

                    {/* 7. PHƯƠNG THỨC THANH TOÁN (BOTTOM) */}
                    <div className="!bg-[#fffbf8] !p-4 !border !border-[#f9e7d9] !rounded-sm !flex !items-center !gap-2 !text-[13px] !text-[#333]">
                        <IoWalletOutline className="!text-[#e10600]" />
                        <span>Phương thức Thanh toán: <strong className="!ml-2">Thanh toán khi nhận hàng (COD)</strong></span>
                    </div>

                </div>
            </div>


        </div>
    );
}