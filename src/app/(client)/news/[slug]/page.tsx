'use client';

import Link from 'next/link';
import { IoChevronForward } from 'react-icons/io5';

interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    imageUrl: string;
    author: string;
    date: string;
    category: string;
}

// Dữ liệu bài viết mới nhất (sidebar)
const latestPosts: Post[] = [
    {
        id: 1,
        slug: 'day-dat-vong-co-cho-meo-con-co-that-su-can-thiet-khong',
        title: 'Dây dắt vòng cổ cho mèo con có thật sự cần thiết không?',
        excerpt: '',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
        author: 'Mai Phương',
        date: '21 Tháng 04, 2025',
        category: 'Mẹo nuôi thú cưng',
    },
    {
        id: 2,
        slug: 'pate-cho-meo-loai-nao-tot-cho-meo-con-va-truong-thanh',
        title: 'Pate cho mèo loại nào tốt cho mèo con và trưởng thành',
        excerpt: '',
        imageUrl: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=400&h=300&fit=crop',
        author: 'Admin',
        date: '15 Tháng 04, 2025',
        category: 'Thức ăn',
    },
    {
        id: 3,
        slug: 'hieu-ve-thuc-an-uoc-va-kho-cho-cho',
        title: 'Hiểu rõ về thức ăn ướt và thức ăn khô cho chó',
        excerpt: '',
        imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        author: 'Admin',
        date: '10 Tháng 04, 2025',
        category: 'Thức ăn',
    },
    {
        id: 4,
        slug: 'chuan-bi-phu-kien-don-cho-ve-nha',
        title: 'Chuẩn bị phụ kiện đón chó về nhà: Danh sách cần thiết',
        excerpt: '',
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
        author: 'Khách hàng',
        date: '01 Tháng 04, 2025',
        category: 'Phụ kiện',
    },
];

// Component card bài viết mới
const LatestPostCard: React.FC<{ post: Post }> = ({ post }) => (
    <Link
        href={`/news/${post.slug}`}
        className="d-flex mb-3 text-decoration-none"
        style={{ gap: '12px', transition: 'transform 0.2s' }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}
    >
        <div className="flex-shrink-0" style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
            <img
                src={post.imageUrl}
                alt={post.title}
                style={{
                    width: '90px',
                    height: '70px',
                    objectFit: 'cover',
                    display: 'block'
                }}
            />
        </div>
        <div className="flex-grow-1">
            <h6 className="mb-1 text-dark" style={{
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '1.4',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {post.title}
            </h6>
            <small className="text-muted" style={{ fontSize: '12px' }}>
                {post.date}
            </small>
        </div>
    </Link>
);

export default function NewsDetailPage() {
    // Dữ liệu bài viết hiện tại (có thể lấy từ API/database)
    const currentPost = {
        title: 'Chuẩn bị phụ kiện đón chó về nhà: Danh sách cần thiết',
        category: 'Phụ kiện',
        date: '01 Tháng 04, 2025',
        author: 'Khách hàng',
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1200&h=600&fit=crop',
    };

    return (
        <div className="container py-4" style={{ maxWidth: '1200px', marginTop: '80px' }}>

            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb" style={{ fontSize: '14px' }}>
                    <li className="breadcrumb-item">
                        <Link href="/" className="text-decoration-none">Trang chủ</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link href="/news" className="text-decoration-none">Tin tức</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {currentPost.title}
                    </li>
                </ol>
            </nav>

            <div className="row g-4">
                {/* Main Content - Nội dung bài viết */}
                <div className="col-lg-8 col-md-12">
                    <article className="card border-0 shadow-sm">
                        <div className="card-body p-4 p-md-5">
                            {/* Category & Date */}
                            <div className="d-flex align-items-center mb-3">
                                <span className="badge bg-primary me-2" style={{ fontSize: '12px', fontWeight: '600' }}>
                                    {currentPost.category}
                                </span>
                                <span className="text-muted" style={{ fontSize: '14px' }}>
                                    {currentPost.date}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="display-6 fw-bold mb-4" style={{ lineHeight: '1.3', color: '#212529' }}>
                                {currentPost.title}
                            </h1>

                            {/* Author Info */}
                            <div className="d-flex align-items-center mb-4 pb-4 border-bottom">
                                <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                    style={{ width: '50px', height: '50px', fontSize: '20px', fontWeight: '600' }}>
                                    {currentPost.author.charAt(0)}
                                </div>
                                <div>
                                    <p className="mb-0 fw-semibold">{currentPost.author}</p>
                                    <small className="text-muted">Tác giả</small>
                                </div>
                            </div>

                            {/* Featured Image */}
                            <div className="mb-4">
                                <img
                                    src={currentPost.imageUrl}
                                    alt={currentPost.title}
                                    className="img-fluid rounded w-100"
                                    style={{ maxHeight: '500px', objectFit: 'cover' }}
                                />
                            </div>

                            {/* Article Content */}
                            <div className="article-content" style={{ fontSize: '16px', lineHeight: '1.8', color: '#333' }}>
                                <p className="lead mb-4">
                                    Lần đầu tiên đón một chú chó về nhà là một khoảnh khắc đáng nhớ. Để giúp cún cưng hòa nhập tốt nhất,
                                    bạn cần chuẩn bị đầy đủ các phụ kiện cần thiết.
                                </p>

                                <h2 className="h4 fw-bold mt-5 mb-3">1. Thức ăn và bát ăn</h2>
                                <p>
                                    Chọn loại thức ăn phù hợp với độ tuổi và giống chó. Chuẩn bị ít nhất 2 bát: một cho thức ăn và một cho nước uống.
                                    Nên chọn bát bằng thép không gỉ hoặc gốm sứ để dễ vệ sinh.
                                </p>

                                <h2 className="h4 fw-bold mt-5 mb-3">2. Vòng cổ và dây dắt</h2>
                                <p>
                                    Vòng cổ giúp bạn kiểm soát chó khi đi dạo và gắn thẻ tên. Dây dắt nên có chiều dài phù hợp,
                                    thường từ 1.5-2m để chó có không gian thoải mái mà vẫn an toàn.
                                </p>

                                <h2 className="h4 fw-bold mt-5 mb-3">3. Giường và chăn</h2>
                                <p>
                                    Chuẩn bị một chiếc giường mềm mại và ấm áp cho chó nghỉ ngơi. Kích thước phải phù hợp để chó có thể nằm duỗi người thoải mái.
                                </p>

                                <h2 className="h4 fw-bold mt-5 mb-3">4. Đồ chơi</h2>
                                <p>
                                    Đồ chơi giúp chó giải trí và phát triển trí tuệ. Chọn những món đồ chơi an toàn, không có chi tiết nhỏ dễ nuốt phải.
                                    Bóng cao su, xương gặm và đồ chơi kêu là những lựa chọn phổ biến.
                                </p>

                                <h2 className="h4 fw-bold mt-5 mb-3">5. Dụng cụ vệ sinh</h2>
                                <p>
                                    Chuẩn bị lược chải lông, bàn chải đánh răng, dầu tắm chuyên dụng và khăn lau.
                                    Nếu nuôi chó trong nhà, bạn cũng cần tấm lót vệ sinh hoặc khay cát.
                                </p>

                                <div className="alert alert-info mt-5" role="alert">
                                    <h5 className="fw-bold mb-2">💡 Lưu ý quan trọng:</h5>
                                    <p className="mb-0">
                                        Hãy chuẩn bị tất cả những vật dụng này trước khi đón chó về nhà.
                                        Điều này giúp bạn sẵn sàng chăm sóc thú cưng ngay từ ngày đầu tiên!
                                    </p>
                                </div>

                                <h2 className="h4 fw-bold mt-5 mb-3">Kết luận</h2>
                                <p>
                                    Việc chuẩn bị đầy đủ phụ kiện không chỉ giúp chó cưng của bạn có cuộc sống thoải mái mà còn thể hiện
                                    trách nhiệm của người chủ. Hãy đầu tư thời gian và công sức để tạo ra một môi trường sống tốt nhất cho người bạn bốn chân của mình!
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="mt-5 pt-4 border-top">
                                <strong className="me-2">Tags:</strong>
                                <span className="badge bg-light text-dark me-2">#chó cưng</span>
                                <span className="badge bg-light text-dark me-2">#phụ kiện</span>
                                <span className="badge bg-light text-dark me-2">#chuẩn bị</span>
                                <span className="badge bg-light text-dark">#nuôi chó</span>
                            </div>

                            {/* Share Buttons */}
                            <div className="mt-4 d-flex gap-2">
                                <button className="btn btn-primary btn-sm">
                                    <i className="bi bi-facebook me-1"></i> Chia sẻ
                                </button>
                                <button className="btn btn-info btn-sm text-white">
                                    <i className="bi bi-twitter me-1"></i> Tweet
                                </button>
                                <button className="btn btn-success btn-sm">
                                    <i className="bi bi-whatsapp me-1"></i> WhatsApp
                                </button>
                            </div>
                        </div>
                    </article>

                    {/* Comments Section (Optional) */}
                    <div className="card border-0 shadow-sm mt-4">
                        <div className="card-body p-4">
                            <h3 className="h5 fw-bold mb-4">💬 Bình luận (0)</h3>
                            <div className="text-center text-muted py-5">
                                <p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
                                <button className="btn btn-primary">Viết bình luận</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Bài viết mới nhất */}
                <div className="col-lg-4 col-md-12">
                    <aside className="sticky-top" style={{ top: '100px' }}>
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-4 pb-3 border-bottom">
                                    📌 Bài viết mới nhất
                                </h2>
                                <div>
                                    {latestPosts.map((post) => (
                                        <LatestPostCard key={`latest-${post.id}`} post={post} />
                                    ))}
                                </div>
                                <div className="text-center mt-4 pt-3 border-top">
                                    <Link
                                        href="/news"
                                        className="btn btn-primary w-100"
                                        style={{ fontWeight: '600' }}
                                    >
                                        XEM TẤT CẢ
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}