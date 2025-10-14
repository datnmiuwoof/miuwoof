"use client"

import '@/app/styles/reset.css';
import '@/app/styles/globals.css';
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "./cautrucdata";


export default function ProductSalesSection() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000");
            const data = await res.json();
            const Product_sale = data.products_discount;
            setProducts(Product_sale);
        };
        fetchData();
    }, []);

    return (
        <section className="product product-sales">
            <div className="main-content">
                <div className="product__heading">
                    <h2 className="section__heading">
                        <a href="" className="product__heading--inner">SẢN PHẨM ĐANG KHUYẾN MÃI</a>
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
                        <b> sản phẩm đang khuyến mãi</b>
                    </a>
                </div>
            </div>
        </section>
    );
}
