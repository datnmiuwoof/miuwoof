'use client'

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Star, Eye, EyeOff, Trash2, ArrowLeft, Calendar, User, Package, MessageSquare, Clock } from 'lucide-react';

export default function CommentDetail() {

    const { id } = useParams();
    const [review, setReview] = useState(null);
    const [loading, setLoading] = useState(true);
    // Thay bằng id thực tế từ params

    useEffect(() => {
        fetchReviewDetail();
    }, []);

    const fetchReviewDetail = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:3000/api/comment/${id}`,
                {
                    credentials: 'include',
                }
            );
            const res = await response.json();
            if (res.success) {
                setReview(res.data);
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
            <div style={{ display: 'flex', gap: '4px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={24}
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

    const toggleVisibility = async () => {
        try {
            await fetch(`http://localhost:3000/api/comment/${id}/toggle`, {
                method: 'PUT',
                credentials: 'include',
            });
            fetchReviewDetail();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const deleteReview = async () => {
        if (!confirm('Bạn có chắc muốn xóa đánh giá này?')) return;
        try {
            await fetch(`http://localhost:3000/api/comment/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            window.history.back();
        } catch (error) {
            console.error('Error:', error);
        }
    };


    if (loading) {
        return (
            <div style={{ padding: '32px', textAlign: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
                <div style={{ fontSize: '18px', color: '#6b7280' }}>Đang tải dữ liệu...</div>
            </div>
        );
    }

    if (!review) {
        return (
            <div style={{ padding: '32px', textAlign: 'center', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
                <div style={{ fontSize: '18px', color: '#6b7280' }}>Không tìm thấy đánh giá</div>
            </div>
        );
    }

    const userName = review.OrderDetail?.Order?.User?.name || 'Khách';
    const userEmail = review.OrderDetail?.Order?.User?.email || 'N/A';
    const productName = review.OrderDetail?.name || 'N/A';
    const productImage = review.OrderDetail?.image || '';
    const orderCode = review.OrderDetail?.Order?.order_code || 'N/A';

    return (
        <div style={{ padding: '24px', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={() => window.history.back()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '10px 16px',
                        backgroundColor: 'white',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        color: '#374151',
                        fontWeight: '500'
                    }}
                >
                    <ArrowLeft size={18} />
                    Quay lại
                </button>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                        onClick={toggleVisibility}
                        style={{
                            padding: '10px 20px',
                            fontSize: '14px',
                            backgroundColor: review.is_active ? '#3b82f6' : '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '500'
                        }}
                    >
                        {review.is_active ? <Eye size={18} /> : <EyeOff size={18} />}
                        {review.is_active ? 'Hiển thị' : 'Ẩn'}
                    </button>
                    <button
                        onClick={deleteReview}
                        style={{
                            padding: '10px 20px',
                            fontSize: '14px',
                            backgroundColor: '#ef4444',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontWeight: '500'
                        }}
                    >
                        <Trash2 size={18} />
                        Xóa
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                {/* Main Content */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Review Card */}
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <MessageSquare size={24} color="#3b82f6" />
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Chi tiết đánh giá</h2>
                        </div>

                        {/* Rating */}
                        <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {renderStars(review.rating)}
                                <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937' }}>{review.rating}.0</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>NỘI DUNG ĐÁNH GIÁ</div>
                            <div style={{
                                fontSize: '16px',
                                color: '#374151',
                                lineHeight: '1.7',
                                padding: '16px',
                                backgroundColor: '#f9fafb',
                                borderRadius: '8px',
                                border: '1px solid #e5e7eb'
                            }}>
                                {review.content}
                            </div>
                        </div>

                        {/* Status */}
                        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>TRẠNG THÁI:</div>
                            <div style={{
                                padding: '6px 12px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                backgroundColor: review.is_hidden ? '#fee2e2' : '#dcfce7',
                                color: review.is_hidden ? '#dc2626' : '#16a34a'
                            }}>
                                {review.is_active ? 'Đã ẩn' : 'Hiển thị'}
                            </div>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <Package size={24} color="#3b82f6" />
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Thông tin sản phẩm</h2>
                        </div>

                        <div style={{ display: 'flex', gap: '16px' }}>
                            <img
                                src={productImage}
                                alt={productName}
                                style={{
                                    width: '120px',
                                    height: '120px',
                                    borderRadius: '8px',
                                    objectFit: 'cover',
                                    border: '1px solid #e5e7eb'
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                                    {productName}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Mã đơn hàng:</span>
                                        <span style={{ fontSize: '14px', color: '#1f2937', fontWeight: '600' }}>{orderCode}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Customer Info */}
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <User size={24} color="#3b82f6" />
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Khách hàng</h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                backgroundColor: getAvatarColor(userName),
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: '32px'
                            }}>
                                {getUserInitial(userName)}
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '4px' }}>
                                    {userName}
                                </div>
                                <div style={{ fontSize: '14px', color: '#6b7280' }}>
                                    {userEmail}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Time Info */}
                    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                            <Clock size={24} color="#3b82f6" />
                            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1f2937', margin: 0 }}>Thời gian</h2>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>Ngày tạo</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <Calendar size={16} color="#6b7280" />
                                    <span style={{ fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                                        {formatDate(review.createdAt)}
                                    </span>
                                </div>
                            </div>
                            {review.updatedAt && review.updatedAt !== review.createdAt && (
                                <div>
                                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px', fontWeight: '500' }}>Cập nhật cuối</div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Calendar size={16} color="#6b7280" />
                                        <span style={{ fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                                            {formatDate(review.updatedAt)}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}