'use client'

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Plus, Edit, Trash2, Eye, Calendar, Image, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';

export default function Banner() {
    const [currentPage, setCurrentPage] = useState(1);
    const bannersPerPage = 10;

    // banner data
    const [banners, setBanners] = useState([
        {
            id: 1,
            title: 'Flash Sale Cuối Năm - Giảm đến 50%',
            slug: 'flash-sale-cuoi-nam-giam-den-50',
            image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=150&fit=crop',
            position: 'homepage_hero',
            link: 'https://example.com/flash-sale',
            status: 'active',
            startDate: '2024-12-01T00:00:00',
            endDate: '2024-12-31T23:59:59',
            createdAt: '2024-11-25T10:30:00',
            updatedAt: '2024-11-28T14:20:00',
            sortOrder: 1,
            clickCount: 1250
        },
        {
            id: 2,
            title: 'Khuyến Mãi Black Friday',
            slug: 'khuyen-mai-black-friday',
            image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=300&h=150&fit=crop',
            position: 'homepage_hero',
            link: 'https://example.com/black-friday',
            status: 'active',
            startDate: '2024-11-20T00:00:00',
            endDate: '2024-11-30T23:59:59',
            createdAt: '2024-11-15T09:00:00',
            updatedAt: '2024-11-20T08:00:00',
            sortOrder: 2,
            clickCount: 2840
        },
        {
            id: 3,
            title: 'Sản Phẩm Mới 2024',
            slug: 'san-pham-moi-2024',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=150&fit=crop',
            position: 'sidebar',
            link: 'https://example.com/new-products',
            status: 'inactive',
            startDate: '2024-12-05T00:00:00',
            endDate: '2024-12-25T23:59:59',
            createdAt: '2024-12-01T11:00:00',
            updatedAt: '2024-12-03T16:45:00',
            sortOrder: 1,
            clickCount: 420
        },
        {
            id: 4,
            title: 'Miễn Phí Vận Chuyển Toàn Quốc',
            slug: 'mien-phi-van-chuyen-toan-quoc',
            image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=150&fit=crop',
            position: 'homepage_bottom',
            link: 'https://example.com/free-shipping',
            status: 'active',
            startDate: '2024-11-01T00:00:00',
            endDate: '2024-12-31T23:59:59',
            createdAt: '2024-10-28T13:30:00',
            updatedAt: '2024-11-01T09:15:00',
            sortOrder: 1,
            clickCount: 3560
        },
        {
            id: 5,
            title: 'Chương Trình Tích Điểm',
            slug: 'chuong-trinh-tich-diem',
            image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=300&h=150&fit=crop',
            position: 'sidebar',
            link: 'https://example.com/loyalty-program',
            status: 'scheduled',
            startDate: '2024-12-15T00:00:00',
            endDate: '2025-01-15T23:59:59',
            createdAt: '2024-12-02T15:20:00',
            updatedAt: '2024-12-03T11:30:00',
            sortOrder: 2,
            clickCount: 0
        }
    ]);

    const statusConfig = {
        active: { label: 'Đang hiển thị', color: 'bg-green-100 text-green-800' },
        inactive: { label: 'Đã tắt', color: 'bg-gray-100 text-gray-800' },
        scheduled: { label: 'Đã lên lịch', color: 'bg-blue-100 text-blue-800' },
        expired: { label: 'Hết hạn', color: 'bg-red-100 text-red-800' }
    };

    const positionConfig = {
        homepage_hero: { label: 'Trang chủ - Hero', color: 'bg-purple-100 text-purple-800' },
        homepage_bottom: { label: 'Trang chủ - Dưới', color: 'bg-indigo-100 text-indigo-800' },
        sidebar: { label: 'Thanh bên', color: 'bg-pink-100 text-pink-800' },
        popup: { label: 'Popup', color: 'bg-orange-100 text-orange-800' }
    };

    const positions = ['homepage_hero', 'homepage_bottom', 'sidebar', 'popup'];

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    // Pagination
    const indexOfLastBanner = currentPage * bannersPerPage;
    const indexOfFirstBanner = indexOfLastBanner - bannersPerPage;
    const currentBanners = banners.slice(indexOfFirstBanner, indexOfLastBanner);
    const totalPages = Math.ceil(banners.length / bannersPerPage);

    // Reorder banners
    const moveBanner = (bannerId, direction) => {
        const bannerIndex = banners.findIndex(b => b.id === bannerId);
        if (bannerIndex === -1) return;

        const newBanners = [...banners];
        const targetIndex = direction === 'up' ? bannerIndex - 1 : bannerIndex + 1;

        if (targetIndex < 0 || targetIndex >= newBanners.length) return;

        // Swap positions
        [newBanners[bannerIndex], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[bannerIndex]];

        // Update sort orders
        newBanners[bannerIndex].sortOrder = bannerIndex + 1;
        newBanners[targetIndex].sortOrder = targetIndex + 1;

        setBanners(newBanners);
    };

    return (
        <div className="main p-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Search box */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm banner..."
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>


                    {/* Status filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="active">Đang hiển thị</option>
                            <option value="inactive">Đã tắt</option>
                            <option value="expired">Hết hạn</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-1 items-center justify-end">
                        <button className="flex items-center gap-2 text-center rounded !mr-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                            <Plus className="w-4 h-4" />
                            Tạo banner
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="">
                <div className="border-b border-gray-200 mb-4">
                    <h2 className="text-m font-semibold text-gray-800 mb-2">
                        Danh sách banner ({banners.length})
                    </h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                                Thứ tự
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Banner
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Vị trí
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thời gian hiển thị
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Lượt click
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentBanners.map((banner, index) => (
                            <tr
                                key={banner.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* Sort Order */}
                                <td className="px-4 py-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <button
                                            onClick={() => moveBanner(banner.id, 'up')}
                                            disabled={index === 0}
                                            className="text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <ArrowUp className="w-4 h-4" />
                                        </button>
                                        <GripVertical className="w-4 h-4 text-gray-400" />
                                        <button
                                            onClick={() => moveBanner(banner.id, 'down')}
                                            disabled={index === currentBanners.length - 1}
                                            className="text-gray-500 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <ArrowDown className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>

                                {/* Banner Title & Image */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="relative group">
                                            <img
                                                src={banner.image}
                                                alt={banner.title}
                                                className="w-24 h-12 object-cover rounded-lg border border-gray-200"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition-all duration-200 flex items-center justify-center">
                                                <Image className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 mb-1">
                                                {banner.title}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {banner.slug}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Position */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${positionConfig[banner.position].color}`}>
                                        {positionConfig[banner.position].label}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[banner.status].color}`}>
                                        {statusConfig[banner.status].label}
                                    </span>
                                </td>

                                {/* Display Period */}
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Calendar className="w-3 h-3 text-green-500" />
                                            <span className="text-xs text-gray-500">Từ:</span>
                                            {formatDate(banner.startDate)}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3 text-red-500" />
                                            <span className="text-xs text-gray-500">Đến:</span>
                                            {formatDate(banner.endDate)}
                                        </div>
                                    </div>
                                </td>

                                {/* Click Count */}
                                <td className="px-6 py-4 text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 text-blue-800 font-semibold rounded-full">
                                        {banner.clickCount}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <button className="flex items-center gap-1 text-green-600 hover:text-green-800 px-2 py-1 rounded hover:bg-green-50">
                                            <Eye className="w-4 h-4" />
                                            Xem
                                        </button>
                                        <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50">
                                            <Edit className="w-4 h-4" />
                                            Sửa
                                        </button>
                                        <button className="flex items-center gap-1 text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50">
                                            <Trash2 className="w-4 h-4" />
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty state */}
                {banners.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không tìm thấy banner nào
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Hiển thị {indexOfFirstBanner + 1}-{Math.min(indexOfLastBanner, banners.length)} trong tổng số {banners.length} banner
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Trước
                            </button>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 text-sm border rounded ${currentPage === index + 1
                                        ? 'bg-blue-600 text-white border-blue-600'
                                        : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};