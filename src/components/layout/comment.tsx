'use client'

import { useState, useEffect } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

export default function Comment({ slug }: { slug: string }) {
    const [reviews, setReviews] = useState([]);
    const [statistics, setStatistics] = useState({
        totalReviews: 0,
        averageRating: 0,
        ratingCounts: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    });
    const [loading, setLoading] = useState(true);
    const [filterRating, setFilterRating] = useState(0);
    const [sortBy, setSortBy] = useState('newest');

    const ratingParam = filterRating === 0 ? "all" : filterRating;

    useEffect(() => {
        fetchdata()
    }, [slug, ratingParam, sortBy])

    const fetchdata = async () => {
        try {
            setLoading(true);
            const result = await fetch(`http://localhost:3000/comment/${slug}?rating=${ratingParam}&sort=${sortBy}`, {
                credentials: 'include',
            })
            const res = await result.json();

            if (res.success && res.data) {
                // Backend trả về { reviews: [], statistics: {} }
                setReviews(res.data.reviews || res.data);


                // Nếu backend trả statistics
                if (res.data.statistics) {
                    setStatistics(res.data.statistics);
                }
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching reviews:', error);
            setLoading(false);
        }
    }


    const totalReviews = statistics.totalReviews;
    const averageRating = statistics.averageRating;

    const ratingStats = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: statistics.ratingCounts[star] || 0,
        percentage: totalReviews > 0
            ? ((statistics.ratingCounts[star] / totalReviews) * 100).toFixed(0)
            : 0
    }));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };

    if (loading) {
        return <div style={{ padding: '32px', textAlign: 'center' }}>Đang tải đánh giá...</div>;
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px', backgroundColor: '#f9fafb' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px', color: '#1f2937', marginTop: '0' }}>
                Đánh giá sản phẩm
            </h2>

            {/* Tổng quan */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                    {/* Điểm TB */}
                    <div style={{ textAlign: 'center', borderRight: '1px solid #e5e7eb', paddingRight: '32px' }}>
                        <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>
                            {averageRating}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '8px' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={24}
                                    fill={star <= Math.round(averageRating) ? '#facc15' : 'none'}
                                    color={star <= Math.round(averageRating) ? '#facc15' : '#d1d5db'}
                                />
                            ))}
                        </div>
                        <p style={{ color: '#6b7280', margin: '0' }}>{totalReviews} đánh giá</p>
                    </div>

                    {/* Thống kê */}
                    <div style={{ paddingLeft: '32px' }}>
                        {ratingStats.map(({ star, count, percentage }) => (
                            <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                <span style={{ fontSize: '14px', color: '#6b7280', width: '48px' }}>{star} sao</span>
                                <div style={{ flex: 1, backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            backgroundColor: '#facc15',
                                            height: '100%',
                                            width: `${percentage}%`,
                                            transition: 'width 0.3s'
                                        }}
                                    />
                                </div>
                                <span style={{ fontSize: '14px', color: '#6b7280', width: '48px', textAlign: 'right' }}>{count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bộ lọc */}
            <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '16px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                    <button
                        onClick={() => setFilterRating(0)}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '8px',
                            fontWeight: '500',
                            border: '1px solid',
                            cursor: 'pointer',
                            backgroundColor: filterRating === 0 ? '#eab308' : 'white',
                            color: filterRating === 0 ? 'white' : '#374151',
                            borderColor: filterRating === 0 ? '#eab308' : '#d1d5db'
                        }}
                    >
                        Tất cả
                    </button>
                    {[5, 4, 3, 2, 1].map((star) => (
                        <button
                            key={star}
                            onClick={() => setFilterRating(star)}
                            style={{
                                padding: '8px 16px',
                                borderRadius: '8px',
                                fontWeight: '500',
                                border: '1px solid',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                backgroundColor: filterRating === star ? '#eab308' : 'white',
                                color: filterRating === star ? 'white' : '#374151',
                                borderColor: filterRating === star ? '#eab308' : '#d1d5db'
                            }}
                        >
                            {star} <Star size={16} fill="currentColor" />
                        </button>
                    ))}

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        style={{
                            marginLeft: 'auto',
                            padding: '8px 16px',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            cursor: 'pointer'
                        }}
                    >
                        <option value="newest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                    </select>
                </div>
            </div>

            {/* Danh sách */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {reviews.length === 0 ? (
                    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                        Chưa có đánh giá nào
                    </div>
                ) : (
                    reviews.map((review) => {
                        const userName = review.OrderDetail?.Order?.User?.name || 'User';
                        const userInitial = userName.charAt(0).toUpperCase();

                        return (
                            <div key={review.id} style={{ backgroundColor: 'white', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', gap: '16px' }}>
                                    {/* Avatar với chữ cái đầu */}
                                    <div
                                        style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            backgroundColor: '#eab308',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                            color: 'white',
                                            flexShrink: 0
                                        }}
                                    >
                                        {userInitial}
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ marginBottom: '8px' }}>
                                            <h4 style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>
                                                {userName}
                                            </h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ display: 'flex', gap: '2px' }}>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            size={16}
                                                            fill={star <= review.rating ? '#facc15' : 'none'}
                                                            color={star <= review.rating ? '#facc15' : '#d1d5db'}
                                                        />
                                                    ))}
                                                </div>
                                                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                                                    {formatDate(review.createdAt)}
                                                </span>
                                            </div>
                                        </div>

                                        <p style={{ color: '#374151', marginBottom: '12px', lineHeight: '1.6' }}>
                                            {review.content}
                                        </p>

                                        <button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                color: '#6b7280',
                                                backgroundColor: 'transparent',
                                                border: 'none',
                                                padding: '0',
                                                cursor: 'pointer',
                                                fontSize: '14px'
                                            }}
                                        >
                                            <ThumbsUp size={16} />
                                            Hữu ích (0)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    );
}