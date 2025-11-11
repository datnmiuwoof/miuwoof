"use client"

import '@/app/styles/reset.css';
import '@/app/styles/globals.css';
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { IProduct } from "../../lib/cautrucdata";


export default function ProductDogSection() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("http://localhost:3000");
            const data = await res.json();
            const ProductDog = data.products_dog;
            setProducts(ProductDog);
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
