"use client";

import "@/app/styles/reset.css";
import "@/app/styles/detailproduct.css";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { IProduct } from "@/lib/cautrucdata";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProductVariant from "@/components/layout/variantSelecter";

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedVariant, setSelectedVariant] = useState<number>(0);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`http://localhost:3000/product/${slug}`)
            .then((res) => res.json())
            .then((resData) => {
                setProduct(resData.data);
                setSelectedVariant(0);
                setCurrentIndex(0);
                setLoading(false);
            })
            .catch(() => {
                setProduct(null);
            });
    }, [slug]);



    const variant = product?.ProductVariants[(selectedVariant)];

    const gallery = product?.ProductVariants.flatMap(v => v?.ProductImages);

    const mainImage = gallery?.[currentIndex]?.image;

    useEffect(() => {
        if (!variant) return;

        const fisrtImage = variant?.ProductImages?.[0]?.image;
        if (!fisrtImage) return;

        const idx = gallery?.findIndex(v => v.image === fisrtImage)

        setCurrentIndex(idx >= 0 ? idx : 0);
    }, [selectedVariant]);

    if (!product) {
        return <p className="text-center py-10">Đang tải sản phẩm...</p>;
    }

    const prevImage = () => {
        setCurrentIndex((i) => (i - 1 + gallery.length) % gallery.length);
    };

    const nextImage = () => {
        setCurrentIndex((i) => (i + 1) % gallery.length);
    };

    if (loading) return null;

    return (
        <section className="layout_product-detail">
            {/* Breadcrumb */}

            {product.Categories?.length > 0 && (
                <Breadcrumb product={product} category={product.Categories[0]} />
            )}


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
                                                <Image key={i} src={img?.image} alt={`${product.name} thumb ${i + 1}`} width={68} height={68} className="thumb__img" />
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
                                        <Image src={mainImage} alt={product.name} fill className="main__img" priority />
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
                            <div className="prodetail__name">
                                <h1 className="prodetail__heading">{product.name}</h1>
                                <ul className="prodetail__meta">
                                    <li className="prodetail__sku">
                                        Mã sản phẩm:
                                        <span>{product.sku}</span>
                                    </li>
                                    <li className="prodetail__brand">{product.Brand?.url}</li>
                                    <li className="prodetail__sold">
                                        Trình trạng:
                                        {(product.sold_out) ? (
                                            <span>
                                                hết hàng
                                            </span>
                                        ) : (
                                            <span>
                                                còn hàng
                                            </span>
                                        )}
                                    </li>
                                </ul>
                            </div>
                            <div className="prodetail__prices">
                                <span className="prodetail__value"></span>
                                <span className="prodetail__sale"></span>
                                <span className="prodetail__price">{Number(variant.price).toLocaleString('vi-VN')}VNĐ</span>
                            </div>
                            <div className="prodetail__variants">
                                <ProductVariant
                                    product={product}
                                    onSelectVariant={(index) => {
                                        setSelectedVariant(index);
                                        setCurrentIndex(0);
                                    }}
                                />
                            </div>
                            <div className="prodetail__cart">
                                <div className="prodetail__quantity">

                                </div>
                                <span>thêm vào giỏ hàng</span>
                            </div>
                            <div className="prodetail__desc"></div>

                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}