"use client";
import { useEffect, useState } from "react";
import { Search, Package } from "lucide-react";
import { useSearchParams } from "next/navigation";


const statusConfig = {
    all: { label: "Tất cả", color: "bg-gray-100 text-gray-700", count: 0 },
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700", count: 0 },
    confirmed: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700", count: 0 },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700", count: 0 },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700", count: 0 },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700", count: 0 },
    refund: { label: "hoàn hàng", color: "bg-red-100 text-yellow-500", count: 0 },
};

export default function OrdersPage() {
    const [page, setPage] = useState(1);
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
    const [totalPage, setTotalPage] = useState(1);



    useEffect(() => {
        fetchData()
    }, [page, statusFilter]);

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/admin/orders?page=${page}&status=${statusFilter}`, { credentials: "include" });
            const json = await res.json();

            console.log("json", json)
            setOrder(json.data);
            setOrder(json.data || []);
            setTotal(json.total || 0);
            setStatusCount(json.statusCounts)
            setTotalPage(json.totalPages || 1);
        } catch (error) {
            console.log(error);
        }
    }


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

                        <a href="/admin/orders/export" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                            Xuất Excel
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
                                Ngày đặt
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
                                        <div className="font-medium text-gray-900">{o.Address?.name}</div>
                                        <div className="text-xs text-gray-500">{o.Address?.email}</div>
                                        <div className="text-xs text-gray-500">{o.Address?.phone}</div>
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

                                {/* NGÀY ĐẶT */}
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    {o.createdAt}
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
                                    >
                                        Hủy
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
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        Trước
                    </button>
                    <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium">
                        Trang {page}
                    </span>
                    <button
                        disabled={page >= totalPage}
                        onClick={() => setPage(page + 1)}
                        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                    >
                        Sau
                    </button>
                </div>
            </div>
        </div>
    );
}