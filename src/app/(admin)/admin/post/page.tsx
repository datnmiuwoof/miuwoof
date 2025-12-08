"use client"

import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Plus, Edit, Trash2, Eye, Calendar, Tag, User, FileText, Globe, CheckSquare } from 'lucide-react';

const PostManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [selectedPosts, setSelectedPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 10;

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
            status: 'published',
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
            status: 'scheduled',
            publishedDate: '2024-12-10T10:00:00',
            createdAt: '2024-12-02T15:20:00',
            updatedAt: '2024-12-03T11:30:00',
            seoTitle: '',
            seoDescription: ''
        }
    ];

    const statusConfig = {
        published: { label: 'Đã xuất bản', color: 'bg-green-100 text-green-800' },
        draft: { label: 'Bản nháp', color: 'bg-gray-100 text-gray-800' },
        scheduled: { label: 'Đã lên lịch', color: 'bg-blue-100 text-blue-800' },
        archived: { label: 'Lưu trữ', color: 'bg-yellow-100 text-yellow-800' }
    };

    const categories = ['Lập trình', 'Thiết kế', 'Tối ưu hóa', 'Bảo mật'];

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const formatDateTime = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filter posts
    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = !statusFilter || post.status === statusFilter;
        const matchesCategory = !categoryFilter || post.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    // Pagination
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    // Select all posts
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedPosts(currentPosts.map(post => post.id));
        } else {
            setSelectedPosts([]);
        }
    };

    // Select individual post
    const handleSelectPost = (postId) => {
        if (selectedPosts.includes(postId)) {
            setSelectedPosts(selectedPosts.filter(id => id !== postId));
        } else {
            setSelectedPosts([...selectedPosts, postId]);
        }
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
                            placeholder="Tìm kiếm bài viết..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Category filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả danh mục</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Status filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="published">Đã xuất bản</option>
                            <option value="draft">Bản nháp</option>
                            <option value="scheduled">Đã lên lịch</option>
                            <option value="archived">Lưu trữ</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                    </div>

                    {/* Action buttons */}
                    <div className="flex space-x-1 items-center justify-end">
                        <button className="flex items-center gap-2 text-center rounded !mr-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                            <Plus className="w-4 h-4" />
                            Tạo bài viết
                        </button>
                        <button className="text-center rounded px-4 py-2 bg-green-600 text-white hover:bg-green-700">
                            Xuất Excel
                        </button>
                    </div>
                </div>

                {/* Bulk Actions */}
                {selectedPosts.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">
                            Đã chọn {selectedPosts.length} bài viết
                        </span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                                Xuất bản
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                                Chuyển về nháp
                            </button>
                            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                                Xóa
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Table Section */}
            <div className="">
                <div className="border-b border-gray-200 mb-4">
                    <h2 className="text-m font-semibold text-gray-800 mb-2">
                        Danh sách bài viết ({filteredPosts.length})
                    </h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left w-8">
                                <input
                                    type="checkbox"
                                    checked={selectedPosts.length === currentPosts.length && currentPosts.length > 0}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Bài viết
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tác giả
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Danh mục
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Tags
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Ngày xuất bản
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                SEO
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentPosts.map((post) => (
                            <tr
                                key={post.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* Checkbox */}
                                <td className="px-4 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedPosts.includes(post.id)}
                                        onChange={() => handleSelectPost(post.id)}
                                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                                    />
                                </td>

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

                                {/* Category */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                                        {post.category}
                                    </span>
                                </td>

                                {/* Tags */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {post.tags.slice(0, 2).map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-700"
                                            >
                                                <Tag className="w-3 h-3" />
                                                {tag}
                                            </span>
                                        ))}
                                        {post.tags.length > 2 && (
                                            <span className="text-xs text-gray-500">
                                                +{post.tags.length - 2}
                                            </span>
                                        )}
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

                                {/* SEO Info */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Globe className="w-4 h-4 text-green-500" />
                                        <CheckSquare className="w-4 h-4 text-green-500" />
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
                {filteredPosts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Không tìm thấy bài viết nào
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Hiển thị {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} trong tổng số {filteredPosts.length} bài viết
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

export default PostManagement;