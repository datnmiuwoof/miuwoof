'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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

// Dữ liệu mẫu
const dummyPosts: Post[] = [
    {
        id: 1,
        slug: 'day-dat-vong-co-cho-meo-con-co-that-su-can-thiet-khong',
        title: 'Dây dắt vòng cổ cho mèo con có thật sự cần thiết không?',
        excerpt: 'Dây dắt vòng cổ cho mèo con là phụ kiện xa lạ với những người nuôi thú cưng hiện nay, đặc biệt là khi...',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop',
        author: 'Mai Phương',
        date: '21 Tháng 04, 2025',
        category: 'Mẹo nuôi thú cưng',
    },
    {
        id: 2,
        slug: 'pate-cho-meo-loai-nao-tot-cho-meo-con-va-truong-thanh',
        title: 'Pate cho mèo loại nào tốt cho mèo con và trưởng thành',
        excerpt: 'Pate cho mèo là một lựa chọn phổ biến trong khẩu phần ăn hàng ngày, nhờ khả năng cung cấp độ đạm, protein dễ hấp...',
        imageUrl: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=400&h=300&fit=crop',
        author: 'Admin',
        date: '15 Tháng 04, 2025',
        category: 'Thức ăn',
    },
    {
        id: 3,
        slug: 'hieu-ve-thuc-an-uoc-va-kho-cho-cho',
        title: 'Hiểu rõ về thức ăn ướt và thức ăn khô cho chó',
        excerpt: 'Quyết định chọn loại thức ăn nào cho cún cưng có thể là một thử thách. Cả thức ăn ướt và khô đều có ưu nhược điểm riêng...',
        imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        author: 'Admin',
        date: '10 Tháng 04, 2025',
        category: 'Thức ăn',
    },
    {
        id: 4,
        slug: 'chuan-bi-phu-kien-don-cho-ve-nha',
        title: 'Chuẩn bị phụ kiện đón chó về nhà: Danh sách cần thiết',
        excerpt: 'Lần đầu tiên đón một chú chó về nhà là một khoảnh khắc đáng nhớ. Để giúp cún cưng hòa nhập tốt nhất, bạn cần chuẩn bị...',
        imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=300&fit=crop',
        author: 'Khách hàng',
        date: '01 Tháng 04, 2025',
        category: 'Phụ kiện',
    },
];

const PostCard: React.FC<{ post: Post }> = ({ post }) => (
    <div className="card mb-4 border-0 shadow-sm hover-lift" style={{ overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
        <div className="row g-0">
            <div className="col-12 col-md-4">
                <Link href={`/post/${post.slug}`} className="d-block" style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '200px' }}>
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="img-fluid w-100 h-100"
                        style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </Link>
            </div>

            <div className="col-12 col-md-8">
                <div className="card-body p-4">
                    <div className="d-flex align-items-center mb-2">
                        <span className="badge bg-primary me-2" style={{ fontSize: '11px', fontWeight: '600' }}>
                            {post.category}
                        </span>
                        <span className="text-muted" style={{ fontSize: '13px' }}>
                            {post.date}
                        </span>
                    </div>

                    <h2 className="h5 mb-3" style={{ fontWeight: '700', lineHeight: '1.4' }}>
                        <Link
                            href={`/post/${post.slug}`}
                            className="text-dark text-decoration-none"
                            style={{ transition: 'color 0.2s' }}
                            onMouseOver={(e) => e.currentTarget.style.color = '#0d6efd'}
                            onMouseOut={(e) => e.currentTarget.style.color = '#212529'}
                        >
                            {post.title}
                        </Link>
                    </h2>

                    <p className="text-muted mb-3" style={{
                        fontSize: '14px',
                        lineHeight: '1.6',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {post.excerpt}
                    </p>

                    <Link
                        href={`/post/${post.slug}`}
                        className="btn btn-outline-primary btn-sm"
                        style={{ fontWeight: '600' }}
                    >
                        Đọc tiếp →
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

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

export default function NewsPage() {
    const pathname = usePathname();
    const mainPosts = dummyPosts;
    const latestPosts = dummyPosts.slice(0, 4);

    return (
        <div className="container py-4" style={{ maxWidth: '1200px' }}>

            {/* Breadcrumb */}
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb" style={{ fontSize: '14px' }}>
                    <li className="breadcrumb-item">
                        <Link href="/" className="text-decoration-none">Trang chủ</Link>
                    </li>
                    <li className={`breadcrumb-item ${pathname === "/news" ? "active" : ""}`} aria-current="page">
                        Tin tức
                    </li>
                </ol>
            </nav>

            <div className="row g-4">
                {/* Main Content */}
                <div className="col-lg-8 col-md-12">
                    <div className="mb-4">
                        <h1 className="display-6 fw-bold mb-1" style={{ color: '#212529' }}>
                            Tin tức & Bài viết
                        </h1>
                        <p className="text-muted">Cập nhật kiến thức chăm sóc thú cưng mỗi ngày</p>
                    </div>

                    {/* Post List */}
                    <div className="post-list-wrapper">
                        {mainPosts.map((post) => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>

                    {/* Pagination */}
                    <nav className="mt-5" aria-label="Page navigation">
                        <ul className="pagination justify-content-center">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            <li className="page-item active">
                                <a className="page-link" href="#">1</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">2</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">3</a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Sidebar */}
                <div className="col-lg-4 col-md-12 z-1">
                    <aside className="sticky-top" style={{ top: '150px' }}>
                        <div className="card border-0 shadow-sm">
                            <div className="card-body p-4">
                                <h2 className="h5 fw-bold mb-4 pb-3 border-bottom">
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

            {/* <style jsx>{`
                .hover-lift:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
                }
            `}</style> */}
        </div>
    );
}