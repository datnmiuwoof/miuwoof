"use client"

import React, { useEffect, useState } from 'react';
import { Search, Filter, ChevronDown, Plus, Edit, Trash2, Eye, Calendar, Tag, User, FileText, Globe, CheckSquare } from 'lucide-react';

export default function PostManagement() {

    const [page, setPage] = useState(1);
    const [status, setStatus] = useState("all");

    useEffect(() => {
        fetchData();
    }, [page, status])

    const fetchData = async () => {
        const result = await fetch(`http://localhost:3000/api/posts?page=${page}&status=${status}`, { credentials: "include" });
        const res = await result.json();

        console.log(res)
    }

    console.log(status);

    // Sample post data
    const posts = [
        {
            id: 1,
            title: 'Dây dắt vòng cổ cho mèo con có thật sự cần thiết không?',
            slug: 'day-dat-vong-co-cho-meo-con-co-that-su-can-thiet-khong',
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop',
            author: 'Nguyễn Văn An',
            category: 'Lập trình',
            tags: ['React', 'JavaScript', 'Web Development'],
            status: 'draft',
            publishedDate: '2024-12-01T10:30:00',
            createdAt: '2024-11-28T09:00:00',
            updatedAt: '2024-12-01T10:30:00',
            seoTitle: 'React Hooks Tutorial - Best Practices 2024',
            seoDescription: ''
        },
        {
            id: 2,
            title: 'Pate cho mèo loại nào tốt cho mèo con và trưởng thành',
            slug: 'pate-cho-meo-loai-nao-tot-cho-meo-con-va-truong-thanh',
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop',
            author: 'Trần Thị Bình',
            category: 'Tối ưu hóa',
            tags: ['Performance', 'SEO', 'Web'],
            status: 'published',
            publishedDate: '2024-11-28T14:20:00',
            createdAt: '2024-11-25T11:00:00',
            updatedAt: '2024-11-28T14:20:00',
            seoTitle: '10 Tips to Optimize Website Performance',
            seoDescription: ''
        },
        {
            id: 3,
            title: 'Dây dắt vòng cổ cho chó khắc tên bán chạy 2025',
            slug: 'day-dat-vong-co-cho-cho-khac-ten-ban-chay-2025',
            thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=100&h=100&fit=crop',
            author: 'Lê Văn Cường',
            category: 'Thiết kế',
            tags: ['UI/UX', 'Design', 'Trends'],
            status: 'draft',
            publishedDate: null,
            createdAt: '2024-12-03T08:00:00',
            updatedAt: '2024-12-04T16:45:00',
            seoTitle: '',
            seoDescription: ''
        },
        {
            id: 4,
            title: 'Hướng dẫn may quần áo chó mèo đơn giản tại nhà',
            slug: 'huong-dan-may-quan-ao-cho-meo-don-gian-tai-nha',
            thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&h=100&fit=crop',
            author: 'Phạm Thị Dung',
            category: 'Bảo mật',
            tags: ['Security', 'Web', 'Best Practices'],
            status: 'published',
            publishedDate: '2024-11-30T09:15:00',
            createdAt: '2024-11-27T13:30:00',
            updatedAt: '2024-11-30T09:15:00',
            seoTitle: '',
            seoDescription: ''
        },
        {
            id: 5,
            title: 'Mẹo bảo quản pate cho mèo lâu hư, không biến chất',
            slug: 'meo-bao-quan-pate-cho-meo-lau-hu-khong-bien-chat',
            thumbnail: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=100&h=100&fit=crop',
            author: 'Hoàng Văn Em',
            category: 'Lập trình',
            tags: ['CSS', 'Tailwind', 'Frontend'],
            status: 'draft',
            publishedDate: '2024-12-10T10:00:00',
            createdAt: '2024-12-02T15:20:00',
            updatedAt: '2024-12-03T11:30:00',
            seoTitle: '',
            seoDescription: ''
        }
    ];

    const handlerStatus = (e) => {
        const value = e.target.value;

        setStatus(value)
    }

    const statusConfig = {
        published: { label: 'Đã xuất bản', color: 'bg-green-100 text-green-800' },
        draft: { label: 'Bản nháp', color: 'bg-gray-100 text-gray-800' },
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

    return (
        <div className="main p-6">
            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6 !w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 !w-full" >
                    {/* Search box */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm bài viết..."
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Status filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={status}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                            onChange={handlerStatus}
                        >
                            <option value="all">Tất cả trạng thái</option>
                            <option value="published">Đã xuất bản</option>
                            <option value="draft">Bản nháp</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-1 items-center !justify-end">
                        <button className="flex items-center gap-2 text-center rounded !mr-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                            <Plus className="w-4 h-4" />
                            Tạo bài viết
                        </button>
                        <button className="text-center rounded px-4 py-2 bg-green-600 text-white hover:bg-green-700">
                            Xuất Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="">
                <div className="border-b border-gray-200 mb-4">
                    <h2 className="text-m font-semibold text-gray-800 mb-2">
                        Danh sách bài viết ({posts.length})
                    </h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Bài viết
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tác giả
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Ngày xuất bản
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {posts.map((post) => (
                            <tr
                                key={post.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* Post Title & Thumbnail */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={post.thumbnail}
                                            alt={post.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900 mb-1">
                                                {post.title}
                                            </div>
                                            <div className="text-xs text-gray-500 flex items-center gap-1">
                                                <FileText className="w-3 h-3" />
                                                {post.slug}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Author */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-400" />
                                        <span className="text-sm text-gray-700">{post.author}</span>
                                    </div>
                                </td>

                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[post.status].color}`}>
                                        {statusConfig[post.status].label}
                                    </span>
                                </td>

                                {/* Published Date */}
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Calendar className="w-3 h-3 text-gray-400" />
                                            {formatDate(post.publishedDate)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Cập nhật: {formatDate(post.updatedAt)}
                                        </div>
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
                {posts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không tìm thấy bài viết nào
                    </div>
                )}

            </div>
        </div>
    );
};