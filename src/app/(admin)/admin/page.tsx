"use client";

import { useEffect, useState } from "react";
import {
    DollarSign,
    ShoppingBag,
    Users,
    Package,
    TrendingUp,
    Clock,
    AlertCircle,
    Calendar,
    ArrowUpRight,
    Search,
    Filter
} from "lucide-react";
import Link from "next/link";
import { formatAddress } from "@/components/layout/Address";
import dvhcvn from "@/app/checkout/address/dvhcvn.json";

interface IOrder {
    id: number;
    total_amount: number;
    order_status: string;
    created_at?: string;
    order_date?: string;
    Address?: {
        name: string;
        phone: string;
        address_line: string;
        city: string;
    } | null;
    User?: {
        name: string;
        email: string;
    };
}

interface IStats {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    pendingOrders: number;
}

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});
    const [address, setAddress] = useState({});
    const [startDate, setStartDate] = useState('2024-12-01');
    const [endDate, setEndDate] = useState('2024-12-13');

    console.log(data)

    useEffect(() => {
        fetchData()
        setLoading(false)
    }, [])


    const fetchData = async () => {
        try {
            // 1. API Đơn hàng
            const resOrders = await fetch("http://localhost:3000/AdminDashboard", { credentials: "include", });
            const res = await resOrders.json();

            setData(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Hàm render badge trạng thái đẹp hơn
    const renderStatusBadge = (status: string) => {
        const s = status?.toLowerCase() || '';
        let styles = "bg-gray-100 text-gray-600 border-gray-200";
        let label = status;
        let dotColor = "bg-gray-400";

        if (s === 'pending' || s === 'chờ xử lý') {
            styles = "bg-amber-50 text-amber-700 border-amber-200";
            label = "Chờ xử lý";
            dotColor = "bg-amber-500";
        }
        else if (s === 'confirmed' || s === 'đã xác nhận') {
            styles = "bg-blue-50 text-blue-700 border-blue-200";
            label = "Đã xác nhận";
            dotColor = "bg-blue-500";
        }
        else if (s === 'shipping' || s === 'đang giao') {
            styles = "bg-indigo-50 text-indigo-700 border-indigo-200";
            label = "Đang giao";
            dotColor = "bg-indigo-500";
        }
        else if (s === 'completed' || s === 'hoàn thành') {
            styles = "bg-emerald-50 text-emerald-700 border-emerald-200";
            label = "Hoàn thành";
            dotColor = "bg-emerald-500";
        }
        else if (s === 'cancelled' || s === 'đã hủy') {
            styles = "bg-red-50 text-red-700 border-red-200";
            label = "Đã hủy";
            dotColor = "bg-red-500";
        }

        return (
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`}></span>
                {label}
            </span>
        );
    }

    if (loading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-gray-50/50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 text-sm font-medium animate-pulse">Đang tải dữ liệu...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 bg-gray-50/50 min-h-screen space-y-8 font-sans">

            {/* 1. TOP HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tổng quan</h1>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition">
                        <Filter className="w-4 h-4" /> Lọc dữ liệu
                    </button>
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-sm font-semibold shadow-sm">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        Cập nhật live
                    </div>
                </div>
            </div>

            {/* Quick Select */}
            <div>
                <label className="block font-semibold text-gray-700 mb-3">Chọn nhanh:</label>
                <div className="grid grid-cols-2 gap-2">
                    <button
                        onClick={() => {
                            const today = new Date();
                            setStartDate(today.toISOString().split('T')[0]);
                            setEndDate(today.toISOString().split('T')[0]);
                        }}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg transition"
                    >
                        Hôm nay
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const yesterday = new Date(today);
                            yesterday.setDate(yesterday.getDate() - 1);
                            setStartDate(yesterday.toISOString().split('T')[0]);
                            setEndDate(yesterday.toISOString().split('T')[0]);
                        }}
                        className="bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium py-2 px-4 rounded-lg transition"
                    >
                        Hôm qua
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const weekAgo = new Date(today);
                            weekAgo.setDate(weekAgo.getDate() - 7);
                            setStartDate(weekAgo.toISOString().split('T')[0]);
                            setEndDate(today.toISOString().split('T')[0]);
                        }}
                        className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-lg transition"
                    >
                        7 ngày qua
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const monthAgo = new Date(today);
                            monthAgo.setDate(monthAgo.getDate() - 30);
                            setStartDate(monthAgo.toISOString().split('T')[0]);
                            setEndDate(today.toISOString().split('T')[0]);
                        }}
                        className="bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-lg transition"
                    >
                        30 ngày qua
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                            setStartDate(firstDay.toISOString().split('T')[0]);
                            setEndDate(today.toISOString().split('T')[0]);
                        }}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded-lg transition"
                    >
                        Tháng này
                    </button>
                    <button
                        onClick={() => {
                            const today = new Date();
                            const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                            const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
                            setStartDate(firstDay.toISOString().split('T')[0]);
                            setEndDate(lastDay.toISOString().split('T')[0]);
                        }}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded-lg transition"
                    >
                        Tháng trước
                    </button>
                </div>
            </div>

            <div>
                <label className="block font-semibold text-gray-700 mb-3">Hoặc chọn khoảng thời gian:</label>
                <div className="space-y-3">
                    <div className="flex items-center gap-2">
                        <Calendar className="text-blue-600" size={20} />
                        <label className="font-medium text-gray-600 w-20">Từ ngày:</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="text-blue-600" size={20} />
                        <label className="font-medium text-gray-600 w-20">Đến ngày:</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>


            {/* 2. STATS GRID (KPIs) */}
            < div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >

                {/* Doanh thu */}
                < div className="group bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-indigo-50 rounded-xl group-hover:bg-indigo-600 transition-colors duration-300">
                            <DollarSign className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            +12.5% <ArrowUpRight className="w-3 h-3 ml-0.5" />
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Tổng doanh thu</p>
                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {formatCurrency(data.totalRevenue)}
                        </h3>
                    </div>
                </div >

                {/* Đơn hàng */}
                < div className="group bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" >
                    <Link href="/admin/order">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-600 transition-colors duration-300">
                                <ShoppingBag className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                            <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                                +5.2% <ArrowUpRight className="w-3 h-3 ml-0.5" />
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Tổng đơn hàng</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.totalOrders}</h3>
                        </div>
                    </Link>
                </div >

                {/* Khách hàng */}
                < div className="group bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" >
                    <Link href="/admin/user">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-600 transition-colors duration-300">
                                <Users className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Thành viên</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.totalUsers}</h3>
                        </div>
                    </Link>
                </div >

                {/* Sản phẩm */}
                < div className="group bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300" >
                    <Link href="/admin/products">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-orange-50 rounded-xl group-hover:bg-orange-600 transition-colors duration-300">
                                <Package className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Sản phẩm</p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.totalProducts}</h3>
                        </div>
                    </Link>
                </div >
            </div >

            {/* 3. MAIN CONTENT */}
            < div className="grid grid-cols-1 xl:grid-cols-3 gap-8" >

                {/* 3.1 Recent Orders Table (Chiếm 2/3) */}
                < div className="xl:col-span-2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden" >
                    {/* Card Header */}
                    < div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/30" >
                        <div className="flex items-center gap-2">
                            <div className="bg-indigo-100 p-1.5 rounded-lg">
                                <Clock className="w-4 h-4 text-indigo-700" />
                            </div>
                            <h3 className="font-bold text-gray-800">Giao dịch gần đây</h3>
                        </div>
                        <Link href="/admin/orders" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition">
                            Xem tất cả &rarr;
                        </Link>
                    </div >

                    {/* Table */}
                    < div className="overflow-x-auto" >
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="px-6 py-4 font-semibold">Mã ĐH</th>
                                    <th className="px-6 py-4 font-semibold">Khách hàng</th>
                                    <th className="px-6 py-4 font-semibold">Ngày đặt</th>
                                    <th className="px-6 py-4 font-semibold">Tổng tiền</th>
                                    <th className="px-6 py-4 font-semibold text-center">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data?.latestOrders ? (
                                    data?.latestOrders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50/80 transition-colors duration-150 group cursor-pointer">
                                            <td className="px-6 py-4 font-medium text-indigo-600 group-hover:text-indigo-700">
                                                #{order.id}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                                        {(order.Address?.name || order.User?.name || "K").charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{order.Address?.name || order.User?.name || "Khách vãng lai"}</p>
                                                        <p>{order.Address.address_line}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {order.order_date ? new Date(order.order_date).toLocaleDateString('vi-VN') : '-'}
                                            </td>
                                            <td className="px-6 py-4 font-bold text-gray-700">
                                                {formatCurrency(Number(order.total_amount))}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {renderStatusBadge(order.order_status)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-16 text-center text-gray-400">
                                            <div className="flex flex-col items-center">
                                                <ShoppingBag className="w-12 h-12 mb-2 opacity-20" />
                                                <p>Chưa có dữ liệu đơn hàng</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div >
                </div >

                {/* 3.2 Action Panel (Chiếm 1/3) */}
                < div className="flex flex-col gap-6" >

                    {/* Widget: Việc cần làm */}
                    < div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-lg shadow-indigo-200 text-white p-6 relative overflow-hidden" >
                        {/* Background Decoration */}
                        < div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl" ></div >
                        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>

                        <h3 className="text-lg font-bold mb-1 flex items-center gap-2 relative z-10">
                            <TrendingUp className="w-5 h-5" /> Cần xử lý ngay
                        </h3>
                        <p className="text-indigo-100 text-sm mb-6 relative z-10 opacity-80">
                            Các tác vụ quan trọng cần sự chú ý của bạn.
                        </p>

                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex items-center justify-between mb-4">
                            <div>
                                <p className="font-semibold text-lg">{data.orderPending}</p>
                                <p className="text-xs text-indigo-100">Đơn hàng chờ duyệt</p>
                            </div>
                            <Link href="/admin/order" className="p-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition shadow-sm">
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <Link
                            href="/admin/products/addProduct"
                            className="flex items-center justify-center w-full py-3 bg-white text-indigo-700 font-bold rounded-xl shadow-md hover:shadow-lg hover:bg-indigo-50 transition-all transform active:scale-95"
                        >
                            + Thêm sản phẩm mới
                        </Link>
                    </div >

                    {/* Widget: Thông báo hệ thống */}
                    < div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6" >
                        <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-gray-400" /> Hệ thống
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-3 items-start">
                                <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">Database Connected</p>
                                    <p className="text-xs text-gray-400">MySQL Localhost:3306</p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="w-2 h-2 mt-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-700 font-medium">Server Status</p>
                                    <p className="text-xs text-gray-400">Node.js Port 3000 is running</p>
                                </div>
                            </div>
                        </div>
                    </div >

                </div >
            </div >
        </div >
    );
}