"use client";
import { useEffect, useState } from "react";
import { Search, Package, Trash2, RotateCcw, Eye, ArrowLeft } from "lucide-react";
import Pagination from "@/components/admin/Pagination";

const statusConfig = {
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700" },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
    refund: { label: "Hoàn hàng", color: "bg-orange-100 text-orange-700" },
};

export default function DeletedOrdersPage() {
    const [orders, setOrders] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [total, setTotal] = useState(0);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDeletedOrders(pagination.currentPage);
    }, [pagination.currentPage]);

    const fetchDeletedOrders = async (page: number) => {
        try {
            setLoading(true);
            const res = await fetch(
                `http://localhost:3000/api/admin/orders/deleted?page=${page}`,
                { credentials: "include" }
            );

            const json = await res.json();

            console.log(json)

            if (json.success) {
                setOrders(json.result.rows || []);
                setTotal(json.total || 0);
                setPagination({
                    currentPage: json.page,
                    totalPages: json.totalPages,
                });
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleRestore = async (id: number) => {
        if (!confirm("Bạn có chắc muốn khôi phục đơn hàng này?")) return;

        try {
            const res = await fetch(`http://localhost:3000/api/admin/orders/restore/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            const json = await res.json();

            if (json.success) {
                alert("Khôi phục đơn hàng thành công!");
                fetchDeletedOrders(pagination.currentPage);
            } else {
                alert(json.message || "Có lỗi xảy ra!");
            }
        } catch (error) {
            console.log(error);
            alert("Có lỗi xảy ra!");
        }
    };



    const formatDate = (dateString: string) => {
        if (!dateString) return "—";
        const date = new Date(dateString);
        return date.toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="main p-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Trash2 className="w-6 h-6 text-red-600" />
                        <h1 className="text-2xl font-bold text-gray-800">Đơn hàng đã xóa</h1>
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            {total} đơn
                        </span>
                    </div>

                    <div className="flex items-center space-x-3">
                        <a
                            href="/admin/order"
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Quay lại</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r-lg">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            <strong>Lưu ý:</strong> Các đơn hàng ở đây đã bị xóa mềm. Bạn có thể khôi phục.
                        </p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="text-center py-12 text-gray-500">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        Đang tải dữ liệu...
                    </div>
                ) : (
                    <>
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Mã đơn hàng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Khách hàng
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Sản phẩm
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Tổng tiền
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Trạng thái
                                    </th>
                                    <th className="px-2 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Ngày xóa
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Thao tác
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order: any) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50 transition-colors duration-150"
                                    >
                                        {/* MÃ ĐƠN HÀNG */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-blue-600 font-semibold text-sm">
                                                    #{order.order_code || order.id}
                                                </span>
                                                <span className="text-xs text-gray-500">
                                                    {formatDate(order.createdAt)}
                                                </span>
                                            </div>
                                        </td>

                                        {/* KHÁCH HÀNG */}
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <div className="font-medium text-gray-900">
                                                    {order.User?.name || "N/A"}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {order.User?.email || ""}
                                                </div>
                                            </div>
                                        </td>

                                        {/* SẢN PHẨM */}
                                        <td className="relative group cursor-pointer px-6 py-4">
                                            <span className="text-sm text-gray-700 font-medium">
                                                {order.OrderDetails?.length || 0} sản phẩm
                                            </span>

                                            {/* Popup chi tiết */}
                                            {order.OrderDetails && order.OrderDetails.length > 0 && (
                                                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-white border rounded-lg shadow-xl p-3 z-50 w-[350px]">
                                                    <p className="font-semibold text-sm mb-2 text-center">
                                                        Chi tiết đơn hàng
                                                    </p>
                                                    <table className="w-full text-sm border">
                                                        <thead>
                                                            <tr className="bg-gray-100">
                                                                <th className="border px-2 py-1 text-left">Sản phẩm</th>
                                                                <th className="border px-2 py-1 text-center">SL</th>
                                                                <th className="border px-2 py-1 text-right">Giá</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.OrderDetails.map((product: any, i: number) => (
                                                                <tr key={i}>
                                                                    <td className="border px-2 py-1">{product.name}</td>
                                                                    <td className="border px-2 py-1 text-center">
                                                                        {product.quantity}
                                                                    </td>
                                                                    <td className="border px-2 py-1 text-right">
                                                                        {Number(product.price).toLocaleString("vi-VN")}đ
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className="mt-2 text-right font-semibold">
                                                        Tổng: {Number(order.total_amount).toLocaleString("vi-VN")}đ
                                                    </div>
                                                </div>
                                            )}
                                        </td>

                                        {/* TỔNG TIỀN */}
                                        <td className="px-6 py-4 text-gray-900 text-sm font-semibold">
                                            {Number(order.total_amount).toLocaleString("vi-VN")} đ
                                        </td>

                                        {/* TRẠNG THÁI */}
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[order.order_status as keyof typeof statusConfig]
                                                    ?.color || "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {statusConfig[order.order_status as keyof typeof statusConfig]
                                                    ?.label || order.order_status}
                                            </span>
                                        </td>

                                        {/* NGÀY XÓA */}
                                        <td className="px-2 py-4 text-sm text-gray-600">
                                            {formatDate(order.updatedAt)}
                                        </td>

                                        {/* THAO TÁC */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-2">
                                                <a
                                                    href={`/admin/order/${order.id}`}
                                                    className="flex items-center space-x-1 px-3 py-1.5 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition text-xs font-medium"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                    <span>Xem</span>
                                                </a>
                                                <button
                                                    onClick={() => handleRestore(order.id)}
                                                    className="flex items-center space-x-1 px-3 py-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition font-medium"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                    <span className="text-xs">Khôi phục</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {orders.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                <Trash2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                <p className="text-lg font-medium">Không có đơn hàng nào đã bị xóa</p>
                                <p className="text-sm mt-2">Tất cả đơn hàng đều đang hoạt động</p>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Pagination */}
            {/* {orders.length > 0 && (
                <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 mt-4">
                    <div className="text-sm text-gray-600">
                        Hiển thị {orders.length} / {total} đơn hàng đã xóa
                    </div>
                    <div className="flex items-center space-x-2">
                        <Pagination
                            currentPage={pagination.currentPage}
                            totalPages={pagination.totalPages}
                            onPageChange={(page) => {
                                if (page === pagination.currentPage) return;
                                setPagination((prev) => ({
                                    ...prev,
                                    currentPage: page,
                                }));
                            }}
                        />
                    </div>
                </div>
            )} */}
        </div>
    );
}