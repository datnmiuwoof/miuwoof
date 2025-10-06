"use client"

import '@/app/styles/reset.css';
import '@/app/styles/globals.css';
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "./cautrucdata";


export default function ProductDogSection() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/data/product.json");
            const data = await res.json();
            const saleProduct = data.products
                .filter((p: any) => p.category_id = 1)
                .slice(0, 8)
            setProducts(saleProduct);
        };
        fetchData();
    }, []);

    return (
        <section className="product product-sales">
            <div className="main-content">
                <div className="product__heading">
                    <h2 className="section__heading">
                        <a href="" className="product__heading--inner">SẢN PHẨM CHO CHÓ</a>
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
                        <b> sản phẩm cho chó</b>
                    </a>
                </div>
            </div>
        </section>
    );
}
