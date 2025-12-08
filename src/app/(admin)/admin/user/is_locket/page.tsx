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

export default function BannedUsersPage() {
    const [bannedUsers, setBannedUsers] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [reasonFilter, setReasonFilter] = useState("");
    const [showUnbanModal, setShowUnbanModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any>(null);

    useEffect(() => {
        fetchBannedUsers();
    }, []);

    const fetchBannedUsers = async () => {
        try {
            // const res = await fetch('http://localhost:3000/api/admin/users/banned', { 
            //     credentials: "include" 
            // });
            // const json = await res.json();
            // setBannedUsers(json);

            // Mock data
            setBannedUsers(mockBannedUsers);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const mockBannedUsers = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "nguyenvana@email.com",
            phone: "0901234567",
            bannedAt: "2024-12-01 10:30",
            bannedBy: "Admin Nguyễn Văn B",
            reason: "spam",
            reasonDetail: "Spam tin nhắn quá nhiều lần",
            duration: "permanent",
            expiresAt: null,
            totalOrders: 5,
            totalSpent: 2500000
        },
        {
            id: 2,
            name: "Trần Thị C",
            email: "tranthic@email.com",
            phone: "0912345678",
            bannedAt: "2024-11-28 15:20",
            bannedBy: "Admin Lê Văn D",
            reason: "fraud",
            reasonDetail: "Thanh toán giả mạo, lừa đảo",
            duration: "permanent",
            expiresAt: null,
            totalOrders: 12,
            totalSpent: 5800000
        },
        {
            id: 3,
            name: "Lê Văn E",
            email: "levane@email.com",
            phone: "0923456789",
            bannedAt: "2024-11-25 09:45",
            bannedBy: "Admin Phạm Thị F",
            reason: "violation",
            reasonDetail: "Vi phạm điều khoản sử dụng nhiều lần",
            duration: "30days",
            expiresAt: "2024-12-25 09:45",
            totalOrders: 8,
            totalSpent: 3200000
        },
        {
            id: 4,
            name: "Phạm Thị G",
            email: "phamthig@email.com",
            phone: "0934567890",
            bannedAt: "2024-11-20 14:15",
            bannedBy: "Admin Hoàng Văn H",
            reason: "abuse",
            reasonDetail: "Lạm dụng chính sách đổi trả",
            duration: "7days",
            expiresAt: "2024-11-27 14:15",
            totalOrders: 15,
            totalSpent: 4500000
        },
        {
            id: 5,
            name: "Hoàng Văn I",
            email: "hoangvani@email.com",
            phone: "0945678901",
            bannedAt: "2024-11-15 11:30",
            bannedBy: "Admin Nguyễn Thị J",
            reason: "other",
            reasonDetail: "Hành vi xấu với nhân viên hỗ trợ",
            duration: "permanent",
            expiresAt: null,
            totalOrders: 3,
            totalSpent: 1200000
        }
    ];

    const reasonConfig: any = {
        spam: { label: "Spam", color: "bg-yellow-100 text-yellow-700" },
        fraud: { label: "Lừa đảo", color: "bg-red-100 text-red-700" },
        violation: { label: "Vi phạm điều khoản", color: "bg-orange-100 text-orange-700" },
        abuse: { label: "Lạm dụng", color: "bg-purple-100 text-purple-700" },
        other: { label: "Khác", color: "bg-gray-100 text-gray-700" }
    };

    const handleUnban = async (userId: number) => {
        try {
            // const res = await fetch(`http://localhost:3000/api/admin/users/${userId}/unban`, {
            //     method: 'POST',
            //     credentials: "include"
            // });
            // if (res.ok) {
            //     fetchBannedUsers();
            // }

            console.log("Unban user:", userId);
            setShowUnbanModal(false);
            setSelectedUser(null);
            // Refresh data
        } catch (error) {
            console.log(error);
        }
    };

    const getDurationText = (duration: string, expiresAt: string | null) => {
        if (duration === "permanent") {
            return "Vĩnh viễn";
        }
        if (expiresAt) {
            return `Đến ${expiresAt}`;
        }
        return duration;
    };

    const isExpired = (expiresAt: string | null) => {
        if (!expiresAt) return false;
        return new Date(expiresAt) < new Date();
    };

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
                            <h3 className="text-2xl font-bold text-gray-800">{bannedUsers.length}</h3>
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
                                {bannedUsers.filter((u: any) => u.duration === "permanent").length}
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
                                {bannedUsers.filter((u: any) => u.duration !== "permanent").length}
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
                            value={reasonFilter}
                            onChange={(e) => setReasonFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả</option>
                            <option value="spam">xóa vĩnh viễn</option>
                            <option value="fraud">xóa tạm thời</option>
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
                                Thời hạn
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {bannedUsers.map((user: any) => (
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
                                            <p className="text-xs text-gray-500">{user.phone}</p>
                                        </div>
                                    </div>
                                </td>

                                {/* Banned At */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {user.bannedAt}
                                    </div>
                                </td>

                                {/* Banned By */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Shield className="w-4 h-4 text-gray-400" />
                                        {user.bannedBy}
                                    </div>
                                </td>

                                {/* Duration */}
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                        {getDurationText(user.duration, user.expiresAt)}
                                        {isExpired(user.expiresAt) && (
                                            <span className="block text-xs text-green-600 mt-1">
                                                ✓ Đã hết hạn
                                            </span>
                                        )}
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

                {bannedUsers.length === 0 && (
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

                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                            <p className="text-sm text-gray-600 mb-1">Thông tin:</p>
                            <p className="text-sm"><strong>Email:</strong> {selectedUser.email}</p>
                            <p className="text-sm"><strong>Lý do chặn:</strong> {reasonConfig[selectedUser.reason].label}</p>
                            <p className="text-sm"><strong>Chi tiết:</strong> {selectedUser.reasonDetail}</p>
                        </div>

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
        </div>
    );
}