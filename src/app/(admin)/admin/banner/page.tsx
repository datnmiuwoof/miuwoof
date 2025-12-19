"use client"

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Edit, Trash2, Image } from 'lucide-react';

export default function Banner() {

    const router = useRouter();
    const [banners, setBanners] = useState([]);


    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const result = await fetch(`http://localhost:3000/api/banners`, { credentials: 'include' });
        const res = await result.json();

        if (result.ok) {
            setBanners(res.data);
            console.log(res.data)
        }

    }

    const formatDate = (dateString) => {
        if (!dateString) return '—';

        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '—';

        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleDelete = async (id: any) => {
        try {
            if (confirm('Bạn có chắc muốn xóa banner này?')) {
                const result = await fetch(`http://localhost:3000/api/banners/${id}`, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if (result.ok) {
                    alert('xóa thành công'),
                        fetchData()
                }
            }
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="main p-6">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search box */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm banner..."
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Action button */}
                    <div className="flex items-center justify-end">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            onClick={() => router.push('/admin/banner/addBanner')}
                        >
                            <Plus className="w-4 h-4" />
                            Thêm banner
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-lg shadow">
                <div className="border-b border-gray-200 px-6 py-4">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Danh sách banner ({banners.length})
                    </h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Tiêu đề
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Hình ảnh
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Trạng thái
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Ngày tạo
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Cập nhật
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                            {banners.map((banner: any) => (
                                <tr key={banner.id} className="hover:bg-gray-50 transition-colors">
                                    {/* ID */}
                                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                                        #{banner.id}
                                    </td>

                                    {/* Title */}
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-medium text-gray-900">
                                            {banner.title}
                                        </div>
                                    </td>

                                    {/* Image */}
                                    <td className="px-6 py-4">
                                        <div className="relative group w-32">
                                            <img
                                                src={banner.image}
                                                alt={banner.title}
                                                className="w-32 h-16 object-cover rounded-lg border border-gray-200"
                                            />

                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 rounded-lg transition-all flex items-center justify-center">
                                                <Image className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                    </td>


                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        {banner.is_active ? (
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                Hoạt động
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                                                Tắt
                                            </span>
                                        )}
                                    </td>

                                    {/* Created At */}
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(banner.createdAt)}
                                    </td>

                                    {/* Updated At */}
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {formatDate(banner.updatedAt)}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="text-blue-600 hover:text-blue-800 p-1 hover:bg-blue-50 rounded transition"
                                                onClick={() => router.push(`/admin/banner/${banner.id}`)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(banner.id)}
                                                className="text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty state */}
                {banners.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Chưa có banner nào
                    </div>
                )}
            </div>
        </div>
    );
}