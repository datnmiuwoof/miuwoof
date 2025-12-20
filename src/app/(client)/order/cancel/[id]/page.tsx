'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
    ChevronLeft,
    AlertCircle,
    CreditCard,
    Landmark,
    CheckCircle2,
    XCircle,
    Package,
    ArrowRight
} from 'lucide-react';

// --- 1. MOCK DATA GIẢ LẬP ---
// Bạn có thể chỉnh sửa 'paymentMethod' thành 'cod' hoặc 'momo' để test 2 giao diện khác nhau
const MOCK_ORDER_DB = {
    "ORD-001": {
        id: "ORD-001",
        date: "17/12/2024",
        totalPrice: 1560000,
        items: [
            { name: "Hạt thức ăn cho mèo Royal Canin Indoor 27", quantity: 2, price: 500000, image: "https://bizweb.dktcdn.net/thumb/large/100/466/737/products/hat-royal-canin-indoor-27-cho-meo-truong-thanh-song-trong-nha-10kg-1.jpg" },
            { name: "Pate Mèo Whiskas Vị Cá Biển", quantity: 4, price: 140000, image: "https://product.hstatic.net/200000282133/product/pate-whiskas-lon-400g-vi-ca-bien-1_0767098e676045938562479633e6488a.jpg" }
        ],
        paymentMethod: "momo", // 'cod' hoặc 'momo' / 'banking'
        status: "pending",
        isPaid: true
    }
};

