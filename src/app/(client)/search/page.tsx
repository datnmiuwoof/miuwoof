"use client"

import '@/app/styles/reset.css';
import '@/app/styles/globals.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { createCart } from '@/lib/cartSlice';
import { IProduct } from "@/lib/cautrucdata";
import { useAuth } from "@/context/AuthContext";
import ProductCard from '@/components/product/ProductCard';

export default function SearchPage() {

    const searchParams = useSearchParams();
    const q = searchParams.get("q");
    const [page, setPage] = useState(1);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        if (!q) return
        fetchData()
    }, [q])

    const fetchData = async () => {
        try {
            const data = await fetch(`http://localhost:3000/product?search=${q}&page=${page}`);
            const res = await data.json();
            console.log(res.rows)
            setProduct(res)
        } catch (error) {
            console.log(error)
        }
    }
    console.log(product)
    return (
        <div className="py-5 container">

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
            {product?.rows && (
                <section className="product product-sales">
                    <div className="main-content">
                        <div className="product__list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {product?.rows.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                        {product?.rows.length > 8 && (
                            <div className="product__more">
                                <a href="" className="product__more--btn">
                                    xem thêm sản phẩm
                                    <b> sản phẩm cho mèo</b>
                                </a>
                            </div>
                        )}
                    </div>
                </section>
            )}

        </div>
    );
}
