"use client";
import { useEffect, useState } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";

// Mock data
const orders = [
    {
        id: 1,
        orderCode: "ORD-001",
        customer: {
            name: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            phone: "0901234567",
            address: "123 Nguyễn Huệ, Q.1, TP.HCM"
        },
        products: [
            { name: "Áo thun nam basic", quantity: 2, price: 250000 },
            { name: "Quần jean slim fit", quantity: 1, price: 350000 }
        ],
        totalQuantity: 3,
        totalAmount: 850000,
        status: "completed",
        paymentMethod: "COD",
        createdAt: "2024-01-15 14:30"
    },
    {
        id: 2,
        orderCode: "ORD-002",
        customer: {
            name: "Trần Thị B",
            email: "tranthib@email.com",
            phone: "0912345678",
            address: "456 Lê Lợi, Q.3, TP.HCM"
        },
        products: [
            { name: "Váy đầm hoa nhí", quantity: 1, price: 450000 }
        ],
        totalQuantity: 1,
        totalAmount: 450000,
        status: "pending",
        paymentMethod: "Banking",
        createdAt: "2024-01-15 10:20"
    },
    {
        id: 3,
        orderCode: "ORD-003",
        customer: {
            name: "Lê Văn C",
            email: "levanc@email.com",
            phone: "0923456789",
            address: "789 Võ Văn Tần, Q.10, TP.HCM"
        },
        products: [
            { name: "Giày sneaker trắng", quantity: 1, price: 900000 },
            { name: "Tất cotton", quantity: 3, price: 100000 }
        ],
        totalQuantity: 4,
        totalAmount: 1200000,
        status: "shipping",
        paymentMethod: "Momo",
        createdAt: "2024-01-14 16:45"
    },
    {
        id: 4,
        orderCode: "ORD-004",
        customer: {
            name: "Phạm Thị D",
            email: "phamthid@email.com",
            phone: "0934567890",
            address: "321 Trần Hưng Đạo, Q.5, TP.HCM"
        },
        products: [
            { name: "Áo khoác hoodie", quantity: 1, price: 650000 }
        ],
        totalQuantity: 1,
        totalAmount: 650000,
        status: "cancelled",
        paymentMethod: "COD",
        createdAt: "2024-01-14 09:15"
    },
    {
        id: 5,
        orderCode: "ORD-005",
        customer: {
            name: "Hoàng Văn E",
            email: "hoangvane@email.com",
            phone: "0945678901",
            address: "654 Hai Bà Trưng, Q.Tân Bình, TP.HCM"
        },
        products: [
            { name: "Balo laptop", quantity: 1, price: 580000 },
            { name: "Túi đeo chéo", quantity: 1, price: 400000 }
        ],
        totalQuantity: 2,
        totalAmount: 980000,
        status: "processing",
        paymentMethod: "Banking",
        createdAt: "2024-01-13 11:30"
    },
];


const statusConfig = {
    pending: { label: "Chờ xử lý", color: "bg-yellow-100 text-yellow-700" },
    confirmed: { label: "Đang xử lý", color: "bg-blue-100 text-blue-700" },
    shipping: { label: "Đang giao", color: "bg-purple-100 text-purple-700" },
    completed: { label: "Hoàn thành", color: "bg-green-100 text-green-700" },
    cancelled: { label: "Đã hủy", color: "bg-red-100 text-red-700" },
    refund: { label: "Đã trả hàng", color: "bg-red-100 text-red-500" },
};

export default function OrdersPage() {
    const [page, setPage] = useState(1);
    const [order, setOrder] = useState<any>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    useEffect(() => {
        fetchData();
    }, [page])

    const fetchData = async () => {
        try {
            const res = await fetch(`http://localhost:3000/order`, { credentials: "include" });
            const json = await res.json();
            setOrder(json);
        } catch (error) {
            console.log(error);

        }
    }

    console.log(order);


    const filteredOrders = orders.filter(order => {
        const matchSearch = order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = !statusFilter || order.status === statusFilter;
        return matchSearch && matchStatus;
    });


    return (
        <div className="main p-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Ô tìm kiếm */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm đơn hàng, khách hàng..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Bộ lọc trạng thái */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="pending">Chờ xử lý</option>
                            <option value="processing">Đang xử lý</option>
                            <option value="shipping">Đang giao</option>
                            <option value="completed">Hoàn thành</option>
                            <option value="cancelled">Đã hủy</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    <div className="flex space-x-1 items-center justify-end">
                        <a href="/admin/orders/cancelled" className="text-center rounded-sm px-4 py-2 bg-blue-600 text-white">Đơn đã hủy</a>
                        <a href="/admin/orders/export" className="text-center rounded-sm px-4 py-2 bg-blue-600 text-white">Xuất Excel</a>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="border-b border-gray-200">
                    <h2 className="text-m font-semibold text-gray-800">Danh sách đơn hàng</h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mã đơn hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Khách hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Sản phẩm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tổng tiền
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thanh toán
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Ngày đặt
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {order.map((order: any) => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* MÃ ĐƠN HÀNG */}
                                <td className="px-6 py-4 text-blue-600 font-semibold text-sm">
                                    {order.id}
                                </td>

                                {/* KHÁCH HÀNG */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <div className="font-medium text-gray-900">{order.Address.name}</div>
                                        <div className="text-xs text-gray-500">{order.Address.email}</div>
                                        <div className="text-xs text-gray-500">{order.Address.phone}</div>
                                    </div>
                                </td>

                                {/* SẢN PHẨM */}
                                <td className="relative group cursor-pointer px-6 py-4">
                                    <span className="text-sm text-gray-700">
                                        {order.OrderDetails.reduce((Sum: any, item: any) => item.quantity + Sum, 0)} sản phẩm
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
                                                {order.OrderDetails.map((product: any, i: number) => (
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
                                    {Number(order.total_amount).toLocaleString("vi-VN")} VND
                                </td>

                                {/* THANH TOÁN */}
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    {order.payment_status}
                                </td>

                                {/* TRẠNG THÁI */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[order.order_status as keyof typeof statusConfig].color}`}>
                                        {statusConfig[order.order_status as keyof typeof statusConfig].label}
                                    </span>
                                </td>

                                {/* NGÀY ĐẶT */}
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    {order.createdAt}
                                </td>

                                {/* THAO TÁC */}
                                <td className="px-6 py-4 text-sm">
                                    <a
                                        href={`/admin/order/${order.id}`}
                                        className="text-blue-600 hover:text-blue-800 px-2"
                                    >
                                        Xem
                                    </a>
                                    <button
                                        className="text-red-600 hover:text-red-800 px-2"
                                    >
                                        Hủy
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-[10px]">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="border px-3 py-1 rounded disabled:opacity-50"
                >
                    trước
                </button>
                <span className="mx-2">trang {page}</span>
                <button
                    disabled={page >= Math.ceil(filteredOrders.length / 10)}
                    onClick={() => setPage(page + 1)}
                    className="border px-3 py-1 rounded disabled:opacity-50"
                >
                    sau
                </button>
            </div>
        </div>
    );
}