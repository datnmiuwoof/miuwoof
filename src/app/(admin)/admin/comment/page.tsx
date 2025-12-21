'use client'

import { useState, useEffect } from 'react';
import { Star, Eye, EyeOff, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AdminCommentManagement() {

    const router = useRouter();
    const [reviews, setReviews] = useState([]);
    const [statistics, setStatistics] = useState({
        total: 0,
        average: 0,
        ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 10;

    useEffect(() => {
        fetchReviews();
    }, [ratingFilter, statusFilter]);

    const fetchReviews = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: String(currentPage),
                limit: String(reviewsPerPage),
                rating: ratingFilter || '',
                status: statusFilter || '',
            });

            const response = await fetch(
                `http://localhost:3000/api/comment?${params.toString()}`,
                {
                    credentials: 'include',
                }
            );

            const res = await response.json();

            if (res.success) {
                setReviews(res.data.reviews);
                setStatistics(res.data.statistics);
            }

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };


    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const renderStars = (rating) => {
        return (
            <div style={{ display: 'flex', gap: '2px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        fill={star <= rating ? '#facc15' : 'none'}
                        color={star <= rating ? '#facc15' : '#d1d5db'}
                    />
                ))}
            </div>
        );
    };

    const getUserInitial = (name) => {
        return (name || 'U').charAt(0).toUpperCase();
    };

    const getAvatarColor = (name) => {
        const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
        const index = (name || '').charCodeAt(0) % colors.length;
        return colors[index];
    };

    // Show all reviews without filtering
    const filteredReviews = reviews;

    // Pagination
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = filteredReviews.slice(indexOfFirstReview, indexOfLastReview);
    const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

    const toggleVisibility = async (reviewId) => {
        try {
            await fetch(`http://localhost:3000/api/comment/${reviewId}/toggle`, {
                method: 'PUT',
                credentials: 'include',
            });
            fetchReviews();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteReview = async (reviewId) => {
        if (!confirm('Bạn có chắc muốn xóa đánh giá này?')) return;
        try {
            await fetch(`http://localhost:3000/api/comment/${reviewId}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            fetchReviews();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return (
            <div style={{ padding: '32px', textAlign: 'center' }}>
                Đang tải dữ liệu...
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            {/* Statistics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', borderRadius: '8px', padding: '16px', color: 'white' }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Tổng đánh giá</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{statistics.total}</div>
                </div>
                <div style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', borderRadius: '8px', padding: '16px', color: 'white' }}>
                    <div style={{ fontSize: '14px', opacity: 0.9, marginBottom: '4px' }}>Trung bình</div>
                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{statistics.average} ★</div>
                </div>
                {[5, 4, 3, 2, 1].map(rating => (
                    <div key={rating} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '4px' }}>{rating} ★</div>
                        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{statistics.ratingCounts[rating]}</div>
                    </div>
                ))}
            </div>

            {/* Search Input and Filters */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <input
                        type="text"
                        placeholder="Tìm sản phẩm, khách hàng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px', fontSize: '14px' }}
                    />
                    <select
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                        style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', cursor: 'pointer' }}
                    >
                        <option value="all">Tất cả đánh giá</option>
                        <option value="5">5 ★</option>
                        <option value="4">4 ★</option>
                        <option value="3">3 ★</option>
                        <option value="2">2 ★</option>
                        <option value="1">1 ★</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ border: '1px solid #d1d5db', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', cursor: 'pointer' }}
                    >
                        <option value="all">Tất cả trạng thái</option>
                        <option value="visible">Hiển thị</option>
                        <option value="hidden">Đã ẩn</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                        <tr>
                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Sản phẩm</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Khách hàng</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Đánh giá</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Nội dung</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Ngày</th>
                            <th style={{ padding: '12px', textAlign: 'left', fontSize: '12px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentReviews.map((review) => {
                            const userName = review.OrderDetail?.Order?.User?.name || 'Khách';
                            const productName = review.OrderDetail?.name || 'N/A';
                            const productImage = review.OrderDetail?.image || '';

                            return (
                                <tr key={review.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <img src={productImage} alt={productName} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937', maxWidth: '200px' }}>{productName}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                backgroundColor: getAvatarColor(userName),
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontWeight: 'bold',
                                                fontSize: '16px'
                                            }}>
                                                {getUserInitial(userName)}
                                            </div>
                                            <span style={{ fontSize: '14px', color: '#1f2937' }}>{userName}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                            {renderStars(review.rating)}
                                            <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{review.rating}.0</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ fontSize: '14px', color: '#374151', maxWidth: '300px', lineHeight: '1.5' }}>
                                            {review.content}
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                            {formatDate(review.createdAt)}
                                        </div>
                                    </td>
                                    <td style={{ padding: '12px' }}>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                onClick={() => router.push(`/admin/comment/${review.id}`)}
                                                style={{
                                                    padding: '6px 12px',
                                                    fontSize: '12px',
                                                    color: 'white',
                                                    background: 'green',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}
                                            >
                                                xem
                                            </button>
                                            <button
                                                onClick={() => toggleVisibility(review.id)}
                                                style={{
                                                    padding: '6px 12px',
                                                    fontSize: '12px',
                                                    backgroundColor: review.is_active ? '#3b82f6' : '#6b7280',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}
                                            >
                                                {review.is_active ? <Eye size={14} /> : <EyeOff size={14} />}
                                                {review.is_active ? 'Hiện' : 'Ẩn'}
                                            </button>
                                            <button
                                                onClick={() => deleteReview(review.id)}
                                                style={{
                                                    padding: '6px 12px',
                                                    fontSize: '12px',
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '6px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}
                                            >
                                                <Trash2 size={14} />
                                                Xóa
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                {currentReviews.length === 0 && (
                    <div style={{ padding: '48px', textAlign: 'center', color: '#6b7280' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
                        <div>Không tìm thấy đánh giá nào</div>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '14px', color: '#6b7280' }}>
                            Hiển thị {indexOfFirstReview + 1}-{Math.min(indexOfLastReview, filteredReviews.length)} / {filteredReviews.length}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '14px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    backgroundColor: 'white'
                                }}
                            >
                                Trước
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    style={{
                                        padding: '6px 12px',
                                        fontSize: '14px',
                                        border: '1px solid',
                                        borderRadius: '6px',
                                        cursor: 'pointer',
                                        backgroundColor: currentPage === i + 1 ? '#3b82f6' : 'white',
                                        color: currentPage === i + 1 ? 'white' : '#374151',
                                        borderColor: currentPage === i + 1 ? '#3b82f6' : '#d1d5db'
                                    }}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                style={{
                                    padding: '6px 12px',
                                    fontSize: '14px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    backgroundColor: 'white'
                                }}
                            >
                                Sau
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}