"use client";

import "@/app/styles/reset.css";
import "@/app/styles/detailproduct.css";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IProduct } from "@/components/ui/cautrucdata";

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // Fetch product
    useEffect(() => {
        fetch("/data/product.json")
            .then((res) => res.json())
            .then((data) => {
                const slugProduct = data.products.find((p: IProduct) => p.slug === slug) || null;
                setProduct(slugProduct);
                setCurrentIndex(0);
            })
            .catch(() => {
                setProduct(null);
            });
    }, [slug]);

    // Loading guard: phải có product và gallery ít nhất 1 ảnh
    if (!product || !product.gallery || product.gallery.length === 0) {
        return <p className="text-center py-10">Đang tải sản phẩm...</p>;
    }

    const gallery = product.gallery;
    const lastIndex = gallery.length - 1;

    const prevImage = () => {
        setCurrentIndex((i) => (i - 1 + gallery.length) % gallery.length);
    };

    const nextImage = () => {
        setCurrentIndex((i) => (i + 1) % gallery.length);
    };

    return (
        <section className="layout_product-detail">
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
                                    <Link href="/product">Mua đồ cho mèo</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {product.name}
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Product detail */}
            <section className="prodetail">
                <div className="main-content">
                    <div className="row">
                        <div className="product-detail">
                            {/* Thumbs */}
                            <div className="gallery__thumb">
                                <ul className="thumb__list">
                                    {gallery.map((img, i) => (
                                        <li key={i} className="thumb__item">
                                            <a
                                                type="button"
                                                onClick={() => setCurrentIndex(i)}
                                                className={`thumb__btn ${currentIndex === i ? "active" : ""}`}
                                                aria-label={`chuyển sang ảnh ${i + 1}`}
                                            >
                                                <Image src={img} alt={`${product.name} thumb ${i + 1}`} width={68} height={68} className="thumb__img" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Main image with arrows */}
                            <div className="gallery__main">
                                <div className="gallery__main-img" style={{ width: 470, height: 470 }}>
                                    {/* container must be relative for fill */}
                                    <div style={{ position: "relative", width: "470px", height: "470px" }}>
                                        <Image src={gallery[currentIndex]} alt={product.name} fill className="main__img" priority />
                                    </div>

                                    {/* Left arrow */}
                                    <button
                                        type="button"
                                        className="gallery__nav-btn left"
                                        onClick={prevImage}
                                        aria-label="Ảnh trước"
                                    >
                                        {/* simple SVG arrow */}
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>

                                    {/* Right arrow */}

                                    <button
                                        type="button"
                                        className="gallery__nav-btn right"
                                        onClick={nextImage}
                                        aria-label="Ảnh tiếp"
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Product basic info (right side) */}
                        <div className="prodetail__content">
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