export default function CancelOrderPage() {
    const { id } = useParams();
    const router = useRouter();

    console.log(id)
    // State dữ liệu
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    // State form
    const [reason, setReason] = useState("");
    const [otherReason, setOtherReason] = useState("");
    const [refundInfo, setRefundInfo] = useState({
        bankName: "",
        accountNumber: "",
        accountName: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const cancelReasons = [
        "Tôi muốn thay đổi địa chỉ nhận hàng",
        "Tôi muốn thay đổi sản phẩm (size, màu...)",
        "Tôi tìm thấy chỗ khác giá tốt hơn",
        "Tôi không còn nhu cầu mua nữa",
        "Thời gian giao hàng quá lâu",
        "Lý do khác..."
    ];

    useEffect(() => {
        setTimeout(() => {
            setOrder(MOCK_ORDER_DB["ORD-001"]);
            setLoading(false);
        }, 800);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Giả lập gửi API
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#F9F5F1]">
            <div className="w-10 h-10 border-4 border-[#6b4433] border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-[#6b4433] font-medium">Đang tải thông tin đơn hàng...</p>
        </div>
    );

    // --- GIAO DIỆN THÀNH CÔNG ---
    if (isSuccess) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 bg-[#F9F5F1]">
                <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center border border-gray-100">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-[#6b4433] mb-3">Yêu cầu đã gửi!</h2>
                    <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                        {order.paymentMethod === 'cod'
                            ? "Đơn hàng của bạn đã được hủy thành công. Hy vọng sẽ được phục vụ bạn lần tới."
                            : "Chúng tôi đã ghi nhận yêu cầu hoàn tiền. Bộ phận kế toán sẽ xử lý trong 24-48h làm việc."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/" className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition">
                            Về trang chủ
                        </Link>
                        <Link href="/account/orders" className="px-8 py-3 bg-[#6b4433] text-white font-bold rounded-xl hover:bg-[#5a392b] transition shadow-lg shadow-brown-500/30">
                            Xem danh sách đơn
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F9F5F1] py-10 font-sans text-[#333]">
            <div className="main-content mx-auto">

                {/* Header Navigation */}
                <div className="mb-8">
                    <button onClick={() => router.back()} className="flex items-center text-gray-500 hover:text-[#6b4433] transition-colors font-medium mb-4">
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Quay lại chi tiết đơn hàng
                    </button>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-[#6b4433]">Yêu cầu hủy đơn hàng</h1>
                            <p className="text-gray-500 mt-1">Mã đơn hàng: <span className="font-bold text-[#333]">#{order.id}</span> • Ngày đặt: {order.date}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* --- CỘT TRÁI: FORM --- */}
                    <div className="lg:col-span-2 space-y-6">
                        <form onSubmit={handleSubmit}>

                            {/* BLOCK 1: LÝ DO */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
                                <h3 className="text-xl font-bold text-[#6b4433] mb-6 flex items-center gap-2">
                                    <span className="w-8 h-8 rounded-full bg-[#6b4433] text-white flex items-center justify-center text-sm">1</span>
                                    Tại sao bạn muốn hủy?
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {cancelReasons.map((r, index) => (
                                        <label
                                            key={index}
                                            className={`relative flex items-start p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${reason === r
                                                ? 'border-[#6b4433] bg-[#fffcfb]'
                                                : 'border-gray-100 hover:border-orange-200 bg-white'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="reason"
                                                value={r}
                                                checked={reason === r}
                                                onChange={(e) => setReason(e.target.value)}
                                                className="mt-1 w-5 h-5 text-[#6b4433] border-gray-300 focus:ring-[#6b4433]"
                                            />
                                            <span className="ml-3 text-gray-700 font-medium text-sm sm:text-base leading-snug">
                                                {r === "Lý do khác..." ? "Lý do khác" : r}
                                            </span>
                                        </label>
                                    ))}
                                </div>

                                {/* Text area cho lý do khác */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${reason === "Lý do khác..." ? "max-h-40 mt-4 opacity-100" : "max-h-0 opacity-0"}`}>
                                    <textarea
                                        className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b4433] focus:border-transparent outline-none text-gray-700 bg-gray-50"
                                        placeholder="Hãy chia sẻ chi tiết lý do của bạn..."
                                        rows={3}
                                        value={otherReason}
                                        onChange={(e) => setOtherReason(e.target.value)}
                                    ></textarea>
                                </div>
                            </div>

                            {/* BLOCK 2: HOÀN TIỀN (CHỈ HIỆN KHI ĐÃ THANH TOÁN) */}
                            {order.paymentMethod !== 'cod' && (
                                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 mt-6 animate-fade-in-up">
                                    <h3 className="text-xl font-bold text-[#6b4433] mb-6 flex items-center gap-2">
                                        <span className="w-8 h-8 rounded-full bg-[#6b4433] text-white flex items-center justify-center text-sm">2</span>
                                        Thông tin nhận hoàn tiền
                                    </h3>

                                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-blue-800">
                                            Đơn hàng đã thanh toán qua <strong>{order.paymentMethod === 'momo' ? 'Ví MoMo' : 'Ngân hàng'}</strong>.
                                            Vui lòng nhập tài khoản chính chủ để chúng tôi hoàn tiền.
                                        </p>
                                    </div>

                                    <div className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-700 mb-2">Tên Ngân hàng</label>
                                            <div className="relative">
                                                <Landmark className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    placeholder="VD: Vietcombank, MB Bank..."
                                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b4433] focus:border-transparent outline-none"
                                                    value={refundInfo.bankName}
                                                    onChange={(e) => setRefundInfo({ ...refundInfo, bankName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Số tài khoản</label>
                                                <div className="relative">
                                                    <CreditCard className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        placeholder="Nhập số tài khoản"
                                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b4433] focus:border-transparent outline-none font-mono"
                                                        value={refundInfo.accountNumber}
                                                        onChange={(e) => setRefundInfo({ ...refundInfo, accountNumber: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-2">Tên chủ tài khoản</label>
                                                <input
                                                    type="text"
                                                    placeholder="NGUYEN VAN A"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#6b4433] focus:border-transparent outline-none uppercase"
                                                    value={refundInfo.accountName}
                                                    onChange={(e) => setRefundInfo({ ...refundInfo, accountName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* BLOCK ACTIONS */}
                            <div className="mt-8 flex items-center justify-end gap-4">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-6 py-3 rounded-xl border border-gray-300 text-gray-600 font-bold hover:bg-gray-50 transition"
                                >
                                    Không hủy nữa
                                </button>
                                <button
                                    type="submit"
                                    disabled={!reason || isSubmitting}
                                    className={`px-8 py-3 rounded-xl text-white font-bold shadow-lg transition-all transform active:scale-95 flex items-center gap-2
                                        ${!reason || isSubmitting
                                            ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                            : 'bg-red-600 hover:bg-red-700 hover:shadow-red-500/30'}`}
                                >
                                    {isSubmitting ? 'Đang xử lý...' : 'Xác nhận hủy đơn'}
                                    {!isSubmitting && <ArrowRight className="w-5 h-5" />}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* --- CỘT PHẢI: SUMMARY (STICKY) --- */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
                            <h3 className="font-bold text-[#6b4433] text-lg mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Sản phẩm ({order.items.length})
                            </h3>

                            <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                {order.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex gap-3 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                                        <div className="w-16 h-16 rounded-lg border border-gray-200 overflow-hidden flex-shrink-0 relative">
                                            {/* Dùng ảnh thật nếu có, fallback màu xám */}
                                            {item.image ? (
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400">No Img</div>
                                            )}
                                            <span className="absolute bottom-0 right-0 bg-[#6b4433] text-white text-[10px] px-1.5 font-bold">x{item.quantity}</span>
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{item.name}</p>
                                            <p className="text-sm font-bold text-[#6b4433]">{(item.price * item.quantity).toLocaleString()}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 space-y-3">
                                <div className="flex justify-between text-gray-600">
                                    <span>Tạm tính</span>
                                    <span>{order.totalPrice.toLocaleString()}đ</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Phí vận chuyển</span>
                                    <span>0đ</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span className="font-bold text-gray-800">Hoàn lại dự kiến</span>
                                    <span className="text-xl font-bold text-red-600">{order.totalPrice.toLocaleString()}đ</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-yellow-50 p-4 rounded-xl border border-yellow-100">
                                <h4 className="font-bold text-yellow-800 text-sm mb-2 flex items-center gap-1">
                                    <AlertCircle className="w-4 h-4" />
                                    Lưu ý quan trọng
                                </h4>
                                <ul className="text-xs text-yellow-800 space-y-1 list-disc pl-4">
                                    <li>Mã giảm giá đã dùng sẽ không được hoàn lại.</li>
                                    <li>Tiền sẽ được hoàn trong vòng 3-5 ngày làm việc (nếu đã thanh toán).</li>
                                    <li>Hành động này không thể hoàn tác.</li>
                                </ul>
                            </div>
                        </div>

                        {/* --- DEV TOOLS (XÓA KHI PRODUCTION) --- */}
                        <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-xl opacity-50 hover:opacity-100 transition text-center">
                            <p className="text-[10px] font-bold text-gray-400 uppercase mb-2 tracking-wider">Developer Tools</p>
                            <div className="flex gap-2 justify-center">
                                <button
                                    onClick={() => setOrder({ ...order, paymentMethod: 'cod', isPaid: false })}
                                    className="px-3 py-1 bg-gray-200 text-xs font-bold text-gray-600 rounded hover:bg-gray-300"
                                >
                                    Mode: COD
                                </button>
                                <button
                                    onClick={() => setOrder({ ...order, paymentMethod: 'momo', isPaid: true })}
                                    className="px-3 py-1 bg-pink-100 text-xs font-bold text-pink-700 rounded hover:bg-pink-200"
                                >
                                    Mode: PAID
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}