"use client"

import React, { useState, useEffect, useRef } from 'react';
import { CreditCard, MapPin, User, Package, Router } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from 'jwt-decode';
import AddressSlectect from '@/components/layout/AddressSelect';
import Link from 'next/link';

interface FormData {
    paymentMethod: 'cod' | 'momo' | 'card';
}

interface UserForm {
    name: string;
    email: string;
    product_variant_id?: number;
    final_price?: number;
}

export default function CheckoutPage() {

    const router = useRouter();
    const { userId, token, loading } = useAuth();
    const selectedItems = useSelector((state: RootState) => state.checkout.selectedIds);
    const cart = useSelector((state: RootState) => state.cart.listProduct);
    const [isClient, setIsClient] = useState(false);
    const [pendingOrderId, setPendingOrderId] = useState<string | null>(null);
    const [checking, setChecking] = useState(false);
    const [userForm, setUserForm] = useState<UserForm>({
        name: '',
        email: '',
    });
    const [formData, setFormData] = useState<FormData>({ paymentMethod: 'cod' });
    const [formAddress, setFormAddress] = useState({
        address: '',
        city: '',
        district: '',
        ward: '',
        phone: '',
    });
    const [shippingMethods, setShippingMethods] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [discountCode, setDiscountCode] = useState('');
    const [discountError, setDiscountError] = useState('');
    const [discountInfo, setDiscountInfo] = useState(null);
    const [isApplying, setIsApplying] = useState(false);




    useEffect(() => {
        fetch('http://localhost:3000/shipping-methods')
            .then(res => res.json())
            .then(data => setShippingMethods(data));
    }, []);




    useEffect(() => {
        setIsClient(true);

        if (token) {
            try {
                const decoded: any = jwtDecode(token);
                setUserForm({
                    name: decoded.name || "",
                    email: decoded.email || "",
                });
            } catch (err) {
                console.error("Invalid token", err);
            }
        }
    }, [token]);

    const checkoutItems = cart.filter(item => selectedItems.includes(item.uniqueId));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormAddress({
            ...formAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {

        setFormData(prev => {
            const newData = { ...prev, [e.target.name]: e.target.value };
            return newData;
        });
    };

    const items = checkoutItems.map(item => {
        const originalPrice = item.variant?.price || 0;
        const discountValue = item.discounts?.[0]?.discount_value || 0;

        const finalPrice = Math.round(originalPrice * (1 - discountValue / 100));

        const subtotal = finalPrice * item.quantity;

        return {
            product_variant_id: item.variant?.id,
            price: originalPrice,
            name: item.name,
            image: item.image,
            final_price: finalPrice,
            quantity: item.quantity,
            subtotal: subtotal,
            discount_percent: discountValue,
            uniqueId: item.uniqueId,
        };
    });

    const subtotal = items.reduce((sum, item) => sum + (item.final_price * item.quantity), 0);
    const total = subtotal - (discountInfo?.discount_amount || 0) + (parseInt(selectedShipping?.shipping_fee) || 0);

    const body = {
        ...formData,
        ...formAddress,
        ...userForm,
        items,
        shipping_method_id:
            subtotal < 200000 && selectedShipping
                ? selectedShipping.id
                : null,
        discount_id: discountInfo?.id || null
    }

    const handleSubmit = async () => {
        if (subtotal < 200000 && !selectedShipping) {
            alert('Vui lòng chọn phương thức giao hàng');
            return;
        }
        if (!formAddress.phone || !formAddress.address ||
            !formAddress.city || !formAddress.district || !formAddress.ward) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/order/${formData.paymentMethod}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(body)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.message || "Đặt hàng thất bại");
                return;
            }

            if (formData.paymentMethod === "cod") {
                alert("Đặt hàng COD thành công! Chúng tôi sẽ giao hàng sớm nhất có thể");
                router.push("/thank-you?type=cod");
                return;
            }

            if (formData.paymentMethod === "momo" && result.data?.payUrl) {
                const orderId = result.data.orderId || result.data.orderCode;
                setPendingOrderId(orderId);
                localStorage.setItem("momo_pending_order", orderId);

                window.open(result.data.payUrl, "_blank", "width=550,height=750");


                alert("Đã mở cửa sổ thanh toán MoMo!\n\nSau khi thanh toán xong, vui lòng quay lại trang này và bấm nút 'Tôi đã thanh toán xong' bên dưới nhé!");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Có lỗi xảy ra khi đặt hàng.");
        }
    };


    const checkPaymentStatus = async () => {
        const orderId = pendingOrderId || localStorage.getItem("momo_pending_order");
        if (!orderId) {
            alert("Không tìm thấy mã đơn hàng để kiểm tra");
            return;
        }

        setChecking(true);
        try {
            const res = await fetch(`http://localhost:3000/api/order/status/${orderId}`, {
                credentials: "include",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();


            if (data.success === true || data.success && data.status === 0) {
                localStorage.removeItem("momo_pending_order");
                alert("Thanh toán MoMo thành công!");
                router.push(`/thank-you?orderId=${orderId}&method=momo`);

            } else {
                alert("Chưa thấy thanh toán thành công. Bạn thử lại sau 5-10 giây nhé!");
            }
        } catch (err) {
            alert("Lỗi kết nối server, thử lại nha!");
        } finally {
            setChecking(false);
        }
    };

    const handleApplyDiscount = async () => {
        setDiscountError('');
        setIsApplying(true);

        try {
            const res = await fetch('http://localhost:3000/api/voucher/apply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    code: discountCode,
                    subtotal
                })
            });

            const result = await res.json();
            if (!res.ok) {
                setDiscountError(result.message || 'Mã giảm giá không hợp lệ');
                setDiscountInfo(null);
                return;
            }



            // backend trả về snapshot đã tính
            setDiscountInfo({
                id: result.id,
                code: result.code,
                discount_amount: result.discount_amount
            });

        } catch (err) {
            setDiscountError('Có lỗi xảy ra khi áp dụng mã');
        } finally {
            setIsApplying(false);
        }
    };

    console.log(discountInfo)


    // const handleSubmit = async () => {
    //     if (!formAddress.phone || !formAddress.address ||
    //         !formAddress.city || !formAddress.district || !formAddress.ward) {
    //         alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`http://localhost:3000/api/order/${formData.paymentMethod}`, {
    //             method: "POST",
    //             credentials: "include",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${token}`
    //             },
    //             body: JSON.stringify(body)
    //         });
    //         const result = await response.json();

    //         if (!response.ok) {
    //             alert(result.message);
    //         }

    //         setQrData(result.data);
    //         console.log("Thanh toán MoMo sẵn sàng:", result.data);

    //     } catch (error) {
    //         console.log("Error submitting order:", error);
    //     }
    // };



    if (!isClient) return null;

    return (
        <div className="!min-h-screen main-content !bg-gradient-to-br !from-blue-50 !via-white !to-purple-50">
            <div className="!max-w !mx-auto !px-4 !py-8">
                <div className="row !mb-8 !p-6 !shadow-lg !rounded-xl !bg-white">

                    <div className="col-12 col-md-3 d-flex align-items-center">
                        <Link href="/cart" className="!p-4 !rounded !font-bold !text-gray-700">Trở về</Link>
                    </div>


                    <div className="col-12 col-md-6 !text-center">
                        <h1 className="!text-4xl !font-bold !text-gray-800 !mb-2">Thanh Toán</h1>
                        <p className="!text-gray-600 !text-base">Hoàn tất đơn hàng của bạn</p>
                    </div>

                    {/* Cột phải để cân đối layout */}
                    <div className="col-md-3 d-none d-md-block"></div>
                </div>



                <div className="!grid lg:!grid-cols-3 !gap-8">
                    {/* Form Section */}
                    <div className="lg:!col-span-2">
                        <div className="!space-y-6">
                            {/* Thông tin khách hàng */}
                            <div className="!bg-white !rounded-2xl !shadow-lg !p-6">
                                <div className="!flex !items-center !gap-2 !mb-6">
                                    <User className="!w-6 !h-6 !text-blue-600" />
                                    <h2 className="!text-2xl !font-bold !text-gray-800 !m-0">Thông tin khách hàng</h2>
                                </div>

                                <div className="!grid md:!grid-cols-2 !gap-4">
                                    <div>
                                        <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                                            Họ và tên <span className="!text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={userForm.name}
                                            className="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition !outline-none !text-base"
                                            placeholder="Nguyễn Văn A"
                                            disabled
                                        />
                                    </div>

                                    <div>
                                        <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={userForm.email}
                                            className="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition !outline-none !text-base"
                                            placeholder="email@example.com"
                                            disabled
                                        />
                                    </div>

                                    <div className="md:!col-span-2">
                                        <label className="!block !text-sm !font-medium !text-gray-700 !mb-2">
                                            Số điện thoại <span className="!text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formAddress.phone || ""}
                                            onChange={handleChange}
                                            className="!w-full !px-4 !py-3 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500 focus:!border-transparent !transition !outline-none !text-base"
                                            placeholder="0912345678"
                                        />
                                    </div>
                                </div>
                            </div>

                            <AddressSlectect
                                onChangeAddress={(data: any) => {
                                    setFormAddress({
                                        ...formAddress,
                                        ...data
                                    })
                                }}
                            />


                            {/* Phương thức thanh toán */}
                            <div className="!bg-white !rounded-2xl !shadow-lg !p-6">
                                <div className="!flex !items-center !gap-2 !mb-6">
                                    <CreditCard className="!w-6 !h-6 !text-purple-600" />
                                    <h2 className="!text-2xl !font-bold !text-gray-800 !m-0">Phương thức thanh toán</h2>
                                </div>

                                <div className="!space-y-3">
                                    <label className={`!flex !items-center !p-4 !border-2 !rounded-lg !cursor-pointer !transition ${formData.paymentMethod === 'cod'
                                        ? '!border-purple-500 !bg-purple-50'
                                        : '!border-gray-200 hover:!border-purple-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cod"
                                            checked={formData.paymentMethod === 'cod'}
                                            onChange={handleChangeForm}
                                            className="!w-5 !h-5 !text-purple-600 !cursor-pointer"
                                        />
                                        <span className="!ml-3 !text-gray-700 !font-medium !text-base">💵 Thanh toán khi nhận hàng (COD)</span>
                                    </label>

                                    <label className={`!flex !items-center !p-4 !border-2 !rounded-lg !cursor-pointer !transition ${formData.paymentMethod === 'bank'
                                        ? '!border-purple-500 !bg-purple-50'
                                        : '!border-gray-200 hover:!border-purple-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="momo"
                                            checked={formData.paymentMethod === 'momo'}
                                            onChange={handleChangeForm}
                                            className="!w-5 !h-5 !text-purple-600 !cursor-pointer"
                                        />
                                        <span className="!ml-3 !text-gray-700 !font-medium !text-base">🏦 Chuyển khoản ngân hàng</span>
                                    </label>

                                    {/* <label className={`!flex !items-center !p-4 !border-2 !rounded-lg !cursor-pointer !transition ${formData.paymentMethod === 'card'
                                        ? '!border-purple-500 !bg-purple-50'
                                        : '!border-gray-200 hover:!border-purple-300'
                                        }`}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="card"
                                            checked={formData.paymentMethod === 'card'}
                                            onChange={handleChangeForm}
                                            className="!w-5 !h-5 !text-purple-600 !cursor-pointer"
                                        />
                                        <span className="!ml-3 !text-gray-700 !font-medium !text-base">💳 Thẻ tín dụng/Ghi nợ</span>
                                    </label> */}
                                </div>
                            </div>

                            <button
                                onClick={handleSubmit}
                                className="!w-full !bg-gradient-to-r !bg-red-600 !text-white !py-4 !rounded-xl !font-bold !text-lg hover:!from-blue-700 hover:!to-purple-700 !transition !shadow-lg hover:!shadow-xl !border-0"
                            >
                                🛒 Đặt hàng
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:!col-span-1">
                        <div className="!bg-white !rounded-2xl !shadow-lg !p-6 !mb-4">
                            <div className="!flex !items-center !gap-2 !mb-6">
                                <Package className="!w-6 !h-6 !text-orange-600" />
                                <h2 className="!text-2xl !font-bold !text-gray-800 !m-0">Đơn hàng</h2>
                            </div>

                            <div className="!space-y-4 !mb-6">
                                {items.map(item => (
                                    <div key={item.id} className="!flex !gap-4 !pb-4 !border-b !border-gray-100">
                                        <img
                                            className="!w-16 !h-16 !rounded-lg !object-cover !flex-shrink-0"
                                            src={item.image}
                                            alt=""
                                        />
                                        <div className="!flex-1">
                                            <p className="!border-gray-100 !text-[9px] py-1">
                                                {[
                                                    item?.variant?.size,
                                                    item?.variant?.style,
                                                    item?.variant?.unit,
                                                    item?.variant?.flavor,
                                                ]
                                                    .filter(Boolean)
                                                    .join(" / ")}
                                            </p>
                                            <h3 className="!font-medium !text-gray-800 !m-0 !text-base">{item.name}</h3>
                                            <p className="!text-sm !text-gray-500 !m-0">Số lượng: {item.quantity}</p>
                                            <p className="!text-blue-600 !font-semibold !mt-1 !m-0">
                                                {(item?.final_price * item.quantity).toLocaleString('vi-VN')}₫
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2 mb-4">
                                <label className="block text-sm my-4 font-medium text-gray-700">
                                    Mã giảm giá
                                </label>

                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                        placeholder="Nhập mã giảm giá"
                                        className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />

                                    <button
                                        type="button"
                                        onClick={handleApplyDiscount}
                                        disabled={isApplying || !discountCode}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                                    >
                                        {isApplying ? 'Đang áp dụng...' : 'Áp dụng'}
                                    </button>
                                </div>

                                {discountError && (
                                    <p className="text-sm text-red-600">{discountError}</p>
                                )}

                                {discountInfo && (
                                    <p className="text-sm text-green-600">
                                        Đã áp dụng mã <strong>{discountInfo.code}</strong> – Giảm{' '}
                                        {discountInfo.discount_amount.toLocaleString('vi-VN')}₫
                                    </p>
                                )}
                            </div>


                            <div className="!border-t !pt-4 !space-y-3">
                                <div className="!flex !justify-between !text-gray-600">
                                    <span>Tạm tính</span>
                                    <span className="!font-medium">
                                        {subtotal.toLocaleString('vi-VN')}₫
                                    </span>
                                </div>

                                <div className="!flex !justify-between !text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span className="!font-medium">
                                        {parseInt(selectedShipping?.shipping_fee || 0).toLocaleString('vi-VN')}₫
                                    </span>
                                </div>

                                <div className="!flex !justify-between !text-xl !font-bold !text-gray-800 !pt-3 !border-t-2">
                                    <span>Tổng cộng</span>
                                    <span className="!text-blue-600">
                                        {total.toLocaleString('vi-VN')}₫
                                    </span>
                                </div>
                            </div>


                            <div className="!mt-6 !p-4 !bg-blue-50 !rounded-lg">
                                <p className="!text-sm !text-gray-700 !m-0">
                                    🚚 Giao hàng dự kiến: <span className="!font-semibold">3-5 ngày</span>
                                </p>
                            </div>

                            {subtotal < 200000 && (
                                <div className="space-y-3">
                                    {shippingMethods.map(method => (
                                        <label
                                            key={method.id}
                                            className="relative flex items-start gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all duration-200 hover:border-blue-400 hover:bg-blue-50/30 has-[:checked]:border-blue-600 has-[:checked]:bg-blue-50 has-[:checked]:shadow-md group"
                                        >
                                            <input
                                                type="radio"
                                                name="shipping_method"
                                                value={method.id}
                                                onChange={() => setSelectedShipping(method)}
                                                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                                            />

                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <strong className="text-gray-900 text-base font-semibold group-has-[:checked]:text-blue-700">
                                                        {method.name}
                                                    </strong>
                                                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold rounded-full shadow-sm">
                                                        {Number(method.shipping_fee).toLocaleString('vi-VN')}₫
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1.5">
                                                        {method.description}
                                                    </span>

                                                    <span className="flex items-center gap-1.5">
                                                        <span className="font-medium text-gray-700">
                                                            {method.estimated_day} ngày
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full items-center justify-center hidden group-has-[:checked]:flex">
                                                ✓
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}



                        </div>

                        {pendingOrderId && formData.paymentMethod === "momo" && (
                            <div className="mt-8 p-6 bg-purple-50 rounded-2xl border-2 border-purple-200 text-center">
                                <div className="text-center">
                                    <p className="text-lg font-medium text-purple-900 mb-4">
                                        Đã thanh toán xong trên MoMo rồi phải không?
                                    </p>
                                    <button
                                        onClick={checkPaymentStatus}
                                        disabled={checking}
                                        className={`px-8 py-4 rounded-xl text-white font-bold text-lg transition-all ${checking
                                            ? "bg-gray-400 cursor-not-allowed"
                                            : "bg-gradient-to-r from-pink-500 to-purple-600 hover:shadow-xl hover:scale-105"
                                            }`}
                                    >
                                        {checking ? "Đang kiểm tra..." : "Tôi đã thanh toán xong – Kiểm tra ngay!"}
                                    </button>

                                    <p className="mt-4 text-sm text-gray-600">
                                        Mã đơn hàng: <span className="font-bold text-purple-700">{pendingOrderId}</span>
                                    </p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}