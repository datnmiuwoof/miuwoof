'use client'

import React, { useState } from 'react';

const Comment = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [productFilter, setProductFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;

    // Sample review data
    const [reviews, setReviews] = useState([
        {
            id: 1,
            productName: 'Thức ăn hạt cho chó Dog Mania',
            productId: 'prod-001',
            categoryName: 'ĐỒ CHO CHÓ',
            categoryId: 'do-cho-cho',
            productImage: 'https://images.unsplash.com/photo-1592286927505-c0d00c2d4d0c?w=100&h=100&fit=crop',
            customerName: 'Nguyễn Văn An',
            customerAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop',
            orderId: 'ORD-2024-001234',
            rating: 5,
            reviewContent: 'Sản phẩm tuyệt vời! Giao hàng nhanh, đóng gói cẩn thận. Rất hài lòng với lần mua hàng này.',
            imageCount: 2,
            videoCount: 0,
            reviewDate: '2024-12-15T14:30:00',
            status: 'visible',
            createdAt: '2024-12-15T14:30:00',
            orderCompletedDate: '2024-12-10T10:00:00'
        },
        {
            id: 2,
            productName: 'Snack cho chó Gặm sạch răng Collagen Altimate gói 90gr',
            productId: 'prod-002',
            categoryName: 'ĐỒ CHO CHÓ',
            categoryId: 'do-cho-cho',
            productImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop',
            customerName: 'Trần Thị Bình',
            customerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
            orderId: 'ORD-2024-001567',
            rating: 4,
            reviewContent: 'Vị này lần đầu cho cún nhà mình thử, bé ăn rất ngon. Rất đáng để cho các bé cún thử vừa ngon vừa giúp bé làm sạch.',
            imageCount: 1,
            videoCount: 0,
            reviewDate: '2024-12-18T09:15:00',
            status: 'visible',
            createdAt: '2024-12-18T09:15:00',
            orderCompletedDate: '2024-12-12T15:30:00'
        },
        {
            id: 3,
            productName: 'Cát vệ sinh cho mèo Aatas Xi măng ván',
            productId: 'prod-003',
            categoryName: 'ĐỒ CHO MÈO',
            categoryId: 'do-cho-meo',
            productImage: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100&h=100&fit=crop',
            customerName: 'Lê Minh Cường',
            customerAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=50&h=50&fit=crop',
            orderId: 'ORD-2024-002341',
            rating: 3,
            reviewContent: 'Sản phẩm tạm ổn mô tả. Thấm hút và khử mùi tạm.',
            imageCount: 0,
            videoCount: 0,
            reviewDate: '2024-12-17T16:45:00',
            status: 'hidden',
            createdAt: '2024-12-17T16:45:00',
            orderCompletedDate: '2024-12-08T11:20:00'
        },
        {
            id: 4,
            productName: 'Đồ chơi Củ Cà Rốt gặm ngứa răng cho chó mèo',
            productId: 'prod-004',
            categoryName: 'Phụ kiện',
            categoryId: 'cat-accessories',
            productImage: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=100&h=100&fit=crop',
            customerName: 'Phạm Thu Hà',
            customerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop',
            orderId: 'ORD-2024-003456',
            rating: 5,
            reviewContent: 'Chất lượng tuyệt vời!',
            imageCount: 3,
            videoCount: 1,
            reviewDate: '2024-12-19T11:00:00',
            status: 'visible',
            createdAt: '2024-12-19T11:00:00',
            orderCompletedDate: '2024-12-14T09:30:00'
        },
        {
            id: 5,
            productName: 'Phụ kiện khăn len nón Noel cho chó mèo',
            productId: 'prod-005',
            categoryName: 'phụ kiện',
            categoryId: 'cat-accessories',
            productImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
            customerName: 'Hoàng Văn Đức',
            customerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
            orderId: 'ORD-2024-004789',
            rating: 3,
            reviewContent: 'Ổn nhưng giá hơi cao.',
            imageCount: 0,
            videoCount: 0,
            reviewDate: '2024-12-16T13:20:00',
            status: 'visible',
            createdAt: '2024-12-16T13:20:00',
            orderCompletedDate: '2024-12-11T16:45:00'
        },
        {
            id: 6,
            productName: 'Thức ăn hạt cho mèo Smartheat',
            productId: 'prod-006',
            categoryName: 'ĐỒ CHO MÈO',
            categoryId: 'do-cho-meo',
            productImage: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop',
            customerName: 'Vũ Thị Mai',
            customerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop',
            orderId: 'ORD-2024-005123',
            rating: 4,
            reviewContent: 'Sản phẩm chất lượng. vị mới cho các bé.',
            imageCount: 1,
            videoCount: 0,
            reviewDate: '2024-12-14T10:30:00',
            status: 'hidden',
            createdAt: '2024-12-14T10:30:00',
            orderCompletedDate: '2024-12-05T14:15:00'
        },
        {
            id: 7,
            productName: 'Áo liền chân họa tiết sọc ngang chó có khoen dắt',
            productId: 'prod-007',
            categoryName: 'ĐỒ CHO CHÓ',
            categoryId: 'do-cho-cho',
            productImage: 'https://images.unsplash.com/photo-1678652197950-75cd0ec987d7?w=100&h=100&fit=crop',
            customerName: 'Đỗ Văn Hùng',
            customerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
            orderId: 'ORD-2024-006789',
            rating: 4,
            reviewContent: 'Chất liệu ổn, thoáng mát cho bé mặc hông bị khó chịu.',
            imageCount: 2,
            videoCount: 0,
            reviewDate: '2024-12-19T15:20:00',
            status: 'visible',
            createdAt: '2024-12-19T15:20:00',
            orderCompletedDate: '2024-12-15T10:00:00'
        }
    ]);

    const statusConfig = {
        visible: { label: 'Hiển thị', color: 'bg-green-100 text-green-800' },
        hidden: { label: 'Đã ẩn', color: 'bg-gray-100 text-gray-800' }
    };

    const ratingOptions = [
        { value: '5', label: '5 Sao ⭐⭐⭐⭐⭐' },
        { value: '4', label: '4 Sao ⭐⭐⭐⭐' },
        { value: '3', label: '3 Sao ⭐⭐⭐' },
        { value: '2', label: '2 Sao ⭐⭐' },
        { value: '1', label: '1 Sao ⭐' }
    ];

    // Get unique categories
    const categories = [...new Set(reviews.map(r => r.categoryId))].map(catId => {
        const review = reviews.find(r => r.categoryId === catId);
        return { id: catId, name: review.categoryName };
    });

    // Get products based on selected category
    const availableProducts = categoryFilter
        ? reviews.filter(r => r.categoryId === categoryFilter)
            .reduce((acc, review) => {
                if (!acc.find(p => p.id === review.productId)) {
                    acc.push({ id: review.productId, name: review.productName });
                }
                return acc;
            }, [])
        : [];

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

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                    ★
                </span>
            );
        }
        return <div className="flex text-lg">{stars}</div>;
    };

    // Filter reviews
    const filteredReviews = reviews.filter(review => {
        const matchesSearch =
            review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            review.orderId.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !categoryFilter || review.categoryId === categoryFilter;
        const matchesProduct = !productFilter || review.productId === productFilter;
        const matchesRating = !ratingFilter || review.rating === parseInt(ratingFilter);
        const matchesStatus = !statusFilter || review.status === statusFilter;
        return matchesSearch && matchesCategory && matchesProduct && matchesRating && matchesStatus;
    });

    // Handle category filter change - reset product and rating filters
    const handleCategoryChange = (value) => {
        setCategoryFilter(value);
        setProductFilter('');
        setRatingFilter('');
        setCurrentPage(1);
    };

    // Handle product filter change - reset rating filter
    const handleProductChange = (value) => {
        setProductFilter(value);
        setRatingFilter('');
        setCurrentPage(1);
    };

    // Pagination
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    // Select all reviews
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedReviews(currentReviews.map(review => review.id));
        } else {
            setSelectedReviews([]);
        }
    };

    // Select individual review
    const handleSelectReview = (reviewId) => {
        if (selectedReviews.includes(reviewId)) {
            setSelectedReviews(selectedReviews.filter(id => id !== reviewId));
        } else {
            setSelectedReviews([...selectedReviews, reviewId]);
        }
    };

    // Toggle review status
    const toggleReviewStatus = (reviewId) => {
        setReviews(reviews.map(review => {
            if (review.id === reviewId) {
                return {
                    ...review,
                    status: review.status === 'visible' ? 'hidden' : 'visible'
                };
            }
            return review;
        }));
    };

    // Calculate rating statistics
    const ratingStats = {
        total: reviews.length,
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length,
        average: (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    };

    return (
        <div className="p-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow p-4 text-white">
                    <div className="text-sm opacity-90 mb-1">Tổng đánh giá</div>
                    <div className="text-2xl font-bold">{ratingStats.total}</div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow p-4 text-white">
                    <div className="text-sm opacity-90 mb-1">Trung bình</div>
                    <div className="text-2xl font-bold">{ratingStats.average} ★</div>
                </div>
                {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} className="bg-white rounded-lg shadow p-4">
                        <div className="text-sm text-gray-600 mb-1">{rating} ★</div>
                        <div className="text-2xl font-bold text-gray-900">{ratingStats[rating]}</div>
                    </div>
                ))}
            </div>

            {/* Filter Section */}
            <div className="bg-white rounded-lg shadow p-3 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                    {/* Search box */}
                    <div className="relative md:col-span-2">
                        <input
                            type="text"
                            placeholder="Tìm sản phẩm, khách hàng, mã đơn..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-1 focus:ring-blue-400 outline-none"
                        />
                    </div>

                    {/* Category filter */}
                    <div className="relative">
                        <select
                            value={categoryFilter}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả danh mục</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Product filter */}
                    <div className="relative">
                        <select
                            value={productFilter}
                            onChange={(e) => handleProductChange(e.target.value)}
                            disabled={!categoryFilter}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                        >
                            <option value="">Tất cả sản phẩm</option>
                            {availableProducts.map(prod => (
                                <option key={prod.id} value={prod.id}>{prod.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Rating filter */}
                    <div className="relative">
                        <select
                            value={ratingFilter}
                            onChange={(e) => setRatingFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả đánh giá</option>
                            {ratingOptions.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status filter */}
                    <div className="relative">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm appearance-none bg-white cursor-pointer focus:ring-1 focus:ring-blue-400 outline-none"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="visible">Hiển thị</option>
                            <option value="hidden">Đã ẩn</option>
                        </select>
                    </div>
                </div>

                {/* Action buttons row */}
                <div className="mt-4 flex justify-end">
                    <button className="text-center rounded px-4 py-2 bg-green-600 text-white hover:bg-green-700 text-sm">
                        Xuất Excel
                    </button>
                </div>

                {/* Bulk Actions */}
                {selectedReviews.length > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-800">
                            Đã chọn {selectedReviews.length} đánh giá
                        </span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700">
                                Hiển thị
                            </button>
                            <button className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700">
                                Ẩn
                            </button>
                            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700">
                                Xóa
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Table Section */}
            <div>
                <div className="border-b border-gray-200 mb-4">
                    <h2 className="text-base font-semibold text-gray-800 mb-2">
                        Danh sách đánh giá ({filteredReviews.length})
                    </h2>
                </div>
                <table className="min-w-full border-collapse bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left w-8">
                                <input
                                    type="checkbox"
                                    checked={selectedReviews.length === currentReviews.length && currentReviews.length > 0}
                                    onChange={handleSelectAll}
                                    className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                                />
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Sản phẩm
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Khách hàng
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Đánh giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Nội dung
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Trạng thái
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Ngày đánh giá
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Thao tác
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200">
                        {currentReviews.map((review) => (
                            <tr
                                key={review.id}
                                className="hover:bg-gray-50 transition-colors duration-150"
                            >
                                {/* Checkbox */}
                                <td className="px-4 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedReviews.includes(review.id)}
                                        onChange={() => handleSelectReview(review.id)}
                                        className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                                    />
                                </td>

                                {/* Product */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={review.productImage}
                                            alt={review.productName}
                                            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                                        />
                                        <div>
                                            <div className="font-semibold text-gray-900 text-sm mb-1">
                                                {review.productName}
                                            </div>
                                            <div className="text-xs text-gray-500 mb-1">
                                                {review.orderId}
                                            </div>
                                            <div className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded inline-block">
                                                {review.categoryName}
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Customer */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={review.customerAvatar}
                                            alt={review.customerName}
                                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                                        />
                                        <div className="font-medium text-gray-900 text-sm">
                                            {review.customerName}
                                        </div>
                                    </div>
                                </td>

                                {/* Rating */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col items-center gap-1">
                                        {renderStars(review.rating)}
                                        <span className="text-sm font-semibold text-gray-700">
                                            {review.rating}.0
                                        </span>
                                    </div>
                                </td>

                                {/* Review Content */}
                                <td className="px-6 py-4">
                                    <div className="max-w-xs">
                                        <div className="text-sm text-gray-700 line-clamp-3">
                                            {review.reviewContent}
                                        </div>
                                    </div>
                                </td>


                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full ${statusConfig[review.status].color}`}>
                                        {statusConfig[review.status].label}
                                    </span>
                                </td>

                                {/* Review Date */}
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-700">
                                        <div className="mb-1">
                                            {formatDateTime(review.reviewDate)}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Đơn: {formatDate(review.orderCompletedDate)}
                                        </div>
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-sm">
                                    <div className="flex flex-col gap-2">
                                        <button className="text-green-600 hover:text-green-800 px-2 py-1 rounded hover:bg-green-50 text-xs text-left">
                                            Xem chi tiết
                                        </button>
                                        <button
                                            onClick={() => toggleReviewStatus(review.id)}
                                            className={`px-2 py-1 rounded text-xs text-left ${review.status === 'visible'
                                                ? 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                                                : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                                                }`}
                                        >
                                            {review.status === 'visible' ? 'Ẩn' : 'Hiển thị'}
                                        </button>
                                        <button className="text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 text-xs text-left">
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty state */}
                {filteredReviews.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p className="text-4xl mb-3">💬</p>
                        <p>Không tìm thấy đánh giá nào</p>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Hiển thị {indexOfFirstReview + 1}-{Math.min(indexOfLastReview, filteredReviews.length)} trong tổng số {filteredReviews.length} đánh giá
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

export default Comment;