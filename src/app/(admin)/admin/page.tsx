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
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>({});

    // Ngày mặc định
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterType, setFilterType] = useState("today");

    useEffect(() => {
        fetchData();
        setLoading(false);
    }, []);

    const fetchData = async () => {
        try {
            const resOrders = await fetch("http://localhost:3000/AdminDashboard", { credentials: "include", });
            const res = await resOrders.json();
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const handleQuickFilter = (type: string) => {
        setFilterType(type);
        const today = new Date();
        let start = new Date(today);
        let end = new Date(today);

        switch (type) {
            case 'today':
                break;
            case 'yesterday':
                start.setDate(today.getDate() - 1);
                end.setDate(today.getDate() - 1);
                break;
            case 'last7days':
                start.setDate(today.getDate() - 7);
                break;
            case 'last30days':
                start.setDate(today.getDate() - 30);
                break;
            case 'thisMonth':
                start = new Date(today.getFullYear(), today.getMonth(), 1);
                break;
            case 'lastMonth':
                start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                end = new Date(today.getFullYear(), today.getMonth(), 0);
                break;
            default:
                break;
        }
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    };

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
    };

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
        <div className="p-4 lg:p-6 bg-gray-50/50 min-h-screen space-y-6 font-sans">

            {/* 1. COMPACT HEADER BAR (Tất cả nằm trên 1 hàng) */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">

                {/* Left: Title & Date */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Tổng quan</h1>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Right: Actions Toolbar (Gom nhóm) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 bg-white p-1.5 rounded-xl border border-gray-200 shadow-sm w-fit">

                    {/* Dropdown Select */}
                    <select
                        value={filterType}
                        onChange={(e) => handleQuickFilter(e.target.value)}
                        className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block px-3 py-1.5 hover:bg-gray-100 transition cursor-pointer font-medium"
                    >
                        <option value="today">Hôm nay</option>
                        <option value="yesterday">Hôm qua</option>
                        <option value="last7days">7 ngày qua</option>
                        <option value="last30days">30 ngày qua</option>
                        <option value="thisMonth">Tháng này</option>
                        <option value="lastMonth">Tháng trước</option>
                    </select>

                    {/* Divider vertical */}
                    <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

                    {/* Date Picker Range */}
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => { setStartDate(e.target.value); setFilterType('custom'); }}
                            className="text-xs sm:text-sm border-none bg-transparent focus:ring-0 text-gray-600 font-medium p-0 w-24 sm:w-auto"
                        />
                        <ArrowRight className="w-3 h-3 text-gray-400" />
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => { setEndDate(e.target.value); setFilterType('custom'); }}
                            className="text-xs sm:text-sm border-none bg-transparent focus:ring-0 text-gray-600 font-medium p-0 w-24 sm:w-auto"
                        />
                    </div>

                    {/* Divider vertical */}
                    <div className="hidden sm:block w-px h-6 bg-gray-200"></div>

                    {/* Live Badge (Icon only on mobile to save space) */}
                    <div className="flex items-center gap-2 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-bold">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="hidden sm:inline">Live</span>
                    </div>
                </div>
            </div>

            {/* 2. STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Doanh thu */}
                <div className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-indigo-50 rounded-lg">
                            <DollarSign className="w-5 h-5 text-indigo-600" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            +12.5%
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Doanh thu</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">
                            {data.totalRevenue ? formatCurrency(data.totalRevenue) : '0 ₫'}
                        </h3>
                    </div>
                </div>

                {/* Đơn hàng */}
                <Link href="/admin/order" className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:border-blue-200 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <ShoppingBag className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            +5.2%
                        </span>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tổng đơn</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{data.totalOrders || 0}</h3>
                    </div>
                </Link>

                {/* Khách hàng */}
                <Link href="/admin/user" className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:border-purple-200 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Users className="w-5 h-5 text-purple-600" />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Thành viên</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{data.totalUsers || 0}</h3>
                    </div>
                </Link>

                {/* Sản phẩm */}
                <Link href="/admin/products" className="bg-white p-5 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-gray-100 hover:border-orange-200 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-orange-50 rounded-lg">
                            <Package className="w-5 h-5 text-orange-600" />
                        </div>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Sản phẩm</p>
                        <h3 className="text-xl font-bold text-gray-900 mt-1">{data.totalProducts || 0}</h3>
                    </div>
                </Link>
            </div>

            {/* 3. MAIN CONTENT */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">

                {/* 3.1 Recent Orders Table */}
                <div className="xl:col-span-2 flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-600" />
                            <h3 className="font-bold text-gray-800 text-sm">Giao dịch gần đây</h3>
                        </div>
                        <Link href="/admin/order" className="text-xs font-semibold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition">
                            Xem tất cả &rarr;
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                                    <th className="px-6 py-3 font-semibold">Mã ĐH</th>
                                    <th className="px-6 py-3 font-semibold">Khách hàng</th>
                                    <th className="px-6 py-3 font-semibold">Ngày đặt</th>
                                    <th className="px-6 py-3 font-semibold">Tổng tiền</th>
                                    <th className="px-6 py-3 font-semibold text-center">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data?.latestOrders && data.latestOrders.length > 0 ? (
                                    data.latestOrders.map((order: any) => (
                                        <tr key={order.id} className="hover:bg-gray-50/80 transition-colors duration-150 text-sm">
                                            <td className="px-6 py-3 font-medium text-indigo-600">#{order.id}</td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600">
                                                        {(order.Address?.name || order.User?.name || "K").charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-gray-900 font-medium truncate max-w-[120px]">
                                                        {order.Address?.name || order.User?.name || "Khách vãng lai"}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3 text-gray-500">
                                                {order.order_date ? new Date(order.order_date).toLocaleDateString('vi-VN') : '-'}
                                            </td>
                                            <td className="px-6 py-3 font-bold text-gray-700">
                                                {formatCurrency(Number(order.total_amount))}
                                            </td>
                                            <td className="px-6 py-3 text-center">
                                                {renderStatusBadge(order.order_status)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400 text-sm">
                                            Chưa có dữ liệu
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3.2 Action Panel */}
                <div className="flex flex-col gap-6">
                    <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-lg p-5 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
                        <h3 className="text-base font-bold mb-1 flex items-center gap-2 relative z-10">
                            <TrendingUp className="w-4 h-4" /> Cần xử lý ngay
                        </h3>
                        <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20 flex items-center justify-between mb-3">
                            <div>
                                <p className="font-bold text-xl">{data.orderPending || 0}</p>
                                <p className="text-[10px] text-indigo-100 uppercase">Đơn chờ duyệt</p>
                            </div>
                            <Link href="/admin/order" className="p-2 bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                                <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                        <Link
                            href="/admin/products"
                            className="block w-full py-2.5 bg-white text-indigo-700 text-sm font-bold text-center rounded-xl hover:bg-indigo-50 transition"
                        >
                            + Thêm sản phẩm
                        </Link>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                        <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-gray-400" /> Trạng thái hệ thống
                        </h3>
                        <div className="space-y-3">
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-xs text-gray-600">Database: <span className="font-medium text-gray-900">Connected</span></span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-xs text-gray-600">API Server: <span className="font-medium text-gray-900">Running (Port 3000)</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}