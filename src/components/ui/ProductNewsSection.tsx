"use client"

import '@/app/styles/reset.css';
import '@/app/styles/globals.css';
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "./cautrucdata";


export default function ProductNewsSection() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        fetch("http://localhost:3000")
            .then((res) => res.json())
            .then((data) => {
                const newProducts = data.products_new;
                setProducts(newProducts);
            })
    }, []);

    return (
        <section className="product product-sales">
            <div className="main-content">
                <div className="product__heading">
                    <h2 className="section__heading">
                        <a href="" className="product__heading--inner">SẢN PHẨM MỚI VỀ</a>
                    </h2>
                </div>
                <div className="product__list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((p) => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
                <div className="product__more">
                    <a href="" className="product__more--btn">
                        xem thêm sản phẩm
                        <b> sản phẩm mới về</b>
                    </a>
                </div>
            </div>
        </section>
    );
}
