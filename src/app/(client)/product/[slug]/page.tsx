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
import { useDispatch } from "react-redux";
import { createCart } from "@/lib/cartSlice";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [selectedVariant, setSelectedVariant] = useState<number>(0);
    const [quantityNumber, setQuantityNumber] = useState<number>(1)
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { userId, token } = useAuth();

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

    //check có giảm giá để hiện thị form
    const checkDiscount = product?.Discounts.some(p => p.discount_type === 1);

    const variant = product?.ProductVariants?.[(selectedVariant)];
    const price = Number(variant?.price);

    const discountObject = product?.Discounts.find(d => d.discount_type === 1);

    const discountValue = discountObject?.discount_value ?? 0;

    const finalPrice = discountValue > 0 ? Math.round(Number(price) * (1 - discountValue / 100)) : price;

    const totalCart = finalPrice * quantityNumber;

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
                                {checkDiscount ? (
                                    <>
                                        <span className="prodetail__value prodetail-price">{discountValue}%</span>
                                        <span className="prodetail__price prodetail-price line-through">{Number(price).toLocaleString('vi-VN')}đ</span>
                                        <span className="prodetail__sale prodetail-price">{Number(finalPrice).toLocaleString('vi-VN')}đ</span>
                                    </>

                                ) : (
                                    <>
                                        <span className="prodetail__sale prodetail-price">{Number(finalPrice).toLocaleString('vi-VN')}đ</span>
                                    </>
                                )}

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
                            <div className="prodetail__cart flex items-center gap-4">

                                {/* Số lượng */}
                                <div className="prodetail__quantity flex items-center border border-gray-400 rounded-md overflow-hidden">
                                    <button
                                        className="!h-[45px] !w-[45px] font-bold text-lg"
                                        onClick={() => setQuantityNumber(prev => Math.max(prev - 1, 1))}
                                    >
                                        -
                                    </button>

                                    <span className="w-10 text-center">{quantityNumber}</span>

                                    <button
                                        className="!h-[45px] !w-[45px] font-bold text-lg"
                                        onClick={() => {
                                            if (Number(variant?.available_quantity ?? 1) > quantityNumber) {
                                                setQuantityNumber(prev => prev + 1)
                                            }
                                        }}
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Nút thêm giỏ hàng */}

                                {!product.sold_out ? (
                                    <button
                                        className="px-6 py-3 h-[45px] w-[70%] bg-[#ff0000] text-white font-semibold rounded-md hover:bg-gray-800 transition"
                                        onClick={() => {
                                            dispatch(createCart({
                                                id: product.id,
                                                name: product.name,
                                                quantity: quantityNumber,
                                                image: mainImage,
                                                finalPrice: finalPrice,
                                                totalCart: Number(totalCart),
                                                selectedVariant: variant,
                                            }));

                                            if (userId) {
                                                fetch("http://localhost:3000/api/cart/add", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    credentials: "include",
                                                    body: JSON.stringify({
                                                        items: [
                                                            {
                                                                id: product.id,
                                                                name: product.name,
                                                                quantity: quantityNumber,
                                                                price: finalPrice,
                                                                totalPrice: finalPrice,
                                                                image: mainImage,
                                                                variant: product?.ProductVariants?.[(selectedVariant)],
                                                            }
                                                        ]
                                                    }),
                                                }).catch(err => console.error(err));
                                            }
                                        }}
                                    >
                                        Thêm vào giỏ hàng
                                    </button>
                                ) : (
                                    <button
                                        className="px-6 py-3 h-[45px] w-[70%] bg-[#ff0000] text-white font-semibold rounded-md hover:bg-gray-800 transition"
                                    >
                                        đã hết hàng
                                    </button>
                                )}

                            </div>
                            <div className="prodetail__desc"></div>

                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}