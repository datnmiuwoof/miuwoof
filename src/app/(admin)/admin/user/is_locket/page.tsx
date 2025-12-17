"use client";
import { useEffect, useState } from "react";
import {
    Search,
    Ban,
    User,
    Calendar,
    Clock,
    AlertCircle,
    CheckCircle,
    Filter,
    ChevronDown,
    Shield,
    FileText,
    ArrowLeft
} from "lucide-react";
import dvhcvn from "@/app/checkout/address/dvhcvn.json";

export default function BannedUsersPage() {
    const [userData, setUserData] = useState([])
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showUnbanModal, setShowUnbanModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("all");
    const [totalPage, setTotalPage] = useState(1);


    useEffect(() => {
        fetchBannedUsers();
    }, [status, page]);

    const fetchBannedUsers = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/is_locked?page=${page}&status=${status}`, {
                credentials: "include"
            });
            const json = await res.json();
            setUserData(json.data);
            setTotalPage(json.totalPages)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleUnban = async (userId: number) => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/${userId}/unban`, {
                method: 'PUT',
                credentials: "include"
            });
            if (res.ok) {
                fetchBannedUsers();
            }

            setShowUnbanModal(false);
            setSelectedUser(null);
        } catch (error) {
            console.log(error);
        }
    };

    function getFullAddress(address: any, dvhcvn: any) {
        const province = dvhcvn.data.find((p: any) => p.level1_id == address.city);
        const district = province?.level2s.find((d: any) => d.level2_id == address.district);
        const ward = district?.level3s.find((w: any) => w.level3_id == address.ward);

        return {
            line: address.address_line,
            ward: ward?.name ?? "",
            district: district?.name ?? "",
            province: province?.name ?? "",
            full: `${address.address_line}`,
        };
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-gray-500">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Quay lại
                </button>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-100 p-3 rounded-full">
                            <Ban className="w-6 h-6 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Người dùng bị chặn</h1>
                            <p className="text-gray-600 mt-1">Quản lý tài khoản bị khóa</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Tổng bị chặn</p>
                            <h3 className="text-2xl font-bold text-gray-800">{userData.length}</h3>
                        </div>
                        <div className="bg-red-100 p-3 rounded-full">
                            <Ban className="w-6 h-6 text-red-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Vĩnh viễn</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {/* {bannedUsers.filter((u: any) => u.duration === "permanent").length} */}4
                            </h3>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-full">
                            <AlertCircle className="w-6 h-6 text-gray-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Tạm thời</p>
                            <h3 className="text-2xl font-bold text-gray-800">
                                {/* {bannedUsers.filter((u: any) => u.duration !== "permanent").length} */}2
                            </h3>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-full">
                            <Clock className="w-6 h-6 text-yellow-600" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm tên, email, số điện thoại..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Reason Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="all">Tất cả</option>
                            <option value="forever">xóa vĩnh viễn</option>
                            <option value="temporary">xóa tạm thời</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Người dùng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Chi tiết
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thời gian chặn
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                địa chỉ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {userData.map((user: any) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                {/* User Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{user.name}</p>
                                            <p className="text-xs text-gray-500">{user.email}</p>
                                            {user?.Addresses ? (<p className="text-xs text-gray-500">{user?.Addresses?.[0]?.phone}</p>) : ("...")}

                                        </div>
                                    </div>
                                </td>

                                {/* Banned At */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {new Date(user.updatedAt).toLocaleDateString("vi-VN")}
                                    </div>
                                </td>


                                {/* Banned By */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Shield className="w-4 h-4 text-gray-400" />
                                        {user.is_destroyed !== true ? ("Khóa tạm thời") : ("Khóa vĩnh viễn")}
                                    </div>
                                </td>

                                {/* Duration */}
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">

                                        {user?.Addresses && user?.Addresses.map((a: any) => {
                                            const formatted = getFullAddress(a, dvhcvn);
                                            return (
                                                <p key={a.id}>{formatted.full}</p>
                                            );
                                        })}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setSelectedUser(user);
                                                setShowUnbanModal(true);
                                            }}
                                            className="text-green-600 hover:text-green-800 font-medium text-sm"
                                        >
                                            Mở khóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {userData.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không có người dùng bị chặn
                    </div>
                )}
            </div>

            {/* Unban Confirmation Modal */}
            {showUnbanModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800">Xác nhận mở khóa</h3>
                        </div>

                        <p className="text-gray-700 mb-4">
                            Bạn có chắc chắn muốn mở khóa tài khoản của <strong>{selectedUser.name}</strong>?
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => {
                                    setShowUnbanModal(false);
                                    setSelectedUser(null);
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={() => handleUnban(selectedUser.id)}
                                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Mở khóa
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 mt-4">
                <div className="text-sm text-gray-600">
                    {/* Hiển thị {user.length} đơn hàng */}
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