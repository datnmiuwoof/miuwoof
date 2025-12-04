"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, MapPin, Phone, Mail, User } from "lucide-react";
import { useParams } from "next/navigation";
import { formatAddress } from "@/components/layout/Address";
import dvhcvn from "@/app/checkout/address/dvhcvn.json";




const statusConfig = {
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "đang đợi shipping", color: "bg-blue-100 text-blue-700" },
    shipping: { label: "Đang giao", color: "bg-indigo-100 text-indigo-700" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
    refund: { label: "hoang hàng", color: "bg-red-100 text-red-600" }
};

// Tên nút theo trạng thái
const buttonLabel = {
    pending: "Xác nhận đơn hàng",
    confirmed: "Đợi vận chuyển",
    shipping: "Đang giao hàng",
    completed: "Đơn đã hoàn tất",
    cancelled: "Đơn đã hủy",
    refund: "Hoàn tiền",
};


export default function OrderDetailPage() {
    const { id } = useParams();
    const [orderDetail, setOrderDetail] = useState<any>(null);
    const [address, setAddress] = useState({})
    const [status, setStatus] = useState("");
    const [showCancelModal, setShowCancelModal] = useState(false);
    const addressString = formatAddress(address, dvhcvn);

    const fetchData = () => fetch(`http://localhost:3000/order/${id}`, { credentials: "include" })
        .then(res => res.json())
        .then(data => {
            setOrderDetail(data);
            setAddress(data.Address)
            setStatus(data.order_status);
        });

    async function handleUpdate() {
        await fetch("http://localhost:3000/api/order/update", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        fetchData();
    }

    const handleCancelled = async () => {
        fetch(`http://localhost:3000/api/order/cancelled`, {
            method: 'PUT',
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        })

        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, []);

    if (!orderDetail) {
        return <div className="p-6">Đang tải...</div>;
    }

    // const handleUpdateStatus = async (newStatus: string) => {
    //     await fetch(`/api/orders/${id}`, {
    //         method: 'PATCH',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ order_status: newStatus })
    //     });
    //     setStatus(newStatus);
    //     alert(`Đã cập nhật trạng thái thành: ${statusConfig[newStatus as keyof typeof statusConfig].label}`);
    // };

    // Tính toán
    const subtotal = orderDetail.OrderDetails.reduce((sum: number, item: any) =>
        sum + (item.price * item.quantity), 0
    );
    const shippingFee = 30000;
    const discount = 0;


    return (
        <div className="main p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <a href="/admin/orders" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Quay lại danh sách
                </a>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="!text-m font-bold text-gray-900">Chi tiết đơn hàng #{orderDetail.id}</h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Đặt lúc {new Date(orderDetail.order_date).toLocaleString('vi-VN')}
                        </p>
                    </div>
                    <span className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full ${statusConfig[status as keyof typeof statusConfig].color}`}>
                        {statusConfig[status as keyof typeof statusConfig].label}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cột trái */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Sản phẩm */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b">
                            <h2 className="text-lg font-semibold">Sản phẩm đã đặt</h2>
                        </div>
                        <div className="p-6">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th className="text-left pb-3 text-sm font-semibold text-gray-600">Sản phẩm</th>
                                        <th className="text-center pb-3 text-sm font-semibold text-gray-600">Số lượng</th>
                                        <th className="text-center pb-3 text-sm font-semibold text-gray-600">Đơn giá</th>
                                        <th className="text-center pb-3 text-sm font-semibold text-gray-600">Thành tiền</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetail.OrderDetails.map((item: any) => (
                                        <tr key={item.id} className="border-b last:border-0">
                                            <td className="py-4 max-w-60">
                                                <div className="flex items-center">
                                                    <img
                                                        src={item.image || '/placeholder.jpg'}
                                                        alt={item.name}
                                                        className="w-16 h-16 rounded object-cover"
                                                    />
                                                    <div className="ml-4">
                                                        <p className="font-medium text-gray-900">
                                                            {item.name}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {[
                                                                item.ProductVariant?.size,
                                                                item.ProductVariant?.style,
                                                                item.ProductVariant?.flavor
                                                            ].filter(Boolean).join(', ')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-center text-gray-700">x{item.quantity}</td>
                                            <td className="py-4 text-center text-gray-700">
                                                {Number(item.price).toLocaleString("vi-VN")}đ
                                            </td>
                                            <td className="py-4 text-center font-semibold text-gray-900">
                                                {Number(item.price * item.quantity).toLocaleString("vi-VN")}đ
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Tổng tiền */}
                            <div className="mt-6 border-t pt-4 space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Tạm tính:</span>
                                    <span>{Number(subtotal).toLocaleString("vi-VN")}đ</span>
                                </div>
                                <div className="flex justify-between text-gray-700">
                                    <span>Phí vận chuyển:</span>
                                    <span>{Number(shippingFee).toLocaleString("vi-VN")}đ</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex justify-between text-gray-700">
                                        <span>Giảm giá:</span>
                                        <span className="text-red-600">-{Number(discount).toLocaleString("vi-VN")}đ</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t">
                                    <span>Tổng cộng:</span>
                                    <span className="text-blue-600">
                                        {Number(orderDetail.total_amount).toLocaleString("vi-VN")}đ
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ghi chú */}
                    {orderDetail.order_note && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h2 className="text-lg font-semibold mb-3">Ghi chú đơn hàng</h2>
                            <p className="text-gray-700 bg-yellow-50 p-4 rounded border-l-4 border-yellow-400">
                                {orderDetail.order_note}
                            </p>
                        </div>
                    )}
                </div>

                {/* Cột phải */}
                <div className="space-y-6">
                    {/* Thao tác */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-m font-semibold mb-4">Thao tác</h2>
                        <div className="space-y-3">
                            <button
                                onClick={handleUpdate}
                                className="w-full px-4 py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                disabled={false}
                            >
                                {buttonLabel[status] || 'cập nhật'}
                            </button>
                            {/*   {status === "processing" && (
                                <button
                                    onClick={() => handleUpdateStatus("shipping")}
                                    className="w-full px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
                                >
                                    Chuyển giao hàng
                                </button>
                            )}
                            {status === "shipping" && (
                                <button
                                    onClick={() => handleUpdateStatus("completed")}
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                >
                                    Hoàn thành đơn
                                </button>
                            )} */}
                            {status === "pending" && (
                                <button
                                    onClick={() => handleCancelled()}
                                    className="w-full px-4 py-2 border border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                                >
                                    Hủy đơn hàng
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Thông tin khách hàng */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Thông tin khách hàng</h2>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <User className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500">Họ tên</p>
                                    <p className="font-medium text-gray-900">{orderDetail.Address.name}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Phone className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500">Số điện thoại</p>
                                    <p className="font-medium text-gray-900">{orderDetail.Address.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <MapPin className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-gray-500">Địa chỉ giao hàng</p>
                                    <p className="font-medium text-gray-900">{addressString.full}</p>
                                    <p className="font-medium text-gray-900">
                                        {addressString.province},{addressString.district},{addressString.ward}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Thanh toán */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Thanh toán</h2>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Trạng thái:</span>
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${orderDetail.payment_status === "paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                    }`}>
                                    {orderDetail.payment_status === "paid" ? "Đã thanh toán" : "Chưa thanh toán"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal hủy */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Xác nhận hủy đơn hàng</h3>
                        <p className="text-gray-600 mb-6">
                            Bạn có chắc chắn muốn hủy đơn hàng này không?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Đóng
                            </button>
                            <button
                                onClick={() => {
                                    handleUpdateStatus("cancelled");
                                    setShowCancelModal(false);
                                }}
                                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                            >
                                Xác nhận hủy
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}