"use client";
import { useEffect, useState } from "react";
import { Search, Package } from "lucide-react";
import Pagination from "@/components/admin/Pagination";


const statusConfig = {
    all: { label: "Tất cả", color: "bg-gray-100 text-gray-700", count: 0 },
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700", count: 0 },
    confirmed: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700", count: 0 },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700", count: 0 },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700", count: 0 },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700", count: 0 },
    refund: { label: "hoàn hàng", color: "bg-red-100 text-yellow-500", count: 0 },
};

const buttonLabel = {
    pending: "Xác nhận đơn hàng",
    confirmed: "Đợi vận chuyển",
    shipping: "Đang giao hàng",
    completed: "Đơn đã hoàn tất",
    cancelled: "Đơn đã hủy",
    refund: "Hoàn tiền",
};

export default function OrdersPage() {
    const [order, setOrder] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [total, setTotal] = useState(0);
    const [statusCount, setStatusCount] = useState({
        all: 0,
        pending: 0,
        confirmed: 0,
        shipping: 0,
        completed: 0,
        cancelled: 0,
        refund: 0,
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });


    useEffect(() => {
        fetchData(pagination.currentPage);
    }, [pagination.currentPage, statusFilter]);


    useEffect(() => {
        fetchData(1);
    }, [statusFilter]);


    const fetchData = async (page: number) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/admin/orders?page=${page}&status=${statusFilter}`,
                { credentials: "include" }
            );

            const json = await res.json();

            setOrder(json.data || []);
            setTotal(json.total || 0);
            setStatusCount(json.statusCounts || {});

            setPagination({
                currentPage: json.page,        // backend trả
                totalPages: json.totalPages,   // backend trả
            });

        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (id) => {
        await fetch("http://localhost:3000/api/admin/orders/update", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        fetchData(pagination.currentPage);
    };

    const handleCancelled = async (id) => {
        await fetch("http://localhost:3000/api/admin/orders/cancelled", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
        });

        fetchData(pagination.currentPage);
    };

    const handleDeleteOrder = async (orderId: number) => {
        if (!confirm("Bạn có chắc muốn xóa đơn hàng này không?")) return;

        try {
            const result = await fetch(`http://localhost:3000/api/admin/orders/${orderId}/delete`, {
                method: "PUT",
                credentials: 'include'
            });

            if (result.ok) {
                alert("Đã xóa đơn hàng");
                fetchData(pagination.currentPage);
            }

        } catch (err) {
            console.error(err);
            alert("Xóa thất bại");
        }
    };





    return (
        <div className="main p-6">
            {/* Header với Search */}
            <div className="bg-white rounded-lg shadow p-4 mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Package className="w-6 h-6 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-800">Quản lý đơn hàng</h1>
                    </div>

                    <div className="flex items-center space-x-3">
                        {/* Ô tìm kiếm */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm đơn hàng, khách hàng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-80 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        <a href="/admin/order/is_deleted" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            đơn đã bị xóa
                        </a>
                    </div>
                </div>
            </div>

            {/* Navbar Tabs - Trạng thái đơn hàng */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="flex border-b overflow-x-auto">
                    {Object.entries(statusConfig).map(([key, config]) => (
                        <button
                            key={key}
                            onClick={() => setStatusFilter(key)}
                            className={`
                                relative px-6 py-4 text-sm font-medium transition-all whitespace-nowrap
                                ${statusFilter === key
                                    ? 'text-blue-600 border-b-2 border-blue-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }
                            `}
                        >
                            <span>{config.label}</span>
                            <span className={`
                                ml-2 px-2 py-0.5 rounded-full text-xs font-semibold
                                ${statusFilter === key
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-gray-100 text-gray-600'
                                }
                            `}>
                                {statusCount[key as keyof typeof statusCount]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow">
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
                                Thanh toán
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Cập nhật
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {order.map((o: any) => (
                            <tr
                                key={o.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* MÃ ĐƠN HÀNG */}
                                <td className="px-6 py-4 text-blue-600 font-semibold text-sm">
                                    {o.id}
                                </td>

                                {/* KHÁCH HÀNG */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="font-medium text-gray-900">{o.User?.name}</div>
                                    </div>
                                </td>

                                {/* SẢN PHẨM */}
                                <td className="relative group cursor-pointer px-6 py-4">
                                    <span className="text-sm text-gray-700">
                                        {o.OrderDetails.length} sản phẩm
                                    </span>

                                    {/* Popup hiển thị chi tiết */}
                                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 hidden group-hover:block bg-white border rounded-lg shadow-xl p-3 z-50 w-[350px]">
                                        <p className="font-semibold text-sm mb-2 text-center">Chi tiết đơn hàng</p>
                                        <table className="w-full text-sm border">
                                            <thead>
                                                <tr className="bg-gray-100">
                                                    <th className="border px-2 py-1 text-left">Sản phẩm</th>
                                                    <th className="border px-2 py-1 text-center">SL</th>
                                                    <th className="border px-2 py-1 text-right">Giá</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {order.OrderDetails?.map((product: any, i: number) => (
                                                    <tr key={i}>
                                                        <td className="border px-2 py-1">{product.name}</td>
                                                        <td className="border px-2 py-1 text-center">{product.quantity}</td>
                                                        <td className="border px-2 py-1 text-right">
                                                            {Number(product.price).toLocaleString("vi-VN")}đ
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className="mt-2 text-right font-semibold">
                                            Tổng: {Number(order.totalAmount).toLocaleString("vi-VN")}đ
                                        </div>
                                    </div>
                                </td>

                                {/* TỔNG TIỀN */}
                                <td className="px-6 py-4 text-gray-700 text-sm font-semibold">
                                    {Number(o.total_amount).toLocaleString("vi-VN")} VND
                                </td>

                                {/* THANH TOÁN */}
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    MoMo
                                </td>

                                {/* TRẠNG THÁI */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[o.order_status as keyof typeof statusConfig].color}`}>
                                        {statusConfig[o.order_status as keyof typeof statusConfig].label}
                                    </span>
                                </td>

                                {/* thao tác */}
                                <td className="px-6 py-4 text-gray-700 text-xs">
                                    <button
                                        onClick={() => handleUpdate(o.id)}
                                        className="w-full px-4 py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                                        disabled={false}
                                    >
                                        {buttonLabel[o.order_status] || 'cập nhật'}
                                    </button>

                                    {o.order_status === "pending" && (
                                        <button
                                            onClick={() => handleCancelled(o.id)}
                                            className="w-full px-4 py-2 border text-xs border-red-600 text-red-600 rounded hover:bg-red-50 transition"
                                        >
                                            Hủy đơn hàng
                                        </button>
                                    )}
                                </td>

                                {/* THAO TÁC */}
                                <td className="px-6 py-4 text-sm">
                                    <a
                                        href={`/admin/order/${o.id}`}
                                        className="text-blue-600 hover:text-blue-800 px-2 font-medium"
                                    >
                                        Xem
                                    </a>
                                    <button
                                        className="text-red-600 hover:text-red-800 px-2 font-medium"
                                        onClick={() => handleDeleteOrder(o.id)}
                                    >
                                        xóa
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {order.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không tìm thấy đơn hàng nào
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 mt-4">
                <div className="text-sm text-gray-600">
                    Hiển thị {order.length} đơn hàng
                </div>
                <div className="flex items-center space-x-2">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={(page) => {
                            if (page === pagination.currentPage) return;

                            setPagination(prev => ({
                                ...prev,
                                currentPage: page
                            }));
                        }}
                    />


                </div>
            </div>
        </div>
    );
}