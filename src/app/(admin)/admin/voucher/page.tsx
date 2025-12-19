'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, ChevronDown, Plus, Edit, Trash2, Eye, Calendar, Copy, Percent, DollarSign, Users } from 'lucide-react';
import Pagination from "@/components/admin/Pagination";

const PromotionCodeManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [dataDiscount, setDataDiscount] = useState([]);
    const router = useRouter();
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    });
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        fetchVouchers(pagination.page);
    }, [pagination.page, statusFilter]);



    const fetchVouchers = async (page = 1) => {
        try {
            const res = await fetch(
                `http://localhost:3000/api/voucher?page=${page}&limit=${pagination.limit}&status=${statusFilter}`,
                { credentials: 'include' }
            );

            const result = await res.json();

            setDataDiscount(result.data);
            setPagination(prev => ({
                ...prev,
                ...result.pagination
            }));
        } catch (error) {
            console.error(error);
        }
    };




    const handlerDelete = async (id: any) => {
        try {
            const result = await fetch(`http://localhost:3000/api/voucher/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (result.ok) {
                alert('xóa thành công');
                fetchVouchers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const statusConfig = {
        true: { label: 'hoạt động', color: 'bg-green-100 text-green-800' },
        false: { label: 'Đã tắt', color: 'bg-gray-100 text-gray-800' }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    console.log(dataDiscount)

    return (
        <div className="main p-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Search box */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm mã giảm giá..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Status filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="1">Đang hoạt động</option>
                            <option value="0">Đã tắt</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-end">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            onClick={() => router.push("/admin/voucher/addVoucher")}
                        >
                            <Plus className="w-4 h-4" />
                            Tạo mã giảm giá
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="">
                <div className="border-b border-gray-200 mb-4">
                    <h2 className="text-m font-semibold text-gray-800 mb-2">
                        Danh sách mã giảm giá ({dataDiscount.length})
                    </h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Mã giảm giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Giảm giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Điều kiện
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Lượt sử dụng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thời gian áp dụng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {dataDiscount.map((code) => {
                            // const usagePercent = getUsagePercentage(code.used_quantity);


                            return (
                                <tr
                                    key={code.id}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    {/* Code & Title */}
                                    <td className="px-6 py-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="font-bold text-blue-600 text-lg">{code.discount_name}</span>
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(code.code);
                                                        alert(`Đã sao chép mã: ${code.code}`);
                                                    }}
                                                    className="text-gray-400 hover:text-blue-600"
                                                    title="Sao chép mã"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="text-sm text-gray-600">{code.description}</div>
                                        </div>
                                    </td>

                                    {/* Discount Value */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {code.discount_type === 0 ? (
                                                <>
                                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                                        <Percent className="w-4 h-4 text-orange-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-orange-600">
                                                            {code.discount_value}%
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Percent className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-green-600">
                                                            {code.discount_value}%
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td>

                                    {/* Minimum Order Value / Product Discount */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm">
                                            {code.discount_type === 0 ? (
                                                <>
                                                    <div className="text-gray-600">Đơn tối thiểu:</div>
                                                    <div className="font-semibold text-gray-900">
                                                        {formatCurrency(code.min_order_value)}đ
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="text-gray-600">Loại:</div>
                                                    <div className="font-semibold text-blue-600">
                                                        Giảm giá sản phẩm
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </td>

                                    {/* Usage Stats */}
                                    <td className="px-6 py-4">
                                        {code.discount_type === 0 ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-4 h-4 text-gray-400" />
                                                    <span className="text-sm font-medium">
                                                        còn {code.used_quantity}
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-green-600 font-medium">∞</span>
                                                    <span>Không giới hạn</span>
                                                </div>
                                            </div>
                                        )}
                                    </td>

                                    {/* Date Range */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-700">
                                            <div className="flex items-center gap-1 mb-1">
                                                <Calendar className="w-3 h-3 text-green-500" />
                                                <span className="text-xs text-gray-500">Từ:</span>
                                                {formatDate(code.start_date)}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-red-500" />
                                                <span className="text-xs text-gray-500">Đến:</span>
                                                {formatDate(code.end_date)}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[code.is_active]?.color || 'bg-gray-100 text-gray-800'}`}>
                                            {statusConfig[code.is_active]?.label || 'Không xác định'}
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <button className="flex items-center gap-1 text-green-600 hover:text-green-800 px-2 py-1 rounded hover:bg-green-50"
                                                onClick={() => router.push(`/admin/voucher/${code.id}`)}
                                            >
                                                <Eye className="w-4 h-4" />
                                                Xem
                                            </button>
                                            <button className="flex items-center gap-1 text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                                                onClick={() => handlerDelete(`${code.id}`)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {/* Empty state */}
                {dataDiscount.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không tìm thấy mã giảm giá nào
                    </div>
                )}
            </div>
            <div className='mt-[30px]'>
                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={(page) => {
                        if (page === pagination.page) return;

                        setPagination(prev => ({
                            ...prev,
                            page
                        }));
                    }}
                />

            </div>


        </div>
    );
};

export default PromotionCodeManagement;