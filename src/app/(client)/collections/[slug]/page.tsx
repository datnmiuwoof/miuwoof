"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

import { useParams } from "next/navigation";
import { IProduct } from "@/lib/cautrucdata";

export default function ProductDogPage() {
    const { slug } = useParams();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let url;

                if (slug === "khuyen-mai") {
                    url = "http://localhost:3000/product/khuyen-mai";
                } else {
                    url = `http://localhost:3000/product/collections/${slug}`;
                }

                const res = await fetch(url);
                const data = await res.json();

                if (Array.isArray(data)) {
                    setProducts(data);
                    setLoading(false);
                } else {
                    console.error("Dữ liệu API không phải mảng:", data);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
                setProducts([]);
            }
        };

        fetchData();
    }, [slug]);

    if (loading) return null;
    return (
        <div className="py-5 container">
            {/* Breadcrumb */}
            <div className="breadcrumb-paren">
                <div className="main-content">
                    <div className="breadcrumb__inner">
                        <nav style={{ "--bs-breadcrumb-divider": "'/'" } as React.CSSProperties} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link href="/">Trang chủ</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link href={`/collections/${slug}`}>
                                        {products?.[0]?.Category?.name}
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Tiêu đề + sắp xếp */}
            <div className="heading-d">
                <div className="main-content d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
                    <h1 className="fw-bold text-uppercase text-brown px-[15px] py-[20px] mb-0">
                        Mua đồ cho chó
                    </h1>

                    <div className="d-flex align-items-center">
                        <label className="me-2 text-muted fw-semibold">
                            <i className="bi bi-sort-alpha-down me-1"></i>Sắp xếp:
                        </label>
                        <select className="form-select" style={{ width: "180px" }}>
                            <option value="">Mặc định</option>
                            <option value="asc">Giá tăng dần</option>
                            <option value="desc">Giá giảm dần</option>
                        </select>
                    </div>
                </div>

            </div>

            {/* Bộ lọc */}
            <div className="">
                <div className="main-content d-flex align-items-center mb-4 flex-wrap gap-3">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-funnel me-2 text-muted fs-5"></i>
                        <span className="fw-bold text-uppercase me-3">Bộ lọc</span>
                    </div>

                    <select className="form-select" style={{ width: "200px" }}>
                        <option>Thương hiệu</option>
                        <option>Pedigree</option>
                        <option>Royal Canin</option>
                    </select>

                    <select className="form-select" style={{ width: "200px" }}>
                        <option>Lọc giá</option>
                        <option>Dưới 100k</option>
                        <option>100k - 300k</option>
                        <option>Trên 300k</option>
                    </select>
                </div>
            </div>

            {/* Danh sách sản phẩm */}
            <section className="product product-sales">
                <div className="main-content">
                    <div className="product__list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                        {products?.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                    <div className="product__more">
                        <a href="" className="product__more--btn">
                            xem thêm sản phẩm
                            <b> sản phẩm cho mèo</b>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}

