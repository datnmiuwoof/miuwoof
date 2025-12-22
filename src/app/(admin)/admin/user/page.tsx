"use client"

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Filter, ChevronDown, Plus, Edit, Trash2, Mail, Phone, Calendar } from 'lucide-react';
import Pagination from '@/components/admin/Pagination';

const UserManagement = () => {

    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [user, setUser] = useState<any>([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
    });

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        setPagination(prev => ({
            ...prev,
            currentPage: 1
        }));
    }, [statusFilter]);

    useEffect(() => {
        fetchData(pagination.currentPage);
    }, [pagination.currentPage, statusFilter]);

    const fetchData = async (page: number) => {
        try {
            const result = await fetch(
                `http://localhost:3000/api/users?page=${page}&status=${statusFilter}`,
                { credentials: "include" }
            );

            const res = await result.json();

            setUser(res.data);

            setPagination({
                currentPage: res.page,
                totalPages: res.totalPages
            });

        } catch (error) {
            console.log(error);
        }
    };


    // const statusConfig = {
    //     active: { label: 'Hoạt động', color: 'bg-green-100 text-green-800' },
    //     inactive: { label: 'Không hoạt động', color: 'bg-red-100 text-red-800' }
    // };

    const roleConfig = {
        admin: { label: 'Quản trị viên', color: '!bg-purple-100 !text-purple-800' },
        manager: { label: 'Quản lý', color: '!bg-blue-100 !text-blue-800' },
        user: { label: 'Người dùng', color: '!bg-gray-100 !text-gray-800' }
    };

    const formatDate = (dateString: Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleLocked = async (id: any) => {
        try {
            const result = await fetch(`http://localhost:3000/api/users/block/${id}`, {
                method: "PUT",
                credentials: "include",
            });

            if (result.ok) {
                alert("chặn được user thành công")
                fetchData(pagination.currentPage);
            }
        } catch (error) {
            alert(error)
        }
    }


    return (
        <div className="main p-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="space-y-4">
                    {/* Search and filters row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search box */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm người dùng..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                            />
                        </div>

                        {/* Role filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                            >
                                <option value="all">Tất cả vai trò</option>
                                <option value="admin">Quản trị viên</option>
                                <option value="manager">Quản lý</option>
                                <option value="user">Người dùng</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        </div>


                    </div>

                    {/* Action buttons row */}
                    <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                        {/* Status filter */}
                        {/* <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                            >
                                <option value="all">Tất cả trạng thái</option>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Không hoạt động</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        </div> */}
                        {/* <button className="flex items-center justify-center gap-2 rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4" />
                            Quản lý quyền
                        </button> */}
                        <button className="rounded px-4 py-2 bg-red-600 text-white hover:bg-red-400 transition-colors"
                            onClick={() => router.push("/admin/user/is_locket")}
                        >
                            Danh sách chặn
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="">
                <div className="border-b border-gray-200 mb-4">
                    <h2 className="text-m font-semibold text-gray-800 mb-2">Danh sách người dùng</h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tên người dùng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thông tin liên hệ
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Vai trò
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th> */}
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Ngày tạo
                            </th>
                            {/* <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Đăng nhập gần nhất
                            </th> */}
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {user.map((u: any) => (
                            <tr
                                key={u.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* User Name */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="font-semibold text-gray-900">{u.name}</div>
                                    </div>
                                </td>

                                {/* Contact Info */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            {u.email}
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Phone className="w-4 h-4 text-gray-400" />
                                            {u?.Addresses?.[0]?.phone || u?.phone_number}
                                        </div>
                                    </div>
                                </td>

                                {/* Role */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${roleConfig[u.role]?.color || 'bg-gray-100 text-gray-800'}`}>
                                        {(roleConfig[u.role])?.label || u.role}
                                    </span>
                                </td>

                                {/* Status */}
                                {/* <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[user.is_active]?.color || 'bg-gray-100 text-gray-800'}`}>
                                        {statusConfig[user.is_active]?.label || user.is_active}
                                    </span>
                                </td> */}

                                {/* Created Date */}
                                <td className="px-6 py-4 text-gray-700 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-400" />
                                        {formatDate(u.created_at)}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/admin/user/${u.id}`}
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                                        >
                                            <Edit className="w-4 h-4" />
                                            Xem
                                        </Link>
                                        <button className="flex items-center gap-1 text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                                            onClick={() => handleLocked(u.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Chặn
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty state */}
                {user.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không tìm thấy người dùng nào
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between bg-white rounded-lg shadow p-4 mt-4">
                <div className="text-sm text-gray-600">
                    Hiển thị {user.length} đơn hàng
                </div>
                <div className="flex items-center space-x-2">
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={(newPage) => {
                            if (newPage < 1 || newPage > pagination.totalPages) return;

                            setPagination(prev => ({
                                ...prev,
                                currentPage: newPage
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserManagement;